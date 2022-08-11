import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import employeeReducer from "./employeeReducer";
import inventoryReducer from "./inventoryReducer";
import dashboardReducer from "./dashboardReducer";
import businessHourReducer from "./businessHourReducer";
import locationReducer from "./locationReducer";
import uploadImageReducer from "./uploadImageReducer";
import billingReducer from "./billingReducer";
import integrationReducerCall from "./integrationReducer";
import deleteBusinessReducer from "./deleteBusinessReducer";
import addBusinessReducer from "./addBusinessReducer";
import updateBusinessIdReducer from "./updateBusinessIdReducer";
import passwordResetReducer from "./passwordResetReducer";
import passwordResetUserReducer from "./passwordResetUserReducer";
import userPasswordUpdateReducer from "./userPasswordUpdateReducer";
import deleteUserReducer from "./deleteUserReducer";
import orderReducer from "./orderReducer";
import moveProductImagesReducer from "./moveProductImagesReducer";
import invitationGetUserReducer from "./invitationGetUserReducer";
import employeeUpdateReducer from "./updateEmployeeReducer";
import updateAccountInformationReducer from "./updateAccountInformationReducer";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ActionType from "../actionTypes/type";

// Redux: Root Reducer
const appReducer = combineReducers({
  loginReducer: loginReducer,
  registerReducer: registerReducer,
  employeeReducer: employeeReducer,
  inventoryReducer: inventoryReducer,
  dashboardReducer: dashboardReducer,
  businessHourReducer: businessHourReducer,
  locationReducer: locationReducer,
  uploadImageReducer: uploadImageReducer,
  billingReducer: billingReducer,
  integrationReducerCall: integrationReducerCall,
  deleteBusinessReducer: deleteBusinessReducer,
  addBusinessReducer: addBusinessReducer,
  orderReducer: orderReducer,
  updateBusinessIdReducer: updateBusinessIdReducer,
  passwordResetReducer: passwordResetReducer,
  passwordResetUserReducer: passwordResetUserReducer,
  userPasswordUpdateReducer: userPasswordUpdateReducer,
  deleteUserReducer: deleteUserReducer,
  moveProductImagesReducer: moveProductImagesReducer,
  invitationGetUserReducer: invitationGetUserReducer,
  employeeUpdateReducer: employeeUpdateReducer,
  updateAccountInformationReducer: updateAccountInformationReducer
});

const RootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === ActionType.LOGOUT_USER_REQUEST) {
    AsyncStorage.removeItem("persist:root");
    AsyncStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

// Exports
export default RootReducer;
