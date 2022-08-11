import { put, call, takeLatest } from "redux-saga/effects";
import {
  ORDER_LISTING_REQUEST,
  ORDER_VIEW_REQUEST,
  ORDER_SETTING_REQUEST,
  ORDER_UPDATE_REQUEST,
  LOAD_MORE_ORDER_LISTING_REQUEST,
} from "../actionTypes/type";
import {
  orderListingError,
  orderListingSuccess,
  orderViewError,
  orderViewSuccess,
  orderSettingSuccess,
  orderSettingError,
  orderUpdateError,
  orderUpdateSuccess,
  loadMoreOrderSuccess,
  loadMoreOrderError,
} from "../actions/orderAction";
import { postApiCall } from "../../services/PostApiCall";
import {
  ORDER_LISTING,
  ORDER_DETAIL_VIEW,
  UPDATE_ORDER_SETTING,
  UPDATE_ORDER_,
  ORDER_MORE_LISTING,
} from "../../services/ApiUrls";

export function* orderListingSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, ORDER_LISTING);
    yield put(orderListingSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(orderListingError(e));
  }
}

export function* watchOrderListingSaga() {
  yield takeLatest(ORDER_LISTING_REQUEST, orderListingSaga);
}

//order view
export function* orderViewSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, ORDER_DETAIL_VIEW);
    yield put(orderViewSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(orderViewError(e));
  }
}

export function* watchOrderViewSaga() {
  yield takeLatest(ORDER_VIEW_REQUEST, orderViewSaga);
}

//order setting
export function* orderSettingSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, UPDATE_ORDER_SETTING);
    yield put(orderViewSuccess(response.data.data, {}));
    onSuccess();
  } catch (e) {
    yield put(orderViewError(e));
  }
}

export function* watchOrderSettingSaga() {
  yield takeLatest(ORDER_SETTING_REQUEST, orderSettingSaga);
}

//order update
export function* orderUpdateSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, UPDATE_ORDER_);
    yield put(orderUpdateSuccess(response.data.data, {}));
    onSuccess();
  } catch (e) {
    yield put(orderUpdateError(e));
  }
}

export function* watchOrderUpdateSaga() {
  yield takeLatest(ORDER_UPDATE_REQUEST, orderUpdateSaga);
}

export function* orderLoadMoreListingSaga(action) {
  const { params, onSuccess } = action;
  try {
    const response = yield call(postApiCall, params, ORDER_MORE_LISTING);
    yield put(loadMoreOrderSuccess(response.data.data, {}));
    onSuccess(response.data.data);
  } catch (e) {
    yield put(loadMoreOrderError(e));
  }
}

export function* watchOrderLoadMoreListingSaga() {
  yield takeLatest(LOAD_MORE_ORDER_LISTING_REQUEST, orderLoadMoreListingSaga);
}
