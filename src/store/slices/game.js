import { createSlice } from "@reduxjs/toolkit";
import { START_GAME, END_GAME, GAME } from "../../utils/constants";
import { quizActions } from "./quiz";

const initialState = {
  username: "anonymous",
  stage: START_GAME,
  isLoading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.username = action.payload.username || "anonymous";
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    endGame: (state) => {
      state.stage = END_GAME;
    },
    restartGame: (state) => {
      state.stage = START_GAME;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(quizActions.fetchingSuccess, (state) => {
      state.stage = GAME;
      state.isLoading = false;
    }),
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
