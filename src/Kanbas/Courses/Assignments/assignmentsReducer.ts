import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";


export const initialState = {
  assignments: assignments,
  assignment: { 
    title: "New Assignment",
    points: '',
    description: '',
    dueDate: '',
    availableFromDate: '',
    availableUntilDate: '',
  },
};


const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.assignments,
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      if (action.payload) {
        state.assignment = action.payload;
      } else {
        state.assignment = initialState.assignment;
      }
    },
  },
});


export const { addAssignment, deleteAssignment,
  updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
