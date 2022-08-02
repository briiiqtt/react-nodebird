import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";

function logInAPI() {
  return axios.post("/api/login");
}
function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInApi, action.data);
    yield put({ type: "LOG_IN_SUCCESS", data: action.data });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutApi);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post("/api/signup");
}
function* signUp() {
  try {
    yield delay(1000);
    // const result = yield call(logOutApi);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function followAPI() {
  return axios.post("/api/signup");
}
function* follow(action) {
  try {
    yield delay(1000);
    // const result = yield call(logOutApi);
    yield put({ type: FOLLOW_SUCCESS, data: action.data });
  } catch (e) {
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function unfollowAPI() {
  return axios.post("/api/signup");
}
function* unfollow(action) {
  try {
    yield delay(1000);
    // const result = yield call(logOutApi);
    yield put({ type: UNFOLLOW_SUCCESS, data: action.data });
  } catch (e) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
