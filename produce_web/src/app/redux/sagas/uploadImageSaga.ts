import { put, call, takeLatest } from "redux-saga/effects";
import  {uploadImageSuccess, imageListingSuccess} from '../actions/uploadImageAction'
import { UPLOAD_IMAGE_REQUEST , IMAGE_LISTING_REQUEST} from "../actionTypes/type";
import { postApiCall } from "../../services/PostApiCall";
import { UPLOAD_IMAGE , IMAGE_LISTING} from "../../services/ApiUrls";

export function* uploadImageSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, UPLOAD_IMAGE);
    yield put(uploadImageSuccess(response.data.data,{}));
    action.onSuccess(response.data.data)
  } catch (error) {}
}

export function* watchUploadImageSagaSaga() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImageSaga);
}

export function* imageListingSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, IMAGE_LISTING);
    yield put(imageListingSuccess(response.data.data));
  } catch (error) {}
}

export function* watchImageListingSaga() {
  yield takeLatest(IMAGE_LISTING_REQUEST, imageListingSaga);
}