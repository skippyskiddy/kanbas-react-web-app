import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizReducer from '../Courses/Quizzes/quizSlice'; // Import the quiz slice



export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  };
  quizReducer: {
    quizzes: any[];
    quiz: any;
  }

}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizReducer,

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;