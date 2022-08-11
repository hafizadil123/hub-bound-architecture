import { put, call, takeLatest } from "redux-saga/effects";
import { MOVE_PRODUCT_IMAGES_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/moveProductImagesAction";
import { postApiCall } from "../../services/PostApiCall";
import { MOVE_PRODUCT_IMAGES_URL } from "../../services/ApiUrls";

export function* moveProductImagesSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, MOVE_PRODUCT_IMAGES_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchMoveProductImagesSaga() {
  yield takeLatest(MOVE_PRODUCT_IMAGES_REQUEST, moveProductImagesSaga);
}
