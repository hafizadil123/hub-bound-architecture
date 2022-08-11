import { put, call, takeLatest } from "redux-saga/effects";
import { USER_INVITATION_TOKEN_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/invitationGetUserAction";
import { postApiCall } from "../../services/PostApiCall";
import { USER_INVITATION_TOKEN_GET_USER_URL } from "../../services/ApiUrls";

export function* invitationGetUserSaga(action) {
  try {
    const response = yield call(postApiCall, action.params, USER_INVITATION_TOKEN_GET_USER_URL);
    yield put(actionSuccess(response.data.data));
    action.onSuccess(response.data.data);
  } catch (error) {
    yield put(actionError(error));
    action.onError(error);
  }
}

export function* watchInvitationGetUserSaga() {
  yield takeLatest(USER_INVITATION_TOKEN_REQUEST, invitationGetUserSaga);
}
