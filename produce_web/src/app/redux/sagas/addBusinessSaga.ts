import { postApiCall } from "../../services/PostApiCall";
import { ADD_BUSINESS } from "../../services/ApiUrls";
import { put, call, takeLatest } from "redux-saga/effects";
import { ADD_BUSINESS_REQUEST } from "../actionTypes/type";
import {
  addVsEditBusinessSuccess,
  addVsEditBusinessError,
} from "../actions/addBusinessAction";

export function* addVsEditBusinessSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, ADD_BUSINESS);
    yield put(addVsEditBusinessSuccess(response.data.data, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(addVsEditBusinessError(error, {}));
    action.onError(error);
  }
}

export function* watchAddVsEditBusinessSaga() {
  yield takeLatest(ADD_BUSINESS_REQUEST, addVsEditBusinessSaga);
}
