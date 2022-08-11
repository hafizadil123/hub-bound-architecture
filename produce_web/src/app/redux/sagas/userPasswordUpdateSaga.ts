import { put, call, takeLatest } from "redux-saga/effects";
import { USER_PASSWORD_UPDATE_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/userPasswordUpdateAction";
import { postApiCall } from "../../services/PostApiCall";
import { USER_PASSWORD_UPDATE_URL } from "../../services/ApiUrls";

export function* userPasswordUpdateSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, USER_PASSWORD_UPDATE_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchUserPasswordUpdateSaga() {
  yield takeLatest(USER_PASSWORD_UPDATE_REQUEST, userPasswordUpdateSaga);
}
