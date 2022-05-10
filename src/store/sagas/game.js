import { call, fork, put, take } from "redux-saga/effects";
import { getQuizFromApi } from "../../utils/api";
import { gameActions } from "../slices/game";
import { quizActions } from "../slices/quiz";

function* gameSaga() {
  while (true) {
    const action = yield take(gameActions.startGame.type);
    yield fork(fetchQuizQuestions, action.payload);
  }
}

function* fetchQuizQuestions({ numberOfQuestion, category, difficulty, type }) {
  const diff = `${difficulty === "any" ? "" : `&difficulty=${difficulty}`}`;
  const url = `https://opentdb.com/api.php?amount=${numberOfQuestion}&type=${type}&category=${category}${diff}`;

  try {
    const quiz = yield call(getQuizFromApi, url);
    yield put(quizActions.fetchingSuccess(quiz));
  } catch (error) {
    yield put(gameActions.setError(error));
  }
}

export default gameSaga;
