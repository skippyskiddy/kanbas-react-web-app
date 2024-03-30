import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './index.css'

interface MultipleChoiceQuestionProps {
  options?: string[];
  correctAnswer?: string;
  setCorrectAnswer: (correctAnswer: string) => void;
  setOptions: (options: string[]) => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceQuestionProps> = ({
  options,
  correctAnswer,
  setCorrectAnswer,
  setOptions
}) => {
  const handleOptionsChange = (value: string, changeIndex: number) => {
    const newOptions = [...(options || [])];
    newOptions[changeIndex] = value;
    setOptions(newOptions);
  }

  const handleRemove = (changeIndex: number) => {
    const newOptions = [...(options || [])];
    newOptions.splice(changeIndex, 1);
    setOptions(newOptions);
  }

  return (
    <div>
      <div>
        <label>Choices:</label>
        {options?.map((option, index) => (
          <div key={index} className="d-flex justify-content-between mb-3 p-2 option-hover">
            <div className="d-flex align-items-center">

              { option === correctAnswer ?
                <button className="btn btn-success me-2 my-0 py-0" disabled><FaArrowRight /></button>
                :
                // todo: make hover
                <button className="btn btn-success me-2 my-0 py-0 arrow-button" onClick={() => setCorrectAnswer(option)}><FaArrowRight /></button>
              }
              <div>
                <label className="form-label me-2 my-0 py-0">{option === correctAnswer ? "Correct answer" : "Possible answer"}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => { handleOptionsChange(e.target.value, index) }}
                />
              </div>
            </div>
            <button type="button" className="btn btn-danger" onClick={() => handleRemove(index)}>
              Remove
            </button>
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <button type="button" className="btn text-danger margin-left-auto w-100" onClick={() => { setOptions([...(options || []), ''])}}>
            + Add Another Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;
