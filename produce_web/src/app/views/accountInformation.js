import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import { Infoicon } from "../assets";
import APP_STRING from "../constants/String";
import { SplitButton, Dropdown } from "react-bootstrap";
import { accountInfoRequest } from "../redux/actions/accountInformationAction";
import { logout } from "../redux/actions/loginAction";
import { clearDashboard } from "../redux/actions/dashboardAction";
import { UPDATE_ACCOUNT_INFO_URL } from "../services/ApiUrls";
import { useRest, CALL_TYPES } from "../services/rest/api";
import { deleteLocationRequest } from "../redux/actions/locationAction";
import { updateBusinessRequest } from "../redux/actions/updateAccountInformationAction";
import { loginRequest } from "../redux/actions/loginAction";
import { loadingIcon, Deletebusinessicon } from "../assets";
import AsyncStorage from "@react-native-community/async-storage";
import { deleteBusinessRequest } from "../redux/actions/deleteBusinessAction";
import { deleteUserRequest } from "../redux/actions/deleteUserAction";
import { actionSuccess } from "../redux/actions/loginAction";
import SweetAlert from "react-bootstrap-sweetalert";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AccountInformation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const popUpRefOne = useRef();
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data || {}
  );
  const firstName = UserData.firstname == undefined ? '': UserData.firstname;
  const lastName = UserData.lastname == undefined ? '': UserData.lastname;  
  const eMail = UserData.email == undefined ? '': UserData.email;

  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data || 1
  );
  const { id = {} } = UserData;
  const businessData =
    useSelector((state: RootStateOrAny) => state.loginReducer.data) || [];

  const bussinessTypeArry = [
    { key: "1", value: "Convenience store" },
    { key: "2", value: "Grocery store" },
    { key: "3", value: "Mobile street vendor" },
    { key: "4", value: "Virtual grocer" },
    { key: "5", value: "Liquor Store" },
  ];

  const [business_name, setBusinessName] = useState("");
  const [firstname, setFirstname] = useState(firstName);
  const [lastname, setLastname] = useState(lastName);
  const [email, setEmail] = useState(eMail);
  const [businessType, setBusinessType] = useState("");
  const [bussinessTypeText, setBussinessTypeText] = useState("");
  const [password, setPassword] = useState("");
  const [bId, setBId] = useState("");
  const [isVisibel, setVisibel] = useState(false);
  const [deleteBusinessName, setDeleteBusinessName] = useState("");
  const [business_text, setBusinessText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [socialId, setSocialId] = useState(null);

  useEffect(() => {
    if (UserData && UserData.social_id != undefined) {
      setSocialId(UserData.social_id);
    }
  });

  const LogoutClick = () => {
    dispatch(logout());
    dispatch(clearDashboard());
    history.push("/");
  };

  const popupOne = () => (
    <Popup
      trigger={(open) => <p></p>}
      position="right"
      closeOnDocumentClick
      ref={popUpRefOne}
      className="accountinfo-pass"
    >
      {
        <div style={{ background: "#16538B", padding: 0 }}>
          <lable style={{ color: "white" }}>
            To change password,
            <br />
            logout and select
            <br />
            "forgot password"
          </lable>
        </div>
      }
    </Popup>
  );

  const LocationDeleteClick = () => {
    let payload = {
      employee_id: id,
      business_id: JSON.stringify(parseInt(businessId)),
      location: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      latitude: "",
      longitude: "",
    };
    // console.log("LocationDeleteClick.payload", JSON.stringify(payload));
    dispatch(deleteLocationRequest(payload));
  };

  const handleBusinessSelect = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setBussinessTypeText(optionText);
    setBusinessType(id);
  };
  // getCategoryName(bussinessType, bussinessTypeArry);

  useEffect(() => {
    // console.log("AccountInformation=>", JSON.stringify(UserData));
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      } else {
        getDataFromStorage();

        var payload = {
          business_id: JSON.stringify(businessId),
          showSuccessToast: false,
        };

        console.log(
          "accountInformation.payload.business_id",
          JSON.stringify(payload.business_id)
        );
        //alert(BusinessId);
        dispatch(accountInfoRequest(payload, onAccountInfo));
      }
    });
    setLoading(true);
  }, []);

  const getDataFromStorage = async () => {
    let BusinessName = await AsyncStorage.getItem("BusinessName");
    if (BusinessName) {
      setBusinessText(BusinessName);
      setDeleteBusinessName(BusinessName);
    } else {
      setBusinessText(
        businessData.business
          ? businessData.business[0].name
          : "Choose Business"
      );
      setDeleteBusinessName(
        businessData.business
          ? businessData.business[0].name
          : "Choose Business"
      );
    }
  };

  const setBusinessNameLocalStorage = async (optionText) => {
    await AsyncStorage.setItem("BusinessName", optionText).then(() => {});
  };

  async function onAccountInfo(info) {
    setBusinessName(info.name);
    setBusinessType(info.type);
    setBId(info.id);
    setBussinessTypeText(getCategoryName(info.type, bussinessTypeArry));
    setLoading(false);
  }

  const validateFields = () => {
    var message = "";
    if (Utility.isEmpty(business_name)) {
      message = APP_STRING.BUSINESS_NAME;
    } else if (Utility.isEmpty(businessType)) {
      message = APP_STRING.BUSINESS_TYPE;
    } else if (Utility.isEmpty(firstname)) {
      message = APP_STRING.ENTER_FIRSTNAME;
    } else if (Utility.isEmpty(lastname)) {
      message = APP_STRING.ENTER_LASTNAME;
    } else if (Utility.isEmpty(email)) {
      message = APP_STRING.ENTER_EMAIL;
    } else if (!Utility.validateEmail(email)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    }

    if (socialId == null) {
      if (Utility.isEmpty(password)) {
        message = APP_STRING.ENTER_PASSWORD;
      }
    }

    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };

  const getCategoryName = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].key == nameKey) {
        return myArray[i].value;
      }
    }
  };

  async function updateBusiness(e) {
    if (validateFields()) {
      setLoading(true);
      let payload = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        business_type: businessType,
        business_name: business_name,
        employee_id: id,
        business_id: JSON.stringify(parseInt(businessId)),
        showSuccessToast: true
      };

      if (socialId == null) payload.password = password;
      else payload.password = "password";

      // console.log("payload.business_id", JSON.stringify(payload.business_id));
      dispatch(updateBusinessRequest(payload, function(){
        businessData.firstname = firstname;
        businessData.lastname = lastname;
        businessData.email = email;
        dispatch(actionSuccess(businessData));    
        setLoading(false);
        history.push("/account-information");
      },
      function(err){
        setLoading(false);
      }));
    }
  }


  const DeleteBusiness = () => {

    const countBusiness = businessData.business.length;
    setVisibel(false);
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      employee_id: JSON.stringify(id)
    };
    dispatch(deleteBusinessRequest(payload, onDeleteBusinessSuccess));
  };
  const onDeleteBusinessSuccess = async (response) => {

    //If there is only one single business, then delete the user account
    //and logout
    if(businessData.business.length == 1){
      
      const uid = JSON.stringify(parseInt(id));
      dispatch(deleteUserRequest({id: uid}, function(){
        LogoutClick();
      }));

    }else{

      //Delete business from reducer
      const updatedBusinessData = businessData.business.filter((option) => {
        return option.id != businessId;
      });
      businessData.business = updatedBusinessData;
      dispatch(actionSuccess(businessData));

      setBusinessText(
        businessData.business
          ? businessData.business[0].location
            ? businessData.business[0].location
            : businessData.business[0].name
          : "Choose Business"
      );
      setBusinessNameLocalStorage(
        businessData.business
          ? businessData.business[0].location
            ? businessData.business[0].location
            : businessData.business[0].name
          : "Choose Business"
      );

    }

  };

  return (
    <>
      <Header highlightedItem={"account_information"} />
      <div className="mobile account_information content">
        <div className="container mobile-no-padding">
          <h4 className="text-success mt-5 w-61 auto font-family">
            Account information
          </h4>

          <div className="card mb-10 W-61 MR-A mt-4 mb-4">
            <div className="container">
              {isLoading ? (
                <div className="text-center">
                  <img src={loadingIcon} alt="loading..." />
                </div>
              ) : (
                <>
                  <div className="w-75 text-right margin-auto">
                    <p className="text-primarwy mt-3 font-family text-right">
                      {`Business ID:` + bId}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group margin-au">
                          <label>Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={business_name}
                            onChange={(business_name) =>
                              setBusinessName(business_name.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6 split-dropdown-right">
                        <label>Business Type</label>
                        {["Secondary"].map((variant) => (
                          <SplitButton
                            key={variant}
                            id={`dropdown-split-variants-${variant}`}
                            variant={variant.toLowerCase()}
                            title={bussinessTypeText}
                            onSelect={(obj, id) =>
                              handleBusinessSelect(obj, id)
                            }
                          >
                            <Dropdown.Item
                              eventKey="1"
                              active={businessType == "1"}
                            >
                              Convenience store
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="2"
                              active={businessType == "2"}
                            >
                              Grocery store
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              active={businessType == "3"}
                            >
                              Mobile street vendor
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="4"
                              active={businessType == "4"}
                            >
                              Virtual grocer
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="5"
                              active={businessType == "5"}
                            >
                              Liquor Store
                            </Dropdown.Item>
                          </SplitButton>
                        ))}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group margin-au">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={firstname}
                            onChange={(firstname) =>
                              setFirstname(firstname.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group margin-au">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={lastname}
                            onChange={(lastname) =>
                              setLastname(lastname.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group margin-au">
                          <label className="mt-3">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            // readOnly
                            onChange={(email) => setEmail(email.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {socialId == null ? (
                          <div className="form-group margin-au">
                            <label className="mt-3">
                              Password
                              <img
                                onMouseOver={() => popUpRefOne.current.open()}
                                // onMouseOut={() => popUpRefOne.current.close()}
                                src={Infoicon}
                                className="img-fluid mt-01"
                                alt="..."
                              />
                            </label>
                            <input
                              type="password"
                              className="form-control HOVERS"
                              value={password}
                              onChange={(password) =>
                                setPassword(password.target.value)
                              }
                            />
                            {popupOne()}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="row margin-auto mt-3 text-primary">
                      <p className="logout-wrapper blues font-family col-md-6 col-12">
                        <Link to="#" onClick={() => LogoutClick()}>
                          Logout
                        </Link>
                      </p>
                      { <p className="delete-business-wrapper blues font-family col-md-6 col-12">
                        <Link to="#" onClick={() => [setVisibel(true)]}>
                          <span className="w-28 float-left">
                            <img
                              src={Deletebusinessicon}
                              className="img-fluid"
                              alt="..."
                            />
                          </span>
                          <span className="ml-2">Delete Business</span>
                        </Link>
                      </p> }
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        {/* <p className="mt-3 text-dark">
                          <Link to="#" onClick={() => LocationDeleteClick()}>
                            Delete Location
                          </Link>
                        </p> */}
                      </div>
                      <div className="col-md-6">
                        <div className="text-right margin-auto mb-4">
                          <button
                            type="submit"
                            //href="#"
                            disabled={isLoading}
                            //type="button"
                            className="btn render color-66s"
                            onClick={(e) => updateBusiness(e)}
                          >
                            {isLoading ? (
                              <div className="text-center">
                                <img src={loadingIcon} alt="loading..." />
                              </div>
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      { isVisibel ? (
        <SweetAlert
          title=""
          confirmBtnText="Delete Business"
          confirmBtnBsStyle="success"
          onConfirm={DeleteBusiness}
          onCancel={() => setVisibel(false)}
        >
          <h6>Are you sure you want to delete this business?</h6>
          <p className={"alert-danger" + (businessData.business.length == 1 ? '' : ' display-none')}>If you delete, then your account will also be deleted.</p>
          
          <p style={{ color: "#F0924E", marginTop: "2rem" }}>
            {deleteBusinessName}
          </p>
        </SweetAlert>
      ) : (
        ""
      )}
    </>
  );
};

export default AccountInformation;
