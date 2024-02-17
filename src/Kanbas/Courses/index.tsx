import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { courses } from '../Database';
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import './index.css';


function Courses() {
    const { courseId } = useParams<{ courseId: string }>();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === courseId);

    return (
        <div>
            <div className="courseStyle">
                <div className="d-flex align-items-center py-2">
                    <FaBars />
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 px-2">
                            <li className="breadcrumb-item"><a className="text-danger m-0" href="#">{course?.name}</a></li>
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
                                <Route path="Assignments" element={<h1>Assignments</h1>} />
                                <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                                <Route path="Grades" element={<h1>Grades</h1>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
