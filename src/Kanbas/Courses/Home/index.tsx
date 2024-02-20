import React from 'react';
import ModuleList from "../Modules/List";
import CourseStatus from "./CourseStatus";

function Home() {
  return (
    <div>
      <div className="d-grid">
        <div className="row">
          <div className="col-md-auto flex-grow-1">
            <ModuleList />
          </div>
          <div className="col-md-3">
            <CourseStatus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
