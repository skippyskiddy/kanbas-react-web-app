import React, { useEffect, useState } from "react";
import axios from "axios";

function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);

  const [welcome, setWelcome] = useState("");
  const fetchWelcome = async () => {
    const response = await axios.get("http://localhost:4000/a5/welcome");
    setWelcome(response.data);
  };
  useEffect(() => {
    fetchWelcome();
  }, []);

  const [result, setResult] = useState(0);
  const fetchSum = async (a: number, b: number) => {
    const response = await
      axios.get(`http://localhost:4000/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtraction = async (a: number, b: number) => {
    const response = await axios.get(
      `http://localhost:4000/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };

  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>

      <h4>Calculator</h4>
      <input className="form-control-sm me-2" type="number" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
      <input className="form-control-sm me-2" type="number" onChange={(e) => setB(parseInt(e.target.value))} value={b} />
      <h3>Path Parameters</h3>
      <div>
        <a href={`http://localhost:4000/a5/add/${a}/${b}`} className="me-2">
          <button className="btn btn-primary">Add {a} + {b}</button>
        </a>
        <a href={`http://localhost:4000/a5/subtract/${a}/${b}`}>
          <button className="btn btn-danger">Subtract {a} - {b}</button>
        </a>
      </div>

      <div>
        <h3>Query Parameters</h3>
        <a className="btn btn-primary me-2 mb-2"
          href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
          Add {a} + {b}
        </a>
        <a className="btn btn-danger mb-2"
          href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
          Subtract {a} - {b}
        </a>
      </div>
      <div>
        <a className="btn btn-success me-2"
          href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
          Multiply {a} * {b}
        </a>
        <a className="btn btn-warning"
          href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
          Divide {a} / {b}
        </a>
      </div>
      <div>
        <h3>Fetch Result</h3>
        <input className="form-control-sm me-2" value={result} type="number" readOnly />
        <button className="btn btn-primary me-2" onClick={() => fetchSum(a, b)} >
          Fetch Sum of {a} + {b}</button>


        <button className="btn btn-danger" onClick={() => fetchSubtraction(a, b)} >
          Fetch Substraction of {a} - {b}</button>


      </div>
    </div>
  );
}

export default EncodingParametersInURLs;
