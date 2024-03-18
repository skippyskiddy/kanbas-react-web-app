import { useState } from 'react';
import { Provider } from "react-redux";
import Nav from '../Nav';
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import store from "./store";
import * as db from "./Database";
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "nlogo.png"
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: new Date().getTime().toString() };
    setCourses([...courses, newCourse]);
    setCourse({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "nlogo.png"
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
    <Provider store={store}>
      <div>
        <Nav />

        <div className="kanbas-container">
          <div className="col-md-1 d-none d-md-flex kanbas-navigation pe-2 flex-shrink-0">
            <KanbasNavigation />
          </div>
            <div className="col-10 kanbas-content me-2">
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
      </div>
    </Provider>
  );
}

export default Kanbas;
