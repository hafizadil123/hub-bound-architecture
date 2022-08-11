import { put, call, takeLatest } from "redux-saga/effects";
import { EMPLOYEE_UPDATE_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/updateEmployeeAction";
import { postApiCall } from "../../services/PostApiCall";
import { EMPLOYEE_UPDATE_URL } from "../../services/ApiUrls";

export function* employeeUpdateSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, EMPLOYEE_UPDATE_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchEmployeeUpdateSaga() {
  yield takeLatest(EMPLOYEE_UPDATE_REQUEST, employeeUpdateSaga);
}
