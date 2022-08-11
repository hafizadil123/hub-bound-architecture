import { all } from "redux-saga/effects";
import { watchLoginSaga } from "./loginSaga";
import { watchRegisterSaga } from "./registerSaga";
import { watchPasswordResetSaga } from "./passwordResetSaga";
import { watchPasswordResetUserSaga } from "./passwordResetUserSaga";
import { watchUserPasswordUpdateSaga } from "./userPasswordUpdateSaga";
import {
  watchInventorySaga,
  watchInventoryDeleteSaga,
  watchInventoryUpdateSaga,
  watchDeleteImageSaga,
} from "./inventorySaga";
import { watchEmployeeSaga, watchEmployeeDeleteSaga } from "./employeeSaga";
import { watchSettingsInfoSaga } from "./settingsSaga";
import {
  watchAccountInfoSaga
} from "./accountInformationSaga";
import { watchUpdateBusinessSaga } from "./updateAccountInformationSaga";
import { watchDashboardSaga } from "./dashbordSaga";
import {
  watchUploadImageSagaSaga,
  watchImageListingSaga,
} from "./uploadImageSaga";
import {
  watchBusinessHourSaga,
  watchAddVsEditBusinessHourSaga,
} from "./businessHourSaga";
import {
  watchLocationSaga,
  watchSaveLocationSaga,
  watchDeleteLocationSaga,
} from "./locationSaga";
import { watchBillingSaga, watchSaveBillingSaga } from "./billingSaga";
import {
  watchIntegrationSaga,
  watchSaveIntegrationSaga,
} from "./integrationSaga";
import { watchDeleteBusinessSaga } from "./deleteBusinessSaga";
import { watchAddVsEditBusinessSaga } from "./addBusinessSaga";
import { watchDeleteUserSaga } from "./deleteUserSaga";
import {
  watchOrderListingSaga,
  watchOrderViewSaga,
  watchOrderSettingSaga,
  watchOrderUpdateSaga,
  watchOrderLoadMoreListingSaga,
} from "./orderSaga";
import { watchMoveProductImagesSaga } from "./moveProductImagesSaga";
import { watchInvitationGetUserSaga } from "./invitationGetUserSaga";
import { watchEmployeeUpdateSaga } from "./employeeUpdateSaga";

function* RootSaga() {
  yield all([
    watchLoginSaga(),
    watchRegisterSaga(),
    watchEmployeeSaga(),
    watchEmployeeDeleteSaga(),
    watchSettingsInfoSaga(),
    watchInventorySaga(),
    watchInventoryDeleteSaga(),
    watchAccountInfoSaga(),
    watchDashboardSaga(),
    watchBusinessHourSaga(),
    watchAddVsEditBusinessHourSaga(),
    watchLocationSaga(),
    watchSaveLocationSaga(),
    watchDeleteLocationSaga(),
    watchUploadImageSagaSaga(),
    watchImageListingSaga(),
    watchSaveBillingSaga(),
    watchBillingSaga(),
    watchIntegrationSaga(),
    watchSaveIntegrationSaga(),
    watchDeleteBusinessSaga(),
    watchAddVsEditBusinessSaga(),
    watchUpdateBusinessSaga(),
    watchOrderListingSaga(),
    watchOrderViewSaga(),
    watchInventoryUpdateSaga(),
    watchOrderSettingSaga(),
    watchOrderUpdateSaga(),
    watchOrderLoadMoreListingSaga(),
    watchDeleteImageSaga(),
    watchPasswordResetSaga(),
    watchPasswordResetUserSaga(),
    watchUserPasswordUpdateSaga(),
    watchDeleteUserSaga(),
    watchMoveProductImagesSaga(),
    watchInvitationGetUserSaga(),
    watchEmployeeUpdateSaga()
  ]);
}
export default RootSaga;
