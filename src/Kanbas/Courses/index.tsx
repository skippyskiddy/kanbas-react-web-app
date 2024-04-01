import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Modules from "./Modules";
import Home from "./Home";
import './index.css';


import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
    const { courseId } = useParams();
    const COURSES_API = "http://localhost:4000/api/courses";

    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}`
      );
      setCourse(response.data);
    };
  

    const { pathname } = useLocation();
    useEffect(() => {
        findCourseById(courseId);
      }, [courseId]);
    
    return (
        <div>
            <div className="courseStyle">
                <div className="d-flex align-items-center py-2">
                    <FaBars />
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 px-2">
                            <li className="breadcrumb-item"><a className="text-danger m-0" href="/#/Kanbas/Dashboard">{course?.name}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{pathname.split("/").slice(-1)[0]}</li>
                        </ol>
                    </nav>
                </div>

                <hr />

                <div className="d-flex">
                    <div className="pe-4">
                        <p className="text-secondary">{course?.name}</p>
                        <CourseNavigation />
                    </div>
                    <div className="flex-grow-1">
                        <div>
                            <Routes>
                                <Route path="/" element={<Navigate to="Home" />} />
                                <Route path="Home" element={<Home/>} />
                                <Route path="Modules" element={<Modules />} />
                                <Route path="Piazza" element={<h1>Piazza</h1>} />
                                <Route path="Assignments" element={<Assignments/>} />
                                <Route path="Assignments/New" element={<AssignmentEditor />} />
                                <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                                <Route path="Grades" element={<Grades />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
