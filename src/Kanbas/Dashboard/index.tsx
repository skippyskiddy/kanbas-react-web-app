import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../Database';
import './index.css';
import { FaRegEdit, FaEllipsisV} from 'react-icons/fa'; // Import the ellipsis icon

function Dashboard() {
  return (
    <div className="container dashboard-container">
      <h1>Dashboard</h1>
      <hr />
      <div className="second-header">
        <h2>Published Courses ({courses.length})</h2>
        <hr />
      </div>
      <div className="cards">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex align-items-stretch">
              <div className="card course-card w-100">
                <div className="card-img-top d-flex justify-content-end position-relative">
                  <img src={`/images/${course.image}`} alt={course.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <FaEllipsisV className="options-btn position-absolute" style={{ bottom: '10px' }} />
                </div>
                <div className="card-body">
                  <Link to={`/Courses/${course._id}/Home`} className="course-name" style={{ textDecoration: "none", color: "black" }}>
                    {course.name}
                  </Link>
                  <p className="course-details">
                    <span className="course-number">{course.number}</span><br />
                    {course.startDate} - {course.endDate}<br />
                    Full term
                  </p>
                  <FaRegEdit className="edit-btn position-absolute" style={{ bottom: '15px'}} />

                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
