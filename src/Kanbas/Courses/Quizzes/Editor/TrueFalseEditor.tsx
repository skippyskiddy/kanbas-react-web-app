import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './index.css'

interface TrueFalseQuestionProps {
  correctAnswer?: string;
  setCorrectAnswer: (correctAnswer: string) => void;
}

const TrueFalseEditor: React.FC<TrueFalseQuestionProps> = ({
  correctAnswer,
  setCorrectAnswer,
}) => {
  const options = ['True', 'False'];

  return (
    <div>
      <div>
        <label>Choices:</label>
        {options?.map((option) => (
          <div key={option} className="d-flex justify-content-between mb-3 p-2 option-hover">
                <div className="d-flex align-items-center">
                { option === correctAnswer ?
                    <button className="btn btn-success me-2 my-0 py-0" disabled><FaArrowRight /></button>
                    :
                    <button className="btn btn-success me-2 my-0 py-0 arrow-button" onClick={() => setCorrectAnswer(option)}><FaArrowRight /></button>
                }
                <label className="form-label me-2 my-0 py-0">{option}</label>

              </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseEditor;
