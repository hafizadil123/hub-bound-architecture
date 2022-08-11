import { put, call, takeLatest } from "redux-saga/effects";
import { DASHBOARD_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/dashboardAction";
import { postApiCall } from "../../services/PostApiCall";
import { DASHBOARD_URL } from "../../services/ApiUrls";

export function* dashboardSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, DASHBOARD_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
  }
}

export function* watchDashboardSaga() {
  yield takeLatest(DASHBOARD_REQUEST, dashboardSaga);
}
