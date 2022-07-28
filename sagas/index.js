import { all, fork, call, take, put } from "redux-saga/effects";
import axios from "axios";

function logInApi() {
  return axios.post("/api/login");
}
function logInApi() {
  return axios.post("/api/logout");
}
function addPostApi() {
  return axios.post("/api/post");
}

function* logIn(action) {
  try {
    const result = yield call(logInApi, action.data);
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
    const result = yield call(logOutApi);
    yield put({ type: "LOG_OUT_SUCCESS", data: result.data });
  } catch (e) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: e.response.data,
    });
  }
}
function* addPost() {
  try {
    const result = yield call(addPostApi);
    yield put({ type: "ADD_POST_SUCCESS", data: result.data });
  } catch (e) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: e.response.data,
    });
  }
}

function* watchLogIn() {
  yield take("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield take("ADD_POST_REQUEST");
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn), //call
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
