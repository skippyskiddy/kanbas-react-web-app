import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignment, updateAssignment, initialState } from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import { useEffect } from "react";
import * as service from "../service";



function AssignmentEditor() {
    const { assignmentId, courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);

    // useEffect(() => {
    //     let editAssignment;
    //     if (assignmentId) {
    //         // Find the assignment by ID
    //         editAssignment = assignments.find((assignment) => assignment._id === assignmentId);
    
    //         // Check if the assignment exists and if certain fields like 'points' are not defined
    //         if (editAssignment) {
    //             editAssignment = {
    //                 ...editAssignment,
    //                 points: editAssignment.points ?? '',
    //                 description: editAssignment.description ?? '',
    //                 dueDate: editAssignment.dueDate ?? '',
    //                 availableFromDate: editAssignment.availableFromDate ?? '',
    //                 availableUntilDate: editAssignment.availableUntilDate ?? '',
    //             };
    //         }
    //     } else {
    //         // For a new assignment, use the initialState.assignment but ensure defaults for all fields
    //         editAssignment = { 
    //             ...initialState.assignment,
    //         };
    //     }
    
    //     dispatch(setAssignment(editAssignment));
    // }, []);

    useEffect(() => {
        if (assignmentId) {
            service.findAssignmentById(assignmentId)
                .then(data => {
                    dispatch(setAssignment(data));
                })
                .catch(error => console.error("Failed to fetch assignment details:", error));
        } else {
            // Reset to initial state if creating a new assignment
            dispatch(setAssignment(initialState.assignment));
        }
    }, [assignmentId, dispatch]);
    

    // const handleSave = () => {
    //     if (!assignmentId) {
    //         dispatch(addAssignment({ ...assignment, course: courseId }));
    //     } else {
    //         dispatch(updateAssignment(assignment));
    //     }
    //     navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    // };

    const handleSave = () => {
        const saveOrUpdateAssignment = assignmentId
            ? service.updateAssignment(assignment)
            : service.createAssignment(courseId as any, assignment);
    
        saveOrUpdateAssignment.then(savedAssignment => {
            assignmentId
                ? dispatch(updateAssignment(savedAssignment))
                : dispatch(addAssignment(savedAssignment));
            navigate(`/Kanbas/Courses/${courseId}/Assignments`);
        }).catch(error => console.error("Saving or updating assignment failed:", error));
    };
    return (
        <div>
            <div className="float-end">
                <span className="text-success">Published</span>
                <FaCheckCircle className="ms-2 text-success" />
                <FaEllipsisV className="ms-2" />
            </div>
            <br />
            <hr />
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="assignmentName">Assignment Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignmentName"
                        onChange={(e) =>
                            dispatch(setAssignment({ ...assignment, title: e.target.value }))
                        }
                        value={assignment?.title}
                    />
                </div>
                <div className="form-group mb-4">
                    <textarea
                        className="form-control"
                        id="assignmentDescription"
                        rows={3}
                        placeholder="This is the assignment description"
                        value={assignment?.description}
                        onChange={(e) =>
                            dispatch(setAssignment({ ...assignment, description: e.target.value }))
                        }
                    />
                </div>
                <div className="row form-group mb-4 justify-content-center">
                    <label className="col-md-2 text-end" htmlFor="points">Points</label>
                    <input
                        className="col-md-6 form-control-sm"
                        type="text"
                        id="points"
                        placeholder="100"
                        value={assignment?.points}
                        onChange={(e) =>
                            dispatch(setAssignment({ ...assignment, points: e.target.value }))
                        }
                    />
                </div>
                <div className="row form-group mb-4 justify-content-center">
                    <label className="col-md-2 text-end" htmlFor="assignmentGroup">Assignment Group</label>
                    <select className="col-md-6  form-control-sm" id="assignmentGroup">
                        <option selected>ASSIGNMENTS</option>
                    </select>
                </div>
                <div className="row form-group mb-4 justify-content-center">
                    <label className="col-md-2 text-end" htmlFor="displayGrade">Display Grade As</label>
                    <select className="col-md-6 form-control-sm" id="displayGrade">
                        <option selected>Percentage</option>
                    </select>
                </div>
                <div className="row form-group mb-4">
                    <div className="col-md-7 text-end">
                        <input type="checkbox" id="finalGrade" className="form-check-input col-md-5" />
                        <label htmlFor="finalGrade" className="form-check-label">Do not count this assignment to the
                            final grade</label>
                    </div>
                </div>
                <div className="row form-group mb-4 justify-content-center">
                    <p className="col-md-2 text-end">Assign</p>
                    <div className="col-md-6 form-box border border-secondary px-0 rounded">
                        <div className="px-2">
                            <strong>Assign to</strong>
                            <input type="text" className="form-control mb-3" placeholder="Everyone" />
                            <label htmlFor="dueDate"><strong>Due</strong></label>
                            <input 
                                type="date" 
                                className="form-control mb-3" 
                                id="dueDate"
                                value={assignment?.dueDate}
                                onChange={(e) =>
                                    dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))
                                }
                            />
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="availableFrom"><strong>Available from</strong></label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="availableFrom" 
                                        value={assignment?.availableFromDate}
                                        onChange={(e) =>
                                            dispatch(setAssignment({ ...assignment, availableFromDate: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="untilDate"><strong>Until</strong></label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="untilDate"
                                        value={assignment?.availableUntilDate}
                                        onChange={(e) =>
                                            dispatch(setAssignment({ ...assignment, availableUntilDate: e.target.value }))
                                        } 
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="bg-light py-2 w-100 border-0 rounded border-top border-secondary text-secondary text-center">+Add</button>
                    </div>
                </div>
                <div className="form-action-buttons d-flex justify-content-between">
                    <div>
                        <input type="checkbox" id="notifyChange" className="form-check-input mr-2" />
                        <label htmlFor="notifyChange" className="form-check-label mr-2">Notify users that this
                            content has
                            changed</label>
                    </div>
                    <div>
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger me-2">
                            Cancel
                        </Link>
                        <button onClick={handleSave} type="submit" className="btn btn-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default AssignmentEditor;