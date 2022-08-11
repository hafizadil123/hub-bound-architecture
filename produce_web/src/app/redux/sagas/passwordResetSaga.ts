import { put, call, takeLatest } from "redux-saga/effects";
import { PASSWORD_RESET_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/passwordResetAction";
import { postApiCall } from "../../services/PostApiCall";
import { PASSWORD_RESET_MAIL_URL } from "../../services/ApiUrls";

export function* passwordResetSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, PASSWORD_RESET_MAIL_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchPasswordResetSaga() {
  yield takeLatest(PASSWORD_RESET_REQUEST, passwordResetSaga);
}
