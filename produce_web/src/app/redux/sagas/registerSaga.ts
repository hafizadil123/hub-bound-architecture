import { put, call, takeLatest } from "redux-saga/effects";
import { REGISTER_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/registerAction";
import { postApiCall } from "../../services/PostApiCall";
import { REGISTER_URL } from "../../services/ApiUrls";

export function* registerSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, REGISTER_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}
