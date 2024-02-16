import React from 'react';
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function Kanbas() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* KanbasNavigation Column */}
        <div className="col-md-1 d-none d-md-block">
          <KanbasNavigation />
        </div>

        {/* Main Content */}
        <div className="col-md-11">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/*" element={<h1>Courses</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Kanbas;
