import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentInd: 0,
  score: 0,
  answers: [],
};

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    fetchingSuccess: (state, action) => {
      state.questions = action.payload;
      state.currentInd = 0;
      state.score = 0;
      state.answers = [];
    },
    setAnswer: (state, action) => {
      console.log("setAnswer");
      state.answers.push({
        question: state.questions[action.payload.ind].question,
        answer: action.payload.ans,
        correctAnswer: state.questions[action.payload.ind].correct_answer,
      });
      state.score +=
        action.payload.ans ===
        state.questions[action.payload.ind].correct_answer
          ? 1
          : 0;
    },
    nextQuestion: (state) => {
      console.log("next");
      state.currentInd += 1;
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice.reducer;
