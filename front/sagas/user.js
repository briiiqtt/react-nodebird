import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
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
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOG_IN_SUCCESS,
} from "../reducers/user";

function loadMyInfoAPI() {
  return axios.get("/user");
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({ type: LOAD_MY_INFO_SUCCESS, data: result.data });
  } catch (e) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: e.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/user/login", data);
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function logOutAPI() {
  console.log();
  return axios.post("/user/logout");
}
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    console.log(result);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}
function* signUp(action) {
  console.log("hi");
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function followAPI() {
  return axios.post("/user/follow");
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({ type: FOLLOW_SUCCESS, data: action.data });
  } catch (e) {
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function unfollowAPI() {
  return axios.post("/user/unfollow");
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
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
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadMyInfo),
  ]);
}
