import { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Nav from '../Nav';
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import store from "./store";

import axios from "axios";
import './index.css'; 

const API_BASE = process.env.REACT_APP_API_BASE;


function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const COURSES_API =  `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "nlogo.png"
  });

  // const addNewCourse = () => {
  //   const newCourse = { ...course, _id: new Date().getTime().toString() };
  //   setCourses([...courses, newCourse]);
  //   setCourse({
  //     _id: "0", name: "New Course", number: "New Number",
  //     startDate: "2023-09-10", endDate: "2023-12-15",
  //     image: "nlogo.png"
  //   });
  // };

  const addNewCourse = async () => {
    try {
      const response = await axios.post(COURSES_API, course);
      // Prepend the new course returned by the server to the courses list
      setCourses(prevCourses => [response.data, ...prevCourses]);

      // Reset the course form or perform other actions as needed
      setCourse({
        _id: "0", name: "", number: "",
        startDate: "", endDate: "",
        image: "default.png"
      });
    } catch (error) {
      console.error("Failed to add the course", error);
      // Handle the error 
    }
  };

  // const deleteCourse = (courseId:string) => {
  //   setCourses(courses.filter(course => course._id !== courseId));
  // };

  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter(course => course._id !== courseId));
  };

  const editCourse = (courseId: string) => {
    const courseToEdit = courses.find(c => c._id === courseId);
    if (courseToEdit) {
      setCourse(courseToEdit);
    }
  };

  // const updateCourse = () => {
  //   setCourses(courses.map(c => c._id === course._id ? course : c));
  //   resetForm();
  // };

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(courses.map(c => c._id === course._id ? course : c));
    resetForm();
    return course; 
    }; 


  const resetForm = () => {
    setCourse({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/nlogo.png"
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
              <Route path="Courses/:courseId/*" element={<Courses/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;
