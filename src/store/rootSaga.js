import { all } from "redux-saga/effects";
import gameSaga from "./sagas/game";
import quizSaga from "./sagas/quiz";

function* rootSaga() {
  yield all([gameSaga(), quizSaga()]);
}

export default rootSaga;
