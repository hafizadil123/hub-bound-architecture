import {
  integrationSuccess,
  integrationError,
  integrationSaveError,
  integrationSaveSuccess,
} from "./../actions/integrationAction";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  INTEGRATION_INFO_REQUEST,
  SAVE_INTEGRATION_INFO_REQUEST,
} from "../actionTypes/type";

import { postApiCall } from "../../services/PostApiCall";
import {
  GET_INTEGRATION_INFO,
  SAVE_INTEGRATION_INFO,
} from "../../services/ApiUrls";

export function* integrationSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, GET_INTEGRATION_INFO);
    yield put(integrationSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(integrationError(e));
  }
}

export function* watchIntegrationSaga() {
  yield takeLatest(INTEGRATION_INFO_REQUEST, integrationSaga);
}

export function* saveIntegrationSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, SAVE_INTEGRATION_INFO);
    yield put(integrationSaveSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(integrationSaveError(e));
  }
}

export function* watchSaveIntegrationSaga() {
  yield takeLatest(SAVE_INTEGRATION_INFO_REQUEST, saveIntegrationSaga);
}
