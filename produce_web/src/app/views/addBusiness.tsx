import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
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
import { addVsEditBusinessRequest } from "../redux/actions/addBusinessAction";
import { actionSuccess } from "../redux/actions/loginAction";

const AddBusiness = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data || {}
  );
  const id = UserData.id == undefined ? null: UserData.id;
  const firstName = UserData.firstname == undefined ? '': UserData.firstname;
  const lastName = UserData.lastname == undefined ? '': UserData.lastname;
  const eMail = UserData.email == undefined ? '': UserData.email;

  const bussinessTypeArry = [
    { key: "1", value: "Convenience store" },
    { key: "2", value: "Grocery store" },
    { key: "3", value: "Mobile street vendor" },
    { key: "4", value: "Virtual grocer" },
    { key: "5", value: "Liquor Store" },
  ];

  const location = useLocation();
  const [business_name, setBusinessName] = useState("");
  const [firstname, setFirstname] = useState(firstName);
  const [lastname, setLastname] = useState(lastName);
  const [email, setEmail] = useState(eMail);
  const [businessType, setBusinessType] = useState("");
  const [bussinessTypeText, setBussinessTypeText] = useState("");
  const [password, setPassword] = useState("");
  const [bId, setBId] = useState("");
  const [socialId, setSocialId] = useState(null);

  const businessData = useSelector((state) => state.loginReducer.data) || [];
  const prevBusinessData = useSelector((state) => state.loginReducer) || {};

  useEffect( () => {

    if(UserData && UserData.social_id != undefined){
      setSocialId(UserData.social_id);
    }

  },[] );

  const LogoutClick = () => {
    dispatch(logout());
    dispatch(clearDashboard());
    history.push("/");
  };

  const handleBusinessSelect = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setBussinessTypeText(optionText);
    setBusinessType(id);
  };

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
    });
  }, []);

  async function addBusiness(e) {
    if (validateFields()) {
      let payload = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        business_type: businessType,
        business_name: business_name,
        employee_id: ""+id
      };
      if(socialId == null)
        payload.password = password;
      else
        payload.password = "password";
      console.log("payload", payload);
      dispatch(addVsEditBusinessRequest(payload, onSaveOrEditBusinessSuccess));
    }
  }

  const onSaveOrEditBusinessSuccess = async (result) => {
    const insertedObj = result.inserted_details;
    prevBusinessData.data.business.push(insertedObj);
    dispatch(actionSuccess(prevBusinessData.data));
    // setTimeout(function(){
    //   console.log("onSaveOrEditBusinessSuccess.business data", businessData);
    // }, 3000);
    history.push("/location");
  };

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

    if(socialId == null){
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

  //   const getCategoryName = (nameKey, myArray) => {
  //     for (var i = 0; i < myArray.length; i++) {
  //       if (myArray[i].key == nameKey) {
  //         return myArray[i].value;
  //       }
  //     }
  //   };

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
              <div className="w-75 text-right margin-auto">
                {/* <p className="text-primarwy mt-3 font-family">
                  {`Business ID:` + bId}
                </p> */}
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
                  <div className="col-md-6">
                    <label>Business Type</label>
                    {["Secondary"].map((variant) => (
                      <SplitButton
                        key={variant}
                        id={`dropdown-split-variants-${variant}`}
                        variant={variant.toLowerCase()}
                        title={bussinessTypeText}
                        onSelect={(obj, id) => handleBusinessSelect(obj, id)}
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
                        onChange={(value) => setEmail(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">

                    {socialId == null ? 
                    <div className="form-group margin-au">
                      <label className="mt-3">
                        Password
                        <img
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
                      <div className="hover-block d-none">
                        <div className="arrowssE w-755"></div>
                        <div className="boxbsS">
                          <p className="text-white fnt-sze">
                            To change password,
                            <br />
                            logout and select
                            <br />
                            "forgot password"
                          </p>
                        </div>
                      </div>
                    </div>
                    : <></>
                    }

                  </div>
                </div>
                <div className=" margin-auto mt-3 text-primary">
                  <p className="blues font-family">
                    <Link to="#" onClick={() => LogoutClick()}>
                      Logout
                    </Link>
                  </p>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <p className="mt-3 text-dark">
                      {/* <Link to="#" onClick={() => LocationDeleteClick()}>
                        Delete Location
                      </Link> */}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="text-right margin-auto mb-4">
                      <button
                        type="button"
                        className="btn render color-66s"
                        onClick={(e) => addBusiness(e)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBusiness;
