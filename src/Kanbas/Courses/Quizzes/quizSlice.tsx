// src/features/quizzes/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { quizzes } from "../../Database";


export const initialState = {
  quizzes: quizzes,
  quiz: {
    title: ' Quiz Title ',
    published: false,
    questions: [],
  }  
};

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blanks';

export interface Quiz {
  id: number;
  title: string;
  courseId: string;
  published: boolean;
  questions: NewQuestionTemplate[];
}

export interface NewQuestionTemplate {
  id?: number;
  title: string;
  type: string;
  text: string;
  points: number;
  options?: string[];
  correctAnswer: string;
  blanks?: { [key: string]: string[]; }; // Only for fill_in_blanks
  status?: string; //publish unpublish
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
  },
});

export const { addQuestion, editQuestion, saveQuestion, publishQuestion, deleteQuestion, saveQuestions } = quizSlice.actions;

export default quizSlice.reducer;
