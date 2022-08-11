export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPED: 202,
  ALREADY_REPORTED: 208,
  UNAUTHORIZED: 401,
  INVAILDCREDENTIALS: 1001,
  NOT_FOUND: 404,
  FORBIDDEN: 422,
  ACCESS_DENIED: 403
};

/**
 * Api Response erros
 */
export const API_STANDRAD_ERRORS = {
  NETWORK_ERROR: "Internet Error"
};

export const DASHBOARD_URL = "/api/dashboard";
export const LOGIN_URL = "/api/login";
export const SOCIAL_LOGIN_URL = "/api/sociallogin";
export const REGISTER_URL = "/api/register";
export const UPDATE_ACCOUNT_INFO_URL = "/api/updateaccount";
export const EMP_REGISTER_URL = "/api/addemployee";
export const EMP_UPDATE_URL = "/api/editemployee";
export const EMP_LIST_URL = "/api/employees";
export const EMP_DELETE_URL = "/api/employee-delete";
export const USER_DELETE_URL = "/api/user-delete";
export const EMP_INFO_URL = "/api/employee-info";
export const SETTINGS_SAVE_URL = "/api/settings-save";
export const SETTINGS_INFO_URL = "/api/settings";
export const INVENTORY_SAVE = "/api/add-inventory";
export const INVENTORY_EDIT = "/api/edit-inventory";
export const INVENTORY_LISTING = "/api/inventory-listing";
export const INVENTORY_DELETE = "/api/delete-inventory";
export const GET_BUSINESS_HOUR = "/api/get-business-hours";
export const BUSINESS_HOUR = "/api/business-hours";
export const BUSINESS_LOCATION = "/api/business-location";
export const GET_BUSINESS_LOCATION = "/api/get-business-location";
export const DELETE_BUSINESS_LOCATION = "/api/delete-business-location";
export const UPLOAD_IMAGE = "/api/upload-image";
export const IMAGE_LISTING = "/api/library";
export const SAVE_BILLING_INFO = "/api/billing-info";
export const GET_BILLING_INFO = "/api/get-billing-info";
export const GET_INTEGRATION_INFO = "/api/integrations";
export const SAVE_INTEGRATION_INFO = "/api/integration-save";
export const DELETE_BUSINESS = "/api/delete-busniess";
export const BUSINESS_INFO = "/api/business-info";
export const ADD_BUSINESS = "/api/add-business";
export const UPDATE_BUSINESS = "/api/updateaccount";
export const ORDER_LISTING = "/api/orders";
export const ORDER_MORE_LISTING = "/api/more-orders";
export const ORDER_CREATE = "/api/create-order";
export const ORDER_DETAIL_VIEW = "/api/order-view";
export const UPDATE_ORDER_SETTING = "api/order-setting";
export const UPDATE_ORDER_ = "/api/update-order";
export const DELETE_IMAGE = "/api/delete-image";

export const PASSWORD_RESET_MAIL_URL = "/user/password/reset";
export const PASSWORD_RESET_TOKEN_GET_USER_URL = "/user/password-reset-token";
export const USER_PASSWORD_UPDATE_URL = "/user/password";
export const MOVE_PRODUCT_IMAGES_URL = "/api/move-images";
export const USER_INVITATION_TOKEN_GET_USER_URL = "/api/invitation-token";
export const EMPLOYEE_UPDATE_URL = "/api/employee/update";