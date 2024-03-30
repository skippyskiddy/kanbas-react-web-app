import React from 'react';

interface TrueFalseQuestionProps {
  title: string;
  text: string;
  correctAnswer: string;
  points: number;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ title, text, correctAnswer, points, }) => {
  const options = ['True', 'False'];

  const renderOptions = () => {
    return options.map((option, index) => (
      <div key={index} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={`trueFalseOption${title}`}
          id={`trueFalse${title}Option${index}`}
          value={option}
          checked={option.toLowerCase() === correctAnswer.toLowerCase()}
        />
        <label className="form-check-label" htmlFor={`trueFalse${title}Option${index}`}>
          {option}
        </label>
      </div>
    ));
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

export default TrueFalseQuestion;
