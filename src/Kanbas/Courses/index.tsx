import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import Grades from "./Grades";
import Modules from "./Modules";
import QuizDisplay from "./Quizzes/Elizabeth";
import QuizDetailsEditor from './Quizzes/Elizabeth/DetailsEditor';
import QuizDetails from './Quizzes/Elizabeth/Details';
import Home from "./Home";
import './index.css';


function Courses({courses}: { courses: any[]}) {
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
                                <Route path="Quizzes/:quizId/edit" element={<Quizzes />} />
                                <Route path="Quizzes" element={<QuizDisplay/>} />
                                <Route path="Quizzes/DetailsEditor/:quizId" element={<QuizDetailsEditor/>}/>
                                <Route path="Quizzes/QuizDetails/:quizId" element={<QuizDetails/>}/>


                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
