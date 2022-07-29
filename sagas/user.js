import { all, fork, delay, put, takeLatest } from "redux-saga/effects";

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInApi, action.data);
    yield put({ type: "LOG_IN_SUCCESS", data: result.data });
  } catch (e) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: e.response.data,
    });
  }
}
function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutApi);
    yield put({ type: "LOG_OUT_SUCCESS", data: result.data });
  } catch (e) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: e.response.data,
    });
  }
}
export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}

function logInApi() {
  return axios.post("/api/login");
}
function logOutApi() {
  return axios.post("/api/logout");
}
function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST");
}

function addPostApi() {
  return axios.post("/api/post");
}
