import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../../store";
import "./index.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { getCurrentTime } from "../Util/dateUtil";
import { IoMdArrowDropright } from "react-icons/io";

// TODO: FINISH!
function QuizPreview() {
    const { courseId } = useParams();
    const { quizId } = useParams();
    const quizListFromReducer = useSelector((state: KanbasState) => state.quizReducer.quizzes);  // Retrieve current state variables quizzes from reducer.
    const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

    const today = new Date();
    const time = getCurrentTime(today);
    const todayStatement = "Started: " + today.toDateString() + " at " + time;

    const navigate = useNavigate();
    function handleEditQuiz() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/DetailsEditor/${quiz.id}`);
    }

    function handleSubmitClick() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quiz.id}`);
    }

    return(
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
                <h1>{quiz?.title ? quiz?.title : ""}</h1>
                <p className="wd-warning-message"><AiOutlineExclamationCircle/> This is a preview of the published version of the quiz</p> 
                <p className="wd-section">{todayStatement}</p>
                <h1>Quiz Instructions</h1>
                <hr/>

                <div>
                    <button className="btn btn-light btn-outline-dark float-end" style={{marginBottom: "30px", marginTop: "30px"}}>Next <IoMdArrowDropright/></button>
                </div>

                <div className="container p-3 wd-end-section">
                    <div className="wd-extra-section"></div>
                    <span style={{flex: "2"}}>Quiz saved at {time}</span>
                    <button className="btn btn-light btn-outline-dark"  onClick={handleSubmitClick}>Submit Quiz</button>
                </div>
            </div>
            <div className="col-xl-3 d-none d-xl-block" style={{paddingLeft: "revert-layer"}}>
                <button className="btn btn-light btn-outline-dark" onClick={handleEditQuiz}><TiPencil style = {{transform: 'rotate(270deg)'}}/> Keep Editing This Quiz</button>
                <h5 style={{marginTop: "20px"}}>Questions</h5>
            </div>
        </div>
    );
}
export default QuizPreview;