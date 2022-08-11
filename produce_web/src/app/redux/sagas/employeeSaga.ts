import { put, call, takeLatest } from "redux-saga/effects";
import {
  EMPLOYESS_LIST_REQUEST,
  EMPLOYES_DELETE_REQUEST,
} from "../actionTypes/type";
import {
  actionSuccess,
  actionError,
  actionDeleteSuccess,
  actionDeleteError,
} from "../actions/employeeAction";
import { postApiCall } from "../../services/PostApiCall";
import { EMP_LIST_URL, EMP_DELETE_URL } from "../../services/ApiUrls";

export function* employeeSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, EMP_LIST_URL);
    yield put(actionSuccess(response.data.data, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
  }
}

export function* watchEmployeeSaga() {
  yield takeLatest(EMPLOYESS_LIST_REQUEST, employeeSaga);
}

export function* employeeDeleteSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, EMP_DELETE_URL);
    yield put(actionDeleteSuccess(response.data.data));
    action.onEmpDeleteSuccess();
  } catch (error) {
    yield put(actionDeleteError(error));
  }
}

export function* watchEmployeeDeleteSaga() {
  yield takeLatest(EMPLOYES_DELETE_REQUEST, employeeDeleteSaga);
}
