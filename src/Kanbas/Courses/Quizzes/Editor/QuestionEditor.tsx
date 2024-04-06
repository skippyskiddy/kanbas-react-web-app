import React, { useState } from 'react';
import { Quiz, NewQuestionTemplate } from '../quizSlice';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlanksEditor from './FillInBlanksEditor';

interface QuestionEditorProps {
    editingQuestion?: NewQuestionTemplate;
    quiz: Quiz;
    handleSaveQuestion: (questionPayload: NewQuestionTemplate) => void;
    handleCancelEdit: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
    editingQuestion,
    handleSaveQuestion,
    handleCancelEdit, 
}) => {
    const getBlanksFromText = (value: string, oldBlanks: { [key: string]: string[] }) => {
        const variableRegex = /\[([a-zA-Z]+)\]/g;
        let match;
        const foundVariables = new Set<string>();

        while ((match = variableRegex.exec(value)) !== null) {
            foundVariables.add(match[1]);
        }

        const newBlanks = { ...oldBlanks };
        Object.keys(newBlanks).forEach(key => {
            if (!foundVariables.has(key)) {
                delete newBlanks[key];
            }
        });

        foundVariables.forEach(varKey => {
            if (!(varKey in newBlanks)) {
                newBlanks[varKey] = [];
            }
        });

        return newBlanks;
    }

    const [title, setTitle] = useState(editingQuestion?.title || '');
    const [text, setText] = useState(editingQuestion?.text || '');
    const [points, setPoints] = useState(editingQuestion?.points || 0);
    const [type, setType] = useState(editingQuestion?.type || 'multiple_choice'|| 'true_false' || 'fill_in_blanks') ;
    const [options, setOptions] = useState(editingQuestion?.options || []);
    const [correctAnswer, setCorrectAnswer] = useState(editingQuestion?.correctAnswer || '');
    const [blanks, setBlanks] = useState(editingQuestion?.blanks || getBlanksFromText(text, {}));

    const handleSave = () => {
        const newQuestionData = {
            id: editingQuestion?.id,
            title,
            text,
            points,
            type,
            options,
            correctAnswer,
            blanks,
        }
        if (!text) {
            throw new Error("Please add question text")
        }
        if (type === 'fill_in_blanks') {
            if (!(Object.keys(blanks).length)) {
                throw new Error ('Please add possible answers');
            }

            Object.values(blanks).forEach(option => { if (!option.length) { throw new Error ('Please add possible options') } });
        }

        if (type !== 'fill_in_blanks') { 
            if (correctAnswer === '') { 
                throw new Error ('Please select a correct answer');
                return;
        }
        
            options.forEach(option => { if (!option) { throw new Error ('Please add option text') } });
        }

        handleSaveQuestion(newQuestionData);
    }

    const handleChangeText = (value: string) => {
        if (type === 'fill_in_blanks') {
            const newBlanks = getBlanksFromText(value, blanks);

            setBlanks(newBlanks);
        }
        setText(value);
    }

    return (
        <div>
            <form className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <input type="text" className="form-control mb-3 me-3" id="title" placeholder="Question" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <select className="form-select mb-3" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="multiple_choice">Multiple Choice</option>
                            <option value="true_false">True/False</option>
                            <option value="fill_in_blanks">Fill in Multiple Blanks</option>
                        </select>
                    </div>

                    <div className="d-flex align-items-center">
                        <label htmlFor="points" className="form-label mb-3">Points:</label>
                        <input type="number" className="form-control-sm mb-3" id="points" value={points} onChange={(e) => setPoints(parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <textarea className="form-control" id="question" rows={3} value={text} onChange={(e) => handleChangeText(e.target.value)}></textarea>
                </div>

                <h5>Answers</h5>
                {type === "multiple_choice" && <MultipleChoiceEditor correctAnswer={correctAnswer} options={options} setCorrectAnswer={setCorrectAnswer} setOptions={setOptions} />}
                {type === "true_false" && <TrueFalseEditor correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} />}
                {type === "fill_in_blanks" && <FillInBlanksEditor blanks={blanks} setBlanks={setBlanks} />}


                <div className="mb-3">
                    <button type="button" className="btn btn-danger me-2" onClick={handleCancelEdit}>Cancel</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSave}>Save Question</button>
                </div>
            </form>
        </div>
    );
};

export default QuestionEditor;
