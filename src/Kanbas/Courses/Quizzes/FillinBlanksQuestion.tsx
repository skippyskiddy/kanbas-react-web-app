import React, { useState } from 'react';

interface FillInBlanksQuestionProps {
  blanks: { [key: string]: string[]; }; 
  text: string;
  title: string;
  points: number;  
}
const FillInBlanksQuestion: React.FC<FillInBlanksQuestionProps> = ({ blanks, text, title, points }) => {
  const [selectedKey, setSelectedKey] = useState(blanks ? Object.keys(blanks)[0] : '');

  return (
    <div>
      <div className="d-flex justify-content-between bg-light px-4 py-2">
        <h5>{title}</h5>
        <h6>{points} pts</h6>
      </div>
      <div className="p-4">
        {text}
        <div className="d-flex align-items-center">
          <label className="form-label me-2 my-0 py-0">Show possible answers for</label>
          <select className="form-select-sm" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
              {Object.keys(blanks).length > 0 ? 
                  (
                      Object.keys(blanks).map((key) => (
                          <option key={key} value={key}>{key}</option>
                      ))
                  ) : (
                      <option value="">{["Type answer variables above"]}</option>
                  )
              }
          </select>
        </div>
        {blanks[selectedKey || Object.keys(blanks)[0]]?.map((option, index) => (
            <div key={index} className=" mb-3">
              <input
                type="text"
                value={option}
                disabled
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default FillInBlanksQuestion;
