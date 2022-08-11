import { put, call, takeLatest } from "redux-saga/effects";
import { DELETE_BUSINESS_REQUEST } from "../actionTypes/type";
import {
  deleteBusinessSuccess,
  deleteBusinessError,
} from "../actions/deleteBusinessAction";
import { postApiCall } from "../../services/PostApiCall";
import { DELETE_BUSINESS } from "../../services/ApiUrls";

export function* deleteBusinessSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, DELETE_BUSINESS);
    yield put(deleteBusinessSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(deleteBusinessError(e));
  }
}

export function* watchDeleteBusinessSaga() {
  yield takeLatest(DELETE_BUSINESS_REQUEST, deleteBusinessSaga);
}
