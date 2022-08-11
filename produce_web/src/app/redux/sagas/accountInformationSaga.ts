import { call, takeLatest } from "redux-saga/effects";
import {
  ACCOUNT_INFO_REQUEST
} from "../actionTypes/type";
import { postApiCall } from "../../services/PostApiCall";
import {
  BUSINESS_INFO
} from "../../services/ApiUrls";

export function* accountInfoSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, BUSINESS_INFO);
    action.onSuccess(response.data.data);
  } catch (error) {}
}

export function* watchAccountInfoSaga() {
  yield takeLatest(ACCOUNT_INFO_REQUEST, accountInfoSaga);
}