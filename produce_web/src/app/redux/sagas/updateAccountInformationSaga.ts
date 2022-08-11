import { put, call, takeLatest } from "redux-saga/effects";
import {
  UPDATE_BUSINESS_REQUEST
} from "../actionTypes/type";
import { postApiCall } from "../../services/PostApiCall";
import { updateBusinessSuccess, updateBusinessError } from "../actions/updateAccountInformationAction";
import {
  UPDATE_BUSINESS
} from "../../services/ApiUrls";

//update
export function* updateBusinessSaga(action) {
    console.log("action:", action);
  try {
    const response = yield call(postApiCall, action.params, UPDATE_BUSINESS);
    yield put(updateBusinessSuccess(response.data.data, function(){}));
    action.onSuccess(response.data.data);
  } catch (error) {
    console.log("Err:", error);
    yield put(updateBusinessError(error, function(){}));
    action.onError();      
  }
}

export function* watchUpdateBusinessSaga() {
  yield takeLatest(UPDATE_BUSINESS_REQUEST, updateBusinessSaga);
}
