import axios from "axios";
import { all, fork, delay, put, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
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
function signUpAPI() {
  return axios.post("/api/signup");
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
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
