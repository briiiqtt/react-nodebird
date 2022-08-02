import {
  all,
  fork,
  put,
  delay,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import shortid from "shortid";
import {
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function loadPostAPI(data) {
  return axios.post(`/api/post`, data);
}

function* loadPost(action) {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post(`/api/post`, data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({ type: ADD_POST_TO_ME, data: id });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: action.data });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostApi);
    yield delay(1000);
    yield put({ type: REMOVE_POST_SUCCESS, data: action.data });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(6000, LOAD_POSTS_REQUEST, loadPost);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}
