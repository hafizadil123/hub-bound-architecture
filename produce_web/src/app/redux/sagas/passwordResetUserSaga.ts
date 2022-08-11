import { put, call, takeLatest } from "redux-saga/effects";
import { PASSWORD_RESET_USER_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/passwordResetTokenGetUserAction";
import { postApiCall } from "../../services/PostApiCall";
import { PASSWORD_RESET_TOKEN_GET_USER_URL } from "../../services/ApiUrls";

export function* passwordResetUserSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, PASSWORD_RESET_TOKEN_GET_USER_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchPasswordResetUserSaga() {
  yield takeLatest(PASSWORD_RESET_USER_REQUEST, passwordResetUserSaga);
}
