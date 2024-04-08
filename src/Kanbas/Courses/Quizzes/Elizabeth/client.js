import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;

const QUIZZES_API = `${API_BASE}/api/quizzes`;

// updateQuiz service function that sends an HTTP PUT request to the server embedding the quiz's ID in the path
// and updates the HTTP body.
// Reponse's data will be a status code.
export const updateQuiz = async (quiz) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};  

// deleteQuiz service function that sends an HTTP DELETE request to the server encoding the quiz's ID in the path.
// Reponse contains a status code.
export const deleteQuiz = async (quizId) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

// Post a new quiz object in the body and encode the courseId in the path.
// Response's data contains the newly created quiz from the server.
// Append new quiz to the cached quizzes in the quiz reducer.
export const createQuiz = async (courseId, quiz) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};  

export const findQuizzesForCourse = async (courseId) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};