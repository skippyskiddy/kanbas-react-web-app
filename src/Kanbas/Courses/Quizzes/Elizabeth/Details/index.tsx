import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { PiPencilLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../../store";
import { FiSlash } from "react-icons/fi";
import { useEffect } from "react";
import { selectQuiz, updateQuiz, Quiz } from "../../quizSlice";      
import { getDateObject } from "../Util/dateUtil";
import * as client from "./../client";

function QuizDetails() {
    const { courseId } = useParams();
    const { quizId } = useParams();
    const quizListFromReducer = useSelector((state: KanbasState) => state.quizReducer.quizzes);  // Retrieve current state variables quizzes from reducer.
    console.log("quizListFromReducer = " + JSON.stringify(quizListFromReducer));
    const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
    console.log("quiz = " + JSON.stringify(quiz));

    const dispatch = useDispatch();             // Get dispatch to call reducer functions.
    const navigate = useNavigate();

    function handleEditQuiz() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/DetailsEditor/${quiz.id}`);
    }

    function viewPreview() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/Preview/${quiz.id}`);
    }

    // If user is coming from clicking add quiz, set values to default values.
    // Else the user is coming from clicking an old quiz, so set values to the values of the quiz clicked.
    // Only run the effect on the initial render.
    useEffect(() => {
        console.log("useEffect");
        // Runs only on the first render.
        if ( quizId !== undefined ) {
            console.log("quizId = " + quizId);
            // quizId will never equal "QuizDetails". One cannot preview the quiz details of a non-created quiz.
            if (quizId.localeCompare("QuizDetails") !== 0) {
                const a = quizListFromReducer.find((quiz) => quiz.id === parseInt(quizId));
                dispatch(selectQuiz(a));
            }
        }
    }, []);

    const pubUnpub = async (quiz: Quiz) => {
        try {
            const updatedQuiz = {...quiz, published: !quiz.published}; 
            const status = await client.updateQuiz(updatedQuiz); 
            dispatch(updateQuiz(updatedQuiz));
        } catch (error: any) {
            console.log("pubUnpub error = " + error);
        }
    }
    
    return(
        <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {quiz?.published === undefined ? <button type="button" className="btn btn-light btn-outline-dark mt-1" onClick={() => pubUnpub(quiz)} style={{backgroundColor: "green", color: "white"}}><FaCheckCircle />Published</button> : (quiz?.published ? <button type="button" className="btn btn-light btn-outline-dark mt-1" onClick={() => pubUnpub(quiz)} style={{backgroundColor: "green", color: "white"}}><FaCheckCircle />Published</button>  : <button type="button" className="btn btn-light btn-outline-dark mt-1" onClick={() => pubUnpub(quiz)}><FiSlash />Unpublished</button>)}
                <button type="button" className="btn btn-light btn-outline-dark mt-1" onClick={viewPreview}>Preview</button>
                <button type="button" className="btn btn-light btn-outline-dark mt-1" onClick={handleEditQuiz}><PiPencilLight style = {{transform: 'rotate(270deg)'}} />Edit</button>
                <button type="button" className="btn btn-light btn-outline-dark mt-1"><FaEllipsisV /></button>
            </div>
            <hr/>

            <h1>{quiz?.title ? quiz?.title : ""}</h1>

            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Quiz Type</b></label>
                <label className="col">{quiz?.quizType ? quiz?.quizType : ""}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Points</b></label>
                <label className="col">{quiz?.points ? quiz?.points : ""}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Assignment Group</b></label>
                <label className="col">{quiz?.assignmentGroup ? quiz?.assignmentGroup : ""}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Shuffle Answers</b></label>
                <label className="col">{quiz?.shuffle ? "Yes" : "No"}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Time Limit</b></label>
                <label className="col">{quiz?.timeLimit ? quiz?.time : "None"} {quiz?.timeLimit && quiz?.time !== undefined ? parseInt(quiz?.time) < 2 ? "Minute" : "Minutes" : ""}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Multiple Attempts</b></label>
                <label className="col">{quiz?.multipleAttempts ? "Yes" : "No"}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>View Responses</b></label>
                <label className="col">{quiz?.viewResponses ? "Always" : "Never"}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Show Correct Answers</b></label>
                <label className="col">{quiz?.showCorrectAnswers ? getDateObject(quiz?.showCorrectAnswersDate).toDateString() : "No"}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>One Question at a Time</b></label>
                <label className="col">{quiz?.oneQuestion ? "Yes" : "No"}</label>
            </div>
            {/* This value is not assigned. So it is always going to show No. */}
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Require Respondus LockDown Browser</b></label>
                <label className="col">No</label>
            </div>
            {/* This value is not assigned. So it is always going to show No. */}
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Required to View Quiz Results</b></label>
                <label className="col">No</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Webcam Required</b></label>
                <label className="col">{quiz?.webCam ? "Yes" : "No"}</label>
            </div>
            <div className="row mb-3">
                <label className="col" style={{textAlign: "right"}}><b>Lock Questions After Answering</b></label>
                <label className="col">{quiz?.lockedQuestions ? "Yes" : "No"}</label>
            </div>

            <table className="table" style={{marginTop: "40px"}}>
                <thead>
                    <tr>
                    <th scope="col">Due</th>
                    <th scope="col">For</th>
                    <th scope="col">Available from</th>
                    <th scope="col">Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{quiz?.dueDate ? getDateObject(quiz?.dueDate).toDateString() : ""}</td>
                    <td>{quiz?.forAccess ? quiz?.forAccess : ""}</td>
                    <td>{quiz?.availableFromDate ? getDateObject(quiz?.availableFromDate).toDateString() : ""}</td>
                    <td>{quiz?.untilDate ? getDateObject(quiz?.untilDate).toDateString() : ""}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
export default QuizDetails;