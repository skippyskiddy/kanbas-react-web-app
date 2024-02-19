import React from 'react';
import { FaDownload, FaCloudDownloadAlt, FaHome, FaChartBar, FaBullhorn, FaBell } from 'react-icons/fa';

function CourseStatus() {
  return (
    <div>
      <div className="course-info">
        {/* Buttons for import and other actions */}
        <button className="btn btn-outline-secondary w-100 mb-1"><FaDownload /> Import existing content</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaCloudDownloadAlt /> Import from commons</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaHome /> Choose home page</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaChartBar /> View course stream</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaBullhorn /> New announcement</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaChartBar /> New analytics</button>
        <button className="btn btn-outline-secondary w-100 mb-1"><FaBell /> View notifications</button>
      </div>

      {/* To-Do and Coming Up sections */}
      <div className="course-info-second-col mt-4">
        <h5>To Do</h5>
        <hr />
        <a href="#" className="text-danger">GRADE ENV1 - CSS + HTML</a>
      </div>
      
      <div className="course-info-second-col mt-4">
        <h5>Coming Up</h5>
        <hr />
        <p className="text-danger">Lecture 1</p>
        <p className="text-secondary" style={{ fontSize: 'smaller' }}>CS4550.12651.202410<br />Sep 11 at 11:45 am</p>
        <p className="text-secondary" style={{ color: 'red' }}>12 more in the next week...</p>
      </div>
    </div>
  );
}

export default CourseStatus;
