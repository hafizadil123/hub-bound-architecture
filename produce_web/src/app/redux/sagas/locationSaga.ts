import { postApiCall } from "../../services/PostApiCall";
import {
  GET_BUSINESS_LOCATION,
  BUSINESS_LOCATION,
  DELETE_BUSINESS_LOCATION,
} from "../../services/ApiUrls";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  GET_LOCATION_REQUEST,
  SAVE_LOCATION_REQUEST,
  DELETE_LOCATION_REQUEST,
} from "../actionTypes/type";
import {
  getLocationSuccess,
  getLocationError,
  saveLocationError,
  saveLocationSuccess,
  deleteLocationSuccess,
  deleteLocationError,
} from "../actions/locationAction";

export function* getLocationSaga(action) {
  try {
    const response = yield call(
      postApiCall,
      action.params,
      GET_BUSINESS_LOCATION
    );
    yield put(getLocationSuccess(response.data.data, {}));
    action.onGetLocationSuccess(response.data.data);
  } catch (error) {
    yield put(getLocationError(error));
  }
}

export function* watchLocationSaga() {
  yield takeLatest(GET_LOCATION_REQUEST, getLocationSaga);
}
// add vs edit business hour

export function* saveLocationSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, BUSINESS_LOCATION);
    yield put(saveLocationSuccess(response.data.data, {}, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(saveLocationError(error, {}, {}));
  }
}

export function* watchSaveLocationSaga() {
  yield takeLatest(SAVE_LOCATION_REQUEST, saveLocationSaga);
}

export function* deleteLocationSaga(action) {
  try {
    const response = yield call(
      postApiCall,
      action.params,
      DELETE_BUSINESS_LOCATION
    );
    yield put(deleteLocationSuccess(response.data.data, {}, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(deleteLocationError(error, {}, {}));
  }
}

export function* watchDeleteLocationSaga() {
  yield takeLatest(DELETE_LOCATION_REQUEST, deleteLocationSaga);
}
