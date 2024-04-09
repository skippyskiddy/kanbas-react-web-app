// src/features/quizzes/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { quizzes } from "../../Database";


// export const initialState = {
//   quizzes: quizzes,
//   quiz: {
//     title: ' Quiz Title ',
//     published: false,
//     questions: [],
//   }  
// };
// Combined initial state with elements from both slices
export const initialState = {
  quizzes: quizzes,
  quiz: {
    id: "",
    title: 'Unnamed Quiz',
    subtitle: 'New Subtitle',
    instructions: '<p><br></p>',
    quizType: 'Graded Quiz',
    assignmentGroup: 'Quizzes',
    shuffle: true,
    timeLimit: true,
    time: '20',
    multipleAttempts: false,
    showCorrectAnswers: true,
    showCorrectAnswersDate: '',
    hideCorrectAnswersDate: '',
    accessCodeOn: false,
    accessCode: '',
    viewResponses: true,
    oneQuestion: true,
    webCam: false,
    lockedQuestions: false,
    forAccess: 'Everyone',
    dueDate: '',
    availableFromDate: '',
    untilDate: '',
    points: '0',
    numQuestions: '0',
    published: false,
    questions: [],
  }
};



export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blanks';

// export interface Quiz {
//   id: number;
//   title: string;
//   courseId: string;
//   published: boolean;
//   questions: NewQuestionTemplate[];
// }

// export interface NewQuestionTemplate {
//   id?: number;
//   title: string;
//   type: string;
//   text: string;
//   points: number;
//   options?: string[];
//   correctAnswer: string;
//   blanks?: { [key: string]: string[]; }; // Only for fill_in_blanks
//   status?: string; //publish unpublish
// }

export interface Quiz {
  id?: number;
  title: string;
  subtitle: string;
  instructions: string;
  quizType: string;
  assignmentGroup: string;
  shuffle: boolean;
  timeLimit: boolean;
  time: string;
  multipleAttempts: boolean;
  showCorrectAnswers: boolean;
  showCorrectAnswersDate: string;
  hideCorrectAnswersDate: string;
  accessCodeOn: boolean;
  accessCode: string;
  viewResponses: boolean;
  oneQuestion: boolean;
  webCam: boolean;
  lockedQuestions: boolean;
  forAccess: string;
  dueDate: string;
  availableFromDate: string;
  untilDate: string;
  points: string;
  numQuestions: string;
  published: boolean;
  questions: NewQuestionTemplate[];
  course?: string;
}

export interface NewQuestionTemplate {
  id?: number;
  title: string;
  type: string;
  text: string;
  points: number;
  options?: string[];
  correctAnswer: string;
  blanks?: { [key: string]: string[] };
  status?: string;
}



const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<{ quizId: number; question: any }>) => {
      const { quizId, question } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        question.id = Math.max(0, ...quiz.questions.map(q => q.id)) + 1; // Simple ID generation logic
        quiz.questions.push({ ...question, status: 'draft' });
      }
    },
    editQuestion: (state, action: PayloadAction<{ quizId: number; questionId: number; question: Partial<any> }>) => {
      const { quizId, questionId, question } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        const questionIndex = quiz.questions.findIndex(q => q.id === questionId);
        if (questionIndex !== -1) {
          quiz.questions[questionIndex] = { ...quiz.questions[questionIndex], ...question };
        }
      }
    },
    saveQuestion: (state, action: PayloadAction<{ quizId: number; questionId: number; question: Partial<NewQuestionTemplate> }>) => {
      const { quizId, questionId, question } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        const questionIndex = quiz.questions.findIndex(q => q.id === questionId);
        if (questionIndex !== -1) {
          quiz.questions[questionIndex] = { ...quiz.questions[questionIndex], ...question };
        }
      }
    },
    saveQuestions: (state, action: PayloadAction<{ quizId: number; questions: any[] }>) => {
      const { quizId, questions } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.questions = [...questions];
      }
    },
    deleteQuestion: (state, action: PayloadAction<{ quizId: number; questionId: number }>) => {
      const { quizId, questionId } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter(q => q.id !== questionId);
      }
    },
    publishQuestion: (state, action: PayloadAction<{ quizId: number; questionId: number }>) => {
      const { quizId, questionId } = action.payload;
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (quiz) {
        const question = quiz.questions.find(q => q.id === questionId);
        if (question) {
          question.status = 'published';
        }
      }
    },

    selectQuizzes: (state, action) => {
      state.quizzes = action.payload;
      console.log(state.quizzes);
    },

    // addQuiz reducer function, action contains new quiz in action.payload. Overide _id as timestamp
    addQuiz: (state, action) => {             // New quiz is in action.payload.
      state.quizzes = [                     // Update quizzes in state adding new quiz at beginning of array. Update quizzes.
        { ...action.payload, id: new Date().getTime().toString() },        // Override _id with timestamp.
        ...state.quizzes,
      ];
      state.quiz = {
        id: "", title: "Unnamed Quiz", subtitle: "New Subtitle",
        instructions: "<p><br></p>", quizType: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffle: true, timeLimit: true, time: "20",
        multipleAttempts: false, showCorrectAnswers: true,
        showCorrectAnswersDate: "", hideCorrectAnswersDate: "", accessCodeOn: false,
        accessCode: "", viewResponses: true,
        oneQuestion: true, webCam: false, lockedQuestions: false,
        forAccess: "Everyone", dueDate: "", availableFromDate: "",
        untilDate: "", points: "0", numQuestions: "0", published: false, questions: [],
      };  // Clear quiz.
    },

    // deleteQuiz reducer function, action contains quiz's ID to filter out.
    deleteQuiz: (state, action) => {            // Assignment ID to delete is in action.payload.
      state.quizzes = state.quizzes.filter(   // Filter out quiz to delete.
        (quiz) => quiz.id !== action.payload
      );
    },

    // updateQuiz function, replacing old quiz in action.payload update quizzes.
    updateQuiz: (state, action) => {          // Quiz to update is in action.payload.
      // Replace quiz whose ID matches action.payload.id.
      state.quizzes = state.quizzes.map((quiz) => (quiz.id === action.payload.id ? action.payload : quiz));
      state.quiz = {
        id: "", title: "Unnamed Quiz", subtitle: "New Subtitle",
        instructions: "<p><br></p>", quizType: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffle: true, timeLimit: true, time: "20",
        multipleAttempts: false, showCorrectAnswers: true,
        showCorrectAnswersDate: "", hideCorrectAnswersDate: "", accessCodeOn: false,
        accessCode: "", viewResponses: true,
        oneQuestion: true, webCam: false, lockedQuestions: false,
        forAccess: "Everyone", dueDate: "", availableFromDate: "",
        untilDate: "", points: "0", numQuestions: "0", published: false, questions: [],
      };  // Clear quiz.
    },

    // selectQuiz reducer function to update quiz state variable.
    selectQuiz: (state, action) => {             // Select the quiz to edit.
      state.quiz = action.payload;
    },
  },
});

export const { addQuestion, editQuestion, saveQuestion, publishQuestion, deleteQuestion, saveQuestions,
  addQuiz, deleteQuiz, updateQuiz, selectQuiz, selectQuizzes } = quizSlice.actions;

export default quizSlice.reducer;
