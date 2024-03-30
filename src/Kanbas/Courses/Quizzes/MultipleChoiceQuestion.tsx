import React from 'react';

interface MultipleChoiceQuestionProps {
  title: string;
  text: string;
  points: number;
  options: string[];
  correctAnswer: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  title,
  text,
  points,
  options,
  correctAnswer,
}) => {
  const renderOptions = () => {
    return options.map((option, index) => {
        return (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`questionOption${title}`}
              id={`question${title}Option${index}`}
              value={option}
              checked={option === correctAnswer}
            />
            <label className="form-check-label" htmlFor={`question${title}Option${index}`}>
              {option}
            </label>
          </div>
        );
      
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-light px-4 py-2">
        <h5>{title}</h5>
        <h6>{points} pts</h6>
      </div>
      <div className="p-4">
        {text}
        <div>{renderOptions()}</div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
