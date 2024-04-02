import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;


function WorkingWithObjects() {

    const [module, setModule] = useState({
        id: "mod123", name: "Introduction to React",
        description: "Learn the basics of React, including components, state, and props.",
        course: "Web Development"
    });
    const MODULE_URL = `${API_BASE}/a5/module`;


    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <div className="mb-2">
                <input className="form-control-sm me-2" onChange={(e) => setAssignment({
                    ...assignment, title: e.target.value
                })}
                    value={assignment.title} type="text" />
                <button className="btn btn-primary me-2" onClick={updateTitle}>
                    Update Title to: {assignment.title}
                </button>


                <button onClick={fetchAssignment} className="btn btn-primary">
                    Fetch Assignment
                </button>

            </div>


            <a className="me-2" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                <button className="btn btn-primary">Update Title</button>
            </a>
            <input type="text" className="form-control-sm"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />

            <h4>Retrieving Objects</h4>
            <a href={`${API_BASE}/api/courses/a5/assignment`}>
                <button className="btn btn-primary">Get Assignment</button>
            </a>

            <h4>Retrieving Properties</h4>
            <a href={`${API_BASE}/api/courses/a5/assignment/title`}>
                <button className="btn btn-primary">Get Title</button>
            </a>

            <h4>Get Module</h4>
            <a href={`${API_BASE}/api/courses/a5/module`}>
                <button className="btn btn-primary">Get Module</button>
            </a>

            <h4>Get Module Name</h4>
            <a href={`${API_BASE}/api/courses/a5/module/name`}>
                <button className="btn btn-primary">Get Module Name </button>
            </a>

            <div>
                <h4>Update Module Name</h4>
                <div className="d-flex flex-row">
                    <a href={`${MODULE_URL}/name/${module.name}`} className="me-2">
                        <button className="btn btn-primary">Update Module Name</button>
                    </a>
                    <input type="text" className="form-control-sm"
                        onChange={(e) => setModule({
                            ...module,
                            name: e.target.value
                        })}
                        value={module.name} />
                </div>
            </div>

            <div>
                <h4>Update Assignment Score</h4>
                <div className="d-flex flex-row">
                    <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`} className="me-2">
                        <button className="btn btn-primary">Update Assignment Score</button>
                    </a>
                    <input type="text" className="form-control-sm"
                        onChange={(e) => setAssignment({
                            ...assignment,
                            score: parseInt(e.target.value || '0')
                        })}
                        value={assignment.score} />
                </div>
            </div>

            <div>
                <h4>Update Assignment Completion</h4>
                <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`} className="me-2">
                    <button className="btn btn-primary">Update Assignment Completion</button>
                </a>
                <input type="checkbox"
                    onChange={(e) => setAssignment({
                        ...assignment,
                        completed: e.target.checked
                    })}
                    checked={assignment.completed} />
            </div>


        </div>
    );
}
export default WorkingWithObjects;