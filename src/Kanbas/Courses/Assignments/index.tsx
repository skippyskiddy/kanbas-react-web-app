import React from "react";
import { FaCheckCircle, FaChevronDown, FaEdit, FaEllipsisV, FaGripVertical, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { deleteAssignment } from './assignmentsReducer'

import './index.css';

function Assignments() {
  const { courseId } = useParams();
  const assignmentsList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const assignmentList = assignmentsList.filter(
    (assignment) => assignment.course === courseId
  );
  const dispatch = useDispatch();

  const handleDelete = (assignmentId:string) => {
    // Confirm dialog
    const isConfirmed = window.confirm("Are you sure you want to remove this assignment?");
    if (isConfirmed) {
      // Dispatch the delete action
      dispatch(deleteAssignment(assignmentId));
    }
  };
  
  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between mb-3">
          <input type="text" className="form-control w-25" placeholder="Search for Assignments" />
          <div className="float-end">
            <button className="btn btn-outline-secondary ml-2 me-1"><FaPlusCircle /> Group</button>
            <Link className="btn btn-danger ml-2 me-1" to={`/Kanbas/Courses/${courseId}/Assignments/New`}><FaPlusCircle /> Assignment</Link>
            <button className="btn btn-outline-secondary ml-2"><FaEllipsisV /></button>
          </div>
        </div>
        <hr />
        <div className="list-group wd-modules">
          <div className="assignment-header">
            <div className="d-flex justify-content-space-between">
              <div className="d-flex align-items-center flex-grow-1">
                <div className="d-flex flex-grow-1 align-items-center ">
                    <FaGripVertical className="me-2" />
                    <FaChevronDown className="me-2" />
                    <span className="fs-4">ASSIGNMENTS</span>
                </div>
                <span className="float-end">
                    <span className="border border-dark px-2 rounded-pill">40% of total</span>
                    <FaPlusCircle className="ms-2" />
                    <FaEllipsisV className="ms-2" />
                </span>
              </div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
              {assignmentList.map((assignment) => (
                <li className="list-group-item justify-content-between" key={assignment._id}>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <FaGripVertical className="me-2" />
                            <Link className="lh-1" to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                                <FaEdit className="me-2 text-success" />
                            </Link>
                        </div>
                        <div className="assignment-info">
                            <h4>{assignment.title}</h4>
                            {/* TODO: add due dates here */}
                            {/* <span className="text-secondary">Week 0 - SETUP - Week starting on Monday September 5th (9/5/2022)</span><br /> */}
                            <span className="text-danger">Multiple Modules</span>
                            <span className="text-secondary"> | <strong>Due</strong> {assignment.dueDate || "N/A"} | 100 pts</span>
                        </div>
                    </div>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" />
                    <FaTrash className="ms-2 text-danger" onClick={() => handleDelete(assignment._id)} style={{ cursor: 'pointer' }} />
                  </span>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </>
  );
}

export default Assignments;
