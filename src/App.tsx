import React from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import HelloWorld from "./Labs/a3/HelloWorld";
import Quizzes from "./Kanbas/Courses/Quizzes"; 


function App() {
   return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs/a3" replace />} />

          <Route path="/Labs/*" element={<Labs />} />

          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/hello" element={<HelloWorld />} />
          <Route path="/Kanbas/Courses/Quizzes" element={<Quizzes/>} /> 
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
