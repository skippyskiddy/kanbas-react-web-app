import { FaCaretDown, FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, selectQuiz, selectQuizzes, updateQuiz, Quiz } from "../quizSlice";       
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { IoRocketOutline } from "react-icons/io5";
import { FiSlash } from "react-icons/fi";
import { availableText, getDateObject } from "./Util/dateUtil";
import * as client from "./client";

function QuizDisplay() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const quizzesListFromReducer = useSelector((state: KanbasState) => state.quizReducer.quizzes);  // Retrieve current state variables quizzes from reducer.
    const [toBeDeleted, setToBeDeleted] = useState<Quiz | undefined>();
    const dispatch = useDispatch();             // Get dispatch to call reducer functions.
    const [showForDelete, setShowForDelete] = useState(false);
    const [showForAdd, setShowForAdd] = useState(false);

    useEffect(() => {
        client.findQuizzesForCourse(courseId).then((quizzes) => {
            dispatch(selectQuizzes(quizzes));
        });
    }, []);

    function handleShowAdd() {
        console.log("In handleAddQuiz");
        setShowForAdd(true);
    }

    function handleCloseNoAdd() {
        console.log("In handleCloseNoAdd");
        setShowForAdd(false);
    }

    function handleCloseYesAdd() {
        setShowForAdd(false);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/DetailsEditor/DetailsEditor`);
    }

    function handleShowDelete(quiz: Quiz) {
        setToBeDeleted(quiz);
        setShowForDelete(true);
    };

    function handleCloseYesDelete(quiz: Quiz  | undefined) {
        try {
            client.deleteQuiz(quiz?.id).then((status) => {dispatch(deleteQuiz(quiz?.id));});
        } catch (error: any) {
            console.log("handleCloseYesDelete error = " + error); 
        }
        setShowForDelete(false);
    }

    function handleCloseNoDelete() {
        setShowForDelete(false);
    }

    function handleEditQuiz(quiz: Quiz) {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quiz.id}`);
    }

    const handlePublish = async (quiz: Quiz) => {
        try {
            const updatedQuiz = {...quiz, published: !quiz.published}; 
            const status = await client.updateQuiz(updatedQuiz); 
            dispatch(updateQuiz(updatedQuiz));
        } catch (error: any) {
            console.log("handlePublish error = " + error);
        }
    }

    return (
        <>
            <div>
                <div className="form-outline w-25 float-start" data-mdb-input-init>
                    <input type="search" id="form1" className="form-control wd-nowrap mt-1" placeholder="Search for Quiz" title="Input search item."/>
                </div>

                <div className="float-end">
                    <button type="button" className="btn btn-light btn-outline-dark wd-add-quiz" onClick={() => handleShowAdd()} id="AddQuizBtn" title="Click to add quiz."><FaPlus /> Quiz</button>
                    <Modal show={showForAdd} backdrop="static" aria-labelledby="contained-modal-title-vcenter1" centered onHide={() => handleCloseNoAdd()}>
                        <Modal.Header closeButton>
                            Adding a Quiz
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure that you want to add a new quiz?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseNoAdd()}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => handleCloseYesAdd()}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <button type="button" className="btn btn-light btn-outline-dark"><FaEllipsisV /></button>
                </div>
                <div className="wd-float-done"></div>
            </div>
            <hr/>

            <ul className="list-group wd-quizSection">
                <li className="list-group-item" draggable="true">
                    <div style={{marginBottom: "15px", cursor: "pointer"}} className="ms-2">
                        <FaCaretDown style={{paddingRight: "5px"}} /> Assignment Quizzes
                    </div>

                    <ul className="list-group">
                        {quizzesListFromReducer.filter((quiz) => quiz.course === courseId).map((quiz) => (
                            <li id={quiz.id?.toString()} key={quiz.id} className={quiz.published ? "list-group-item wd-quiz wd-publishedQuiz" : "list-group-item wd-quiz" } onClick={() => selectQuiz(quiz)} draggable="true">
                                {quiz.published ? <IoRocketOutline className="ms-2 me-3" style={{color: "green"}}/> : <IoRocketOutline className="ms-2 me-3" style={{color: "grey"}}/>}
                                <span className="float-end">
                                    {quiz.published ? <button style={{backgroundColor: "unset"}} onClick={() => handlePublish(quiz)}><FaCheckCircle className="text-success"/></button> : <button style={{backgroundColor: "unset"}} onClick={() => handlePublish(quiz)}><FiSlash/></button>}
                                    
                                    <button id="threeDotDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: "unset"}}><FaEllipsisV className="ms-3 me-2"/></button>
                
                                    <ul className="dropdown-menu dropdown-menu-end wd-three-dot-menu" aria-labelledby="threeDotDropdown">
                                        <li><a className="dropdown-item" onClick={() => handleEditQuiz(quiz)}>Edit</a></li>
                                        <li><a className="dropdown-item" onClick={() => handleShowDelete(quiz)}>Delete</a></li>
                                        {quiz.published ? <li><a className="dropdown-item" onClick={() => handlePublish(quiz)}>Unpublish</a></li> : <li><a className="dropdown-item" onClick={() => handlePublish(quiz)}>Publish</a></li>}
                                    </ul>

                                    <Modal show={showForDelete} backdrop="static" aria-labelledby="contained-modal-title-vcenter2" centered onHide={() => handleCloseNoDelete()}>
                                        <Modal.Header closeButton>
                                            Deleting a Quiz
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure that you want to delete quiz: {toBeDeleted?.title}?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => handleCloseNoDelete()}>
                                                No
                                            </Button>
                                            <Button variant="primary" onClick={() => handleCloseYesDelete(toBeDeleted)}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </span>

                                <Link id="OpenAssignment" to={`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quiz.id}`} >
                                    <b>{quiz.title}</b><br/>
                                    <span className="wd-week-span">
                                    {availableText(quiz) === 1 ? <b>Closed</b> : availableText(quiz) === 2 ? <span><b>Not available until</b> {getDateObject(quiz.availableFromDate).toDateString()}</span> : availableText(quiz) === 3 ? <b>Available</b> : <b>ERROR</b>} | <b>Due: </b>{getDateObject(quiz.dueDate).toDateString()}{quiz.published ? <span>| {quiz.points} pts</span> : ""}{quiz.published ? <span>| {quiz.numQuestions} {parseInt(quiz.numQuestions) < 2 ? "Question" : "Questions"}</span> : ""}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default QuizDisplay;
