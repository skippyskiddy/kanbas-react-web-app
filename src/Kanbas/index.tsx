import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "../Nav";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Modules from "./Courses/Modules"; 
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Kanbas() {
  return (
    <div>
      <Nav />
      <div className="kanbas-container">
        {/* KanbasNavigation Column */}
        <div className="kanbas-navigation me-2 pe-4 flex-shrink-0">
          <KanbasNavigation />
        </div>

        {/* Main Content */}
        <div className="kanbas-content">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" />} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Kanbas;
