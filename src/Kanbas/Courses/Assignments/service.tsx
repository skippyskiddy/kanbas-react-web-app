import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";


const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";

export const AssignmentService = {
    // Create a new assignment for a course
    createAssignment: async (courseId: string, assignment: any) => {
      const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
      );
      return response.data;
    },
  
    // Retrieve all assignments for a course
    findAssignmentsForCourse: async (courseId: string) => {
      const response = await axios.get(
        `$${COURSES_API}/${courseId}/assignments`
      );
      return response.data;
    },
  
    // Retrieve a single assignment by ID
    findAssignmentById: async (assignmentId: string) => {
      const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
      return response.data;
    },
  
    // Update an assignment
    updateAssignment: async (assignment: any) => {
      const response = await axios.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
      );
      return response.data;
    },
  
    // Delete an assignment
    deleteAssignment: async (assignmentId: string) => {
      const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
      return response.data; 
    },
  };
  
  export default AssignmentService;