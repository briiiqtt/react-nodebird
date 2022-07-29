import { all, fork, put, delay } from "redux-saga/effects";

function* addPost() {
  try {
    yield delay(1000);
    // const result = yield call(addPostApi);
    yield put({ type: "ADD_POST_SUCCESS", data: result.data });
  } catch (e) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: e.response.data,
    });
  }
}
export default function* postSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
