import { put, call, takeLatest } from "redux-saga/effects";
import { SETTINGS_INFO_REQUEST } from "../actionTypes/type";
import { postApiCall } from "../../services/PostApiCall";
import { SETTINGS_INFO_URL } from "../../services/ApiUrls";

export function* settingsInfoSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, SETTINGS_INFO_URL);
    action.onSettingInfo(response.data.data);
  } catch (error) {}
}

export function* watchSettingsInfoSaga() {
  yield takeLatest(SETTINGS_INFO_REQUEST, settingsInfoSaga);
}
