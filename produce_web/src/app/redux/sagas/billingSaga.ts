import { put, call, takeLatest } from "redux-saga/effects";
import {
  BILLING_INFO_REQUEST,
  SAVE_BILLING_INFO_REQUEST,
} from "../actionTypes/type";
import {
  billingError,
  billingSuccess,
  billingSaveError,
  billingSaveSuccess,
} from "../actions/billingAction";
import { postApiCall } from "../../services/PostApiCall";
import { SAVE_BILLING_INFO, GET_BILLING_INFO } from "../../services/ApiUrls";

export function* billingSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, GET_BILLING_INFO);
    yield put(billingSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(billingError(e));
  }
}

export function* watchBillingSaga() {
  yield takeLatest(BILLING_INFO_REQUEST, billingSaga);
}

export function* saveBillingSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, SAVE_BILLING_INFO);
    yield put(billingSaveSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(billingSaveError(e));
  }
}

export function* watchSaveBillingSaga() {
  yield takeLatest(SAVE_BILLING_INFO_REQUEST, saveBillingSaga);
}
