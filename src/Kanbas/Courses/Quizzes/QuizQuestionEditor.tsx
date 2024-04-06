import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, saveQuestion, deleteQuestion, NewQuestionTemplate, saveQuestions } from './quizSlice';
import { RootState } from '../../store';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FillInBlanksQuestion from './FillinBlanksQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import { useParams } from 'react-router';
import QuestionEditor from './Editor/QuestionEditor';
import { FaBan, FaCheckCircle, FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';
import './index.css'


// Update the defaultNewQuestion to include title and points
const defaultNewQuestion: NewQuestionTemplate = {
  type: 'multiple_choice',
  text: 'Question text',
  correctAnswer: '',
  options: ['Option 1', 'Option 2', 'Option 3'],
  title: 'New Question', // Default title
  points: 1, // Default points
  blanks: {},
};

const QuizQuestionEditor = () => {
  const { quizId } = useParams<{ quizId: string }>();

  if (quizId === undefined) {
    throw new TypeError('Quiz should always be defined');
  }

  const dispatch = useDispatch();
  const quizzes = useSelector((state: RootState) => state.quizReducer.quizzes);
  const quiz = quizzes.find(q => q.id === parseInt(quizId)); // Assuming we are editing the first quiz for simplicity

  if (quiz === undefined) {
    throw new TypeError('Quiz should always be defined');
  }

  const [editingQuestions, setEditingQuestions] = useState<NewQuestionTemplate[]>(quiz.questions);
  const [newQuestion, setNewQuestion] = useState<NewQuestionTemplate>(defaultNewQuestion);
  const [editingQuestionId, setEditingQuestionId] = useState<number | undefined>(undefined);
  const [editingQuestion, setEditingQuestion] = useState<NewQuestionTemplate | undefined>(undefined);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editingQuestionId !== null) {
      const questionBeingEdited = quiz.questions.find(q => q.id === editingQuestionId);
      if (questionBeingEdited) {
        setNewQuestion({
          type: questionBeingEdited.type,
          text: questionBeingEdited.text,
          correctAnswer: questionBeingEdited.correctAnswer,
          options: questionBeingEdited.options || [],
          title: questionBeingEdited.title,
          points: questionBeingEdited.points,
        });
      }
    } else {
      setNewQuestion(defaultNewQuestion);
    }
  }, [editingQuestionId, quiz.questions]);

  const handleAddQuestion = () => {
    const questionWithStatus = {
      ...newQuestion,
      status: 'draft',
      id: Date.now(),
      title: newQuestion.title || 'Untitled Question', // Ensure a title is set
      points: newQuestion.points || 1, // Ensure points are set
    };
    setEditingQuestionIndex(editingQuestions.length);
    setEditingQuestions([...editingQuestions, questionWithStatus]);
    setEditingQuestion({...questionWithStatus});
    setEditingQuestionId(questionWithStatus.id);
    setNewQuestion(defaultNewQuestion); // Reset the form to default values
  };

  const handleEditQuestion = (questionId: number | undefined, index: number) => {
    if (!questionId) {
      return;
    }

    const q = editingQuestions.find(q => q.id === questionId);
    
    if (!q) {
      throw new TypeError("Missing question ID")
    }
    
    setEditingQuestion({...q});
    setEditingQuestionIndex(index);
    setEditingQuestionId(questionId);
  };


  const handleEditSave = (questionPayload: NewQuestionTemplate) => {
    if (editingQuestionId !== null && editingQuestionIndex !== null) {
      const newQuestions = [...editingQuestions];
      newQuestions[editingQuestionIndex] = questionPayload;
      setEditingQuestions(newQuestions);

      setEditingQuestionId(undefined); // Reset editing state
      setEditingQuestion(undefined); // Reset editing state
      setNewQuestion(defaultNewQuestion); // Reset the form to default
    }
  };

  const handleSaveQuiz = () => {
      dispatch(saveQuestions({
        quizId: quiz.id,
        questions: editingQuestions // Pass the updated question array
      }));
      
      setEditingQuestionId(undefined); // Reset editing state
      setNewQuestion(defaultNewQuestion); // Reset the form to default
  };

  const handleDeleteQuestion = (questionId: number | undefined) => {
    if (!questionId) {
      return;
    }
    setEditingQuestions(editingQuestions.filter(q => q.id !== questionId));
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(undefined);
  };

  const renderQuestionList = () => {
    if (!quiz) {
      return <div>Loading...</div>;
    }
    return editingQuestions.map((question, index) => (
      <div className="card mb-2" key={question.id}>
        <div className="card-body p-0 option-hover">
          {editingQuestionId !== question.id && (
            <>
              {question.type === 'multiple_choice' && (
                <MultipleChoiceQuestion
                  title={question.title}
                  text={question.text}
                  options={question.options || []}
                  correctAnswer={question.correctAnswer}
                  points={question.points}
                />
              )}
              {question.type === 'true_false' && (
                <TrueFalseQuestion
                  title={question.title}
                  text={question.text}
                  correctAnswer={question.correctAnswer}
                  points={question.points}
                />
              )}
              {question.type === 'fill_in_blanks' && (
                <FillInBlanksQuestion
                  title={question.title}
                  text={question.text}
                  blanks={question.blanks || {}}
                  points={question.points}
                />
              )}
            </>
          )}
          <div className="pb-4 px-4 question-edit-button">
            <button className="btn btn-primary me-2" onClick={() => handleEditQuestion(question.id, index)}><FaEdit /></button>
            <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}><FaTrash /></button>
          </div>
        </div>
      </div>
    ));
  };

  const previewPage = () => (
    <div>
      <div className="d-flex align-items-center justify-content-end">
        <p className="my-0 me-2">Points {quiz.questions.reduce((acc, currentQuestion) => acc + currentQuestion.points, 0)}</p>
        {quiz.published ? (<p className="my-0 me-2"> <FaCheckCircle /> Published</p>) : (<p className="my-0 me-2"> <FaBan /> Not Published</p>)}
        <button className="btn btn-light p-0 m-0"><FaEllipsisV /> </button>
      </div>

      <div>
        <h2>Quiz Questions Editor</h2>
        {renderQuestionList()}
      </div>

      <div className="my-3">
        <button className="btn btn-outline-secondary me-2" onClick={handleAddQuestion}>
          + New Question
        </button>
        <button className="btn btn-outline-secondary me-2">
          + New Question Group
        </button>
        <button className="btn btn-outline-secondary">
          Find Questions
        </button>
      </div>

      <div className="editor-footer">
        <div className="notify-checkbox">
          <input type="checkbox" id="notifyChange" name="notifyChange" />
          <label htmlFor="notifyChange">Notify users this quiz has changed</label>
        </div>

        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary">Save & Publish</button>
        <button className="btn btn-success" onClick={handleSaveQuiz}>Save</button>
      </div>
    </div>
  )

  return (
    <div className="quiz-question-editor container">
      {
        editingQuestionId ?
          <QuestionEditor editingQuestion={editingQuestion} quiz={quiz} handleSaveQuestion={handleEditSave} handleCancelEdit={handleCancelEdit} /> :
          previewPage()
      }
    </div>
  );
};

export default QuizQuestionEditor;
