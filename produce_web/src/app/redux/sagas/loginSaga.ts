import { put, call, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../actionTypes/type";
import { actionSuccess, actionError } from "../actions/loginAction";
import { postApiCall } from "../../services/PostApiCall";
import { LOGIN_URL, SOCIAL_LOGIN_URL } from "../../services/ApiUrls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function* loginSaga(action) {
  try {
    //clear old login data before login
    AsyncStorage.clear();

    if (action.params.social_id === "") {
      const response = yield call(postApiCall, action.params, LOGIN_URL);
      yield put(actionSuccess(response.data.data));
      action.onSuccess(response.data.data);
    } else {
      const response = yield call(postApiCall, action.params, SOCIAL_LOGIN_URL);
      if(action.params.login != undefined && action.params.login == true){
        yield put(actionSuccess(response.data.data));
      }
      action.onSuccess(response.data.data);
    }
  } catch (error) {
    yield put(actionError(error));
    action.onError();
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
