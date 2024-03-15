import React, { useState } from "react";
function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div className="w-25">
      <h2>Array State Variable</h2>
      <button className="btn btn-success mb-3" onClick={addElement}>Add Element</button>
      <div className="list-group">
        {array.map((item, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {item}
            <button className="btn btn-danger" onClick={() => deleteElement(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ArrayStateVariable;