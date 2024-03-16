import React, { useState } from 'react';
import Nav from '../Nav';
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as db from "./Database";
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg"
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: new Date().getTime().toString() };
    setCourses([...courses, newCourse]);
    // Optionally reset the course form to default values after adding a course
    setCourse({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg"
    });
  };


  const deleteCourse = (courseId:string) => {
    setCourses(courses.filter(course => course._id !== courseId));
  };

  const editCourse = (courseId: string) => {
    const courseToEdit = courses.find(c => c._id === courseId);
    if (courseToEdit) {
      setCourse(courseToEdit);
    }
  };

  const updateCourse = () => {
    setCourses(courses.map(c => c._id === course._id ? course : c));
    resetForm();
  };

  const resetForm = () => {
    setCourse({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg"
    });
  };

  return (
    <div>
      <Nav />

      <div className="kanbas-container">
      <div className="kanbas-navigation me-2 pe-4 flex-shrink-0">
          <KanbasNavigation />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
          <Route path="Dashboard" element={
            <Dashboard
              courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                editCourse={editCourse}

              />
            } />
          <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Kanbas;
