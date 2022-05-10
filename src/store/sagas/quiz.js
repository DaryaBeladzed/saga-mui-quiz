import { take, race, delay, put } from "redux-saga/effects";
import { gameActions } from "../slices/game";
import { quizActions } from "../slices/quiz";

function* quizSaga() {
  while (true) {
    const action = yield take(quizActions.fetchingSuccess.type);
    yield race([take(gameActions.endGame.type), questionTimer(action)]);
  }
}

function* questionTimer(action) {
  for (let i = 0; i < action.payload.length; i++) {
    yield race([delay(action.payload[0].type === "boolean" ? 10000 : 15000), take(quizActions.setAnswer.type)]);
    if (i < action.payload.length - 1) yield put(quizActions.nextQuestion());
    else yield put(gameActions.endGame());
  }
}

export default quizSaga;
