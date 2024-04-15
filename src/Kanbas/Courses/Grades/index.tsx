import { FaCog, FaDownload, FaSearch, FaUpload } from "react-icons/fa";
import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import './index.css';

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId || '0');
    const es = enrollments.filter((enrollment) => enrollment.course === courseId || '0');
    return (
        <div>
            {/* <h1>Grades</h1> */}
            <div className="flex-fill px-2">
                <div className="d-flex justify-content-between mb-3">
                    <div className="ms-auto text-black">
                        <button className="btn bg-light btn-outline-secondary me-2 text-black"><FaUpload className="me-2" />
                            Import</button>
                        <button className="btn bg-light btn-outline-secondary me-2 text-black"><FaDownload className="me-2" />
                            Export</button>
                        <button className="btn bg-light btn-outline-secondary text-black"><FaCog /></button>
                    </div>
                </div>

                <div className="d-grid pt-1">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>Student Names</h5>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                                <input type="text" className="form-control" placeholder="Search Students" aria-label="student-name"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h5>Assignment Names</h5>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2"><FaSearch /></span>
                                <input type="text" className="form-control" placeholder="Search Assignments"
                                    aria-label="assignment-name" aria-describedby="basic-addon2" />
                            </div>
                        </div>
                    </div>
                </div>

                <button className="mb-2 btn bg-light btn-outline-secondary me-2 text-black"><i className="fa fa-filter"></i> Apply Filters</button>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <th>Student Name</th>
                            {as.map((assignment) => (<th>{assignment.title}</th>))}
                        </thead>
                        <tbody>
                            {es.map((enrollment) => {
                                const user = users.find((user) => user._id === enrollment.user);
                                return (
                                    <tr>
                                        <td className="text-danger">{user?.firstName} {user?.lastName}</td>
                                        {as.map((assignment) => {
                                            const grade = grades.find(
                                                (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                            return (<td>{grade?.grade || <input className="form-control-sm" type="text" />}</td>);
                                        })}
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}
export default Grades;

