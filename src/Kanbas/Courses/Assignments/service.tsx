import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;

const ASSIGNMENTS_API  = `${API_BASE}/api/assignments`;


    // Create a new assignment for a course
    export const createAssignment = async(courseId: string, assignment: any) => {
      const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
      );
      return response.data;
    };
  
    // Retrieve all assignments for a course
    export const  findAssignmentsForCourse = async (courseId: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}/assignments`
      );
      return response.data;
    };
  
    // Retrieve a single assignment by ID
    export const findAssignmentById = async (assignmentId: string) => {
      const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
      return response.data;
    };
  
    // Update an assignment
    export const  updateAssignment = async (assignment: any) => {
      const response = await axios.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
      );
      return response.data;
    };
  
    // Delete an assignment
    export const  deleteAssignment = async (assignmentId: string) => {
      const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
      return response.data; 
    };

  
