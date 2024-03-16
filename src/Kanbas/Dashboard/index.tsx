import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as db from "../Database";
import './index.css';
import { FaRegEdit, FaEllipsisV, FaTrash} from 'react-icons/fa'; 

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
  editCourse: (courseId: any) => void;
}

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  editCourse,
}: DashboardProps) {

 // Handle changes to course form inputs
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCourse({ ...course, [name]: value });
};
  return (
    <div>
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input 
        name="name"
        value={course.name} 
        className="form-control" 
        onChange={handleChange} 
      />
      <input 
        name="number"
        value={course.number} 
        className="form-control" 
        onChange={handleChange} 
      />
      <input 
        name="startDate"
        value={course.startDate} 
        className="form-control" 
        type="date" 
        onChange={handleChange}
      />
      <input 
        name="endDate"
        value={course.endDate} 
        className="form-control" 
        type="date" 
        onChange={handleChange} 
      />
    <button onClick={course._id === "0" ? addNewCourse : updateCourse}>
        {course._id === "0" ? "Add" : "Update"}
        
      </button>
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
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="course-name" style={{ textDecoration: "none", color: "black" }}>
                    {course.name}
                  </Link>
                  <p className="course-details">
                    <span className="course-number">{course.number}</span><br />
                    {/* {course.startDate} - {course.endDate}<br /> */} 
                    {/* commenting the date out because it's not in the image  */}
                    202410_1_Spring 2024 Semester Full Term
                  </p>
                  <FaRegEdit className="edit-btn position-absolute" style={{ bottom: '15px', left: '10px' }} onClick={() => editCourse(course._id)} />
                  <FaTrash className="delete-btn position-absolute" style={{ bottom: '15px', right: '10px' }} onClick={() => deleteCourse(course._id)} />
              
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
