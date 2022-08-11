import { postApiCall } from "../../services/PostApiCall";
import { GET_BUSINESS_HOUR, BUSINESS_HOUR } from "../../services/ApiUrls";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  GET_BUSINESS_HOUR_REQUEST,
  ADD_VS_EDIT_BUSINESS_HOUR_REQUEST,
} from "../actionTypes/type";
import {
  businessHourSuccess,
  businessHourError,
  addVsEditBusinessHourSuccess,
  addVsEditBusinessHourError,
} from "../actions/businessHourAction";

export function* businessHourSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, GET_BUSINESS_HOUR);
    yield put(businessHourSuccess(response.data, {}, {}));
    action.onSuccess(response.data);
  } catch (error) {
    yield put(businessHourError(error, {}, {}));
    action.onFailure(error);
  }
}

export function* watchBusinessHourSaga() {
  yield takeLatest(GET_BUSINESS_HOUR_REQUEST, businessHourSaga);
}
// add vs edit business hour

export function* addVsEditBusinessHourSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, BUSINESS_HOUR);
    yield put(addVsEditBusinessHourSuccess(response.data.data, {}, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(addVsEditBusinessHourError(error, {}, {}));
    action.onError(error);
  }
}

export function* watchAddVsEditBusinessHourSaga() {
  yield takeLatest(
    ADD_VS_EDIT_BUSINESS_HOUR_REQUEST,
    addVsEditBusinessHourSaga
  );
}
