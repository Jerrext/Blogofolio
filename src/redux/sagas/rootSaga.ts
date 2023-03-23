import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import postsSaga from "./postsSaga";

export default function* rootSaga() {
  yield all([postsSaga(), authSaga()]);
}
