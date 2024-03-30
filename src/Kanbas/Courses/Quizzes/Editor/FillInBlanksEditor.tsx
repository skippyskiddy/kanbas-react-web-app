import React, { useState } from 'react';
import './index.css';

interface FillInBlanksQuestionProps {
  blanks: { [key: string]: string[]; }; 
  setBlanks: (blanks: { [key: string]: string[]; }) => void;
}

const FillInBlanksEditor: React.FC<FillInBlanksQuestionProps> = ({
  blanks,
  setBlanks,
}) => {
  const [selectedKey, setSelectedKey] = useState(blanks ? Object.keys(blanks)[0] : '');

  const handleBlanksChange = (value: string, changeIndex: number) => {
    const newBlanks = {...blanks};
    const key = selectedKey || Object.keys(blanks)[0];
    newBlanks[key][changeIndex] = value;
    setBlanks(newBlanks);
  }

  const handleRemove = (changeIndex: number) => {
    const newBlanks = {...blanks};
    const key = selectedKey || Object.keys(blanks)[0];
    const newAnswers = [...newBlanks[key]];
    newAnswers.splice(changeIndex, 1);
    newBlanks[key] = newAnswers;
    setBlanks(newBlanks);
  }

  const handleAddAnswer = () => {
    const newBlanks = {...blanks};
    const key = selectedKey || Object.keys(blanks)[0];
    const newAnswers = [...newBlanks[key], ''];
    newBlanks[key] = newAnswers;
    setBlanks(newBlanks);
  }

  return (
    <div>
      <div>
        <div className="d-flex align-items-center mb-3">
            <label className="form-label me-2 my-0 py-0">Show possible answers for</label>
            <select className="form-select-sm" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                {Object.keys(blanks).length > 0 ? 
                    (
                        Object.keys(blanks).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))
                    ) : (
                        <option value="">{"[Type answer variables above]"}</option>
                    )
                }
            </select>
        </div>
        {blanks[selectedKey || Object.keys(blanks)[0]]?.map((option, index) => (
          <div key={index} className="d-flex justify-content-between mb-3 p-2 option-hover">
            <div className="d-flex align-items-center">
              <div>
                <label className="form-label me-2 my-0 py-0">Possible answer:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => { handleBlanksChange(e.target.value, index) }}
                />
              </div>
            </div>
            <button type="button" className="btn btn-danger" onClick={() => handleRemove(index)}>
              Remove
            </button>
          </div>
        ))}
        { Object.keys(blanks).length > 0 && (
            <div className="d-flex justify-content-end">
                <button type="button" className="btn text-danger ms-auto w-100" onClick={handleAddAnswer}>
                + Add Another Answer
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default FillInBlanksEditor;
