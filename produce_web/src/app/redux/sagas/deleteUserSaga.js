import { put, call, takeLatest } from "redux-saga/effects";
import { USER_DELETE_REQUEST } from "../actionTypes/type";
import {
  deleteUserSuccess, deleteUserError
} from "../actions/deleteUserAction";
import { postApiCall } from "../../services/PostApiCall";
import { USER_DELETE_URL } from "../../services/ApiUrls";

export function* deleteUserSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, USER_DELETE_URL);
    yield put(deleteUserSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(deleteUserError(e));
  }
}

export function* watchDeleteUserSaga() {
  yield takeLatest(USER_DELETE_REQUEST, deleteUserSaga);
}
