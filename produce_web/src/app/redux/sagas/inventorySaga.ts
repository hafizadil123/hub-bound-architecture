import { put, call, takeLatest } from "redux-saga/effects";
import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_UPDATE_REQUEST,
  IMAGE_DELETE_REQUEST,
} from "../actionTypes/type";
import {
  actionInventoryListSuccess,
  actionInventoryListError,
  actionInventoryDeleteSuccess,
  actionInventoryDeleteError,
  inventoryUpdateError,
  inventoryUpdateSuccess,
  deleteImageError,
  deleteImageSuccess,
} from "../actions/inventoryAction";
import { postApiCall } from "../../services/PostApiCall";
import {
  INVENTORY_LISTING,
  INVENTORY_DELETE,
  INVENTORY_EDIT,
  DELETE_IMAGE,
} from "../../services/ApiUrls";

export function* inventorySaga(action) {
  try {
    const response = yield call(postApiCall, action.params, INVENTORY_LISTING);
    yield put(actionInventoryListSuccess(response.data.data, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionInventoryListError(error));
  }
}

export function* watchInventorySaga() {
  yield takeLatest(INVENTORY_LIST_REQUEST, inventorySaga);
}

export function* inventoryDeleteSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, INVENTORY_DELETE);
    yield put(actionInventoryDeleteSuccess(response.data.data));
    action.onInventoryDeleteSuccess();
  } catch (error) {
    yield put(actionInventoryDeleteError(error));
  }
}

export function* watchInventoryDeleteSaga() {
  yield takeLatest(INVENTORY_DELETE_REQUEST, inventoryDeleteSaga);
}
// update inventory
export function* inventoryUpdateSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, INVENTORY_EDIT);
    yield put(inventoryUpdateSuccess(response.data.data, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(inventoryUpdateError(error));
  }
}

export function* watchInventoryUpdateSaga() {
  yield takeLatest(INVENTORY_UPDATE_REQUEST, inventoryUpdateSaga);
}

// DELETE IMAGE
export function* deleteImageSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, DELETE_IMAGE);
    yield put(deleteImageSuccess(response.data.data, {}));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(deleteImageError(error));
  }
}

export function* watchDeleteImageSaga() {
  yield takeLatest(IMAGE_DELETE_REQUEST, deleteImageSaga);
}
