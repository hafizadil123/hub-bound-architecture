import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Utility from "../utility/utility";
import APP_STRING from "../constants/String";
import Header from "../components/header";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import { registerRequest } from "../redux/actions/registerAction";
import { loadingIcon } from "../assets";
import { loginRequest } from "../redux/actions/loginAction";
import { googleProvider, facebookProvider } from "../config/authMethods";
import socialMediaAuth from "../services/auth";
import { SplitButton, Dropdown } from "react-bootstrap";
import { updateBusinessIdRequest } from "../redux/actions/updateBusinessIdAction";
import { invitationTokenGetUserRequest } from "../redux/actions/invitationGetUserAction"
import { employeeUpdateRequest } from "../redux/actions/updateEmployeeAction";
import * as qs from 'query-string';

const BusinessAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const passwordViewRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const UserData = useSelector((state) => state.loginReducer.data);
  const [businessType, setBusinessType] = useState("");
  const [bussinessTypeText, setBussinessTypeText] = useState("");
  const [business_name, setBusinessName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('password');
  const [cpassword, setCpassword] = useState('password');
  const [socialId, setSocialId] = useState(null);
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [isTermsCondition, setIsTermsCondition] = useState(false);
  const [uid, setUid] = useState(null);

  const parsed = qs.parse(location.search);

  // if(parsed){
  //   setInvitation( Boolean(parsed.invite) );
  // }

  useEffect( () => {

    if(parsed.invite){
      dispatch( invitationTokenGetUserRequest({
        invite: 1, token: parsed.token, showSuccessToast: false
      }, function(resp){
        
        setFirstname(resp.firstname);
        setLastname(resp.lastname);
        setEmail(resp.email);
        setUid(resp.id);

      }) );
    }

  },[parsed]);
  
  async function signup(e) {
    e.preventDefault();
    if (validateLoginFields()) {
    
      setLoading(true);

      if(uid == null){
      
        //Normal user registration (without invitation)
        userRegistration();
      
      }else{

        //Update employee on invitation
        const payLoad = {
          uid: uid,
          invite: 1,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          login: false  
        }
        dispatch( employeeUpdateRequest(payLoad, onSuccess) );

      }
    
    }
  }


  //Normal user registration (without invitation)
  function userRegistration(){

    if(socialId == null){
      const payload = {
        business_name: business_name,
        firstname: firstname,
        lastname: lastname,
        email: email,
        business_type: businessType,
        password: password,
        cpassword: cpassword
      };
      // console.log("payload", payload);
      dispatch(registerRequest(payload, onSuccess, onError));  
    }else{

      const payload = {
        email: email,
        displayName: firstname + ' ' + lastname,
        social_id: socialId,
        firstname: firstname,
        lastname: lastname,
        business_type: businessType,
        business_name: business_name,
        password: password,
        cpassword: cpassword,
        login: false         
      };
      dispatch(loginRequest(payload, onSocialSuccess, onSocialError));

    }

  }

  async function onSuccess(response) {
    dispatch(updateBusinessIdRequest(response.business_id));
    setLoading(false);
    setTimeout(() => {
      history.push("/welcome");
    }, 2000);
  }

  async function onError(error) {
    setLoading(false);
  }
  const validateLoginFields = () => {
    var message = "";

    if (uid == null && Utility.isEmpty(business_name)) {
      message = APP_STRING.BUSINESS_NAME;
    } else if (Utility.isEmpty(firstname)) {
      message = APP_STRING.ENTER_FIRSTNAME;
    } else if (Utility.isEmpty(lastname)) {
      message = APP_STRING.ENTER_LASTNAME;
    } else if (Utility.isEmpty(email)) {
      message = APP_STRING.ENTER_EMAIL;
    } else if (!Utility.validateEmail(email)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    } else if (uid == null && Utility.isEmpty(businessType)) {
      message = APP_STRING.BUSINESS_TYPE;
    } else if (!isTermsCondition) {
      message = APP_STRING.TERMAND_POLICY;
    }

    if(socialId == null){

      if (Utility.isEmpty(password)) {
        message = APP_STRING.ENTER_PASSWORD;
      } else if (!Utility.passCheck(password)) {
        message = APP_STRING.ENTER_VALID_PASSWORD;
      } else if (Utility.isEmpty(cpassword)) {
        message = APP_STRING.ENTER_PASSWORD;
      } else if (cpassword != password) {
        message = APP_STRING.PASSWORD_MITCHMATCH;
      }

    }

    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };


  const validateSocialLoginFields = () => {
    var message = "";
    if (Utility.isEmpty(business_name)) {
      message = APP_STRING.BUSINESS_NAME;
    } else if (Utility.isEmpty(businessType)) {
      message = APP_STRING.BUSINESS_TYPE;
    } else if (!isTermsCondition) {
      message = APP_STRING.TERMAND_POLICY;
    }

    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };


  useEffect(() => {
    console.log("Register=>", JSON.stringify(UserData));
    Utility.isSignedIn(UserData).then((value) => {
      if (value) {
        history.push("/overall-performance");
      }
      if (location.state) {
        const { email, displayName } = location.state;
        setEmail(email);
        setFirstname(displayName);
      }
    });
  }, []);
  const handleBusinessSelect = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setBussinessTypeText(optionText);
    setBusinessType(id);
  };
  const passwordDetailView = () => (
    <Popup
      trigger={(open) => <p></p>}
      position="right center"
      closeOnDocumentClick
      ref={passwordViewRef}
    >
      {
        <div style={{ background: "#16538B", padding: 0 }}>
          <lable style={{ color: "white" }}>*Must be 8 characters</lable>
          <lable style={{ color: "white" }}>*1 Uppercase</lable>
          <lable style={{ color: "white" }}>*1 Lowercase</lable>
          <lable style={{ color: "white" }}>*1 Number</lable>
        </div>
      }
    </Popup>
  );
  const onTermConditionChange = (value) => {
    setIsTermsCondition(!isTermsCondition);
  };

  const handleOnGoogleLoginClick = async (e, provider) => {
    
    e.preventDefault();

    const result = await socialMediaAuth(provider);
    const { email, displayName, uid } = result;
    if (email && uid) {
      setShowPasswordField(false);
      const name = displayName ? displayName.split(' ') : null;
      const firstName = name ? name[0] : '';
      const lastName = name ? name[1] : '';
      setFirstname(firstName);
      setLastname(lastName);
      setEmail(email);
      setSocialId(uid);
      //dispatch(loginRequest(payload, onSocialSuccess, onSocialError));
      // history.push(`{
      //   pathname: "/business-account",
      //   state: { email: email, displayName: displayName, social_id: uid },
      // });
    } else {

      if(!email)
        Utility.showToast("error", "You need to allow email permission");
      else if(!uid)
        Utility.showToast("error", "We are unable to fetch the social id from you account. Please check and allow in account setting");

    }

  };

  async function onSocialSuccess(response) {
    dispatch(updateBusinessIdRequest(response.business_id));
    setLoading(false);
    history.push("/welcome");
  }
  async function onSocialError() {
    setLoading(false);
  }

  const handleOnFacebookLoginClick = async (e, provider) => {
    
    e.preventDefault();
    
    const result = await socialMediaAuth(provider);
    const { email, displayName, uid } = result;
    const name = displayName ? displayName.split(' ') : null;
    const firstName = name ? name[0] : '';
    const lastName = name ? name[1] : '';      
    if (email && uid) {
      setShowPasswordField(false);
      setFirstname(firstName);
      setLastname(lastName);
      setEmail(email);
      setSocialId(uid);
        // var payload = {
        //   email: email,
        //   displayName: displayName,
        //   social_id: uid,
        //   firstname: firstName,
        //   lastname: lastName,
        //   business_type: businessType,
        //   business_name: business_name          
        // };
        // dispatch(loginRequest(payload, onSocialSuccess, onSocialError));
    } else {

      if(!email)
        Utility.showToast("error", "You need to allow email permission");
      else if(!uid)
        Utility.showToast("error", "We are unable to fetch the social id from you account. Please check and allow in account setting");

    }
  

  };

  return (
    <>
      <Header highlightedItem={"login"} />

      <form id="business_account_register">
        <div className="container">
          <div className="w-40 m-auto mobile-facebook">
            <button
              onClick={(e) => handleOnGoogleLoginClick(e, googleProvider)}
              type="text"
              className="login-google-button"
            >
              Register with Google
            </button>
            <button
              onClick={(e) => handleOnFacebookLoginClick(e, facebookProvider)}
              type="text"
              className="login-facebook-button top-facebook"
            >
              Register with Facebook
            </button>
          </div>
          <div className="mt-5 margin-auto">
            <h6 className="w-755">
              Add your information to create your business account.
            </h6>

            {
              uid == null ? 
              <div className="form-group mt-5  w-755">
                <label>Business Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="business_name"
                  value={business_name}
                  onChange={(business_name) =>
                    setBusinessName(business_name.target.value)
                  }
                />
              </div> 
              : 
              <></>
            }
            
            <div className="form-group mt-5  w-755">
              <label>Representative First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstname}
                onChange={(firstname) => setFirstname(firstname.target.value)}
              />
            </div>
            <div className="form-group mt-4  w-755">
              <label>Representative Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                onChange={(lastname) => setLastname(lastname.target.value)}
              />
            </div>
            <div className="form-group w-755">
              <label className="mt-4">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            
            {showPasswordField ? <>
            <div className="form-group w-755">
              <label className="mt-4">Password</label>
              <input
                type="password"
                className="form-control"
                id="psd"
                // onMouseOut={() => passwordViewRef.current.close()}
                //onMouseOver={() => passwordViewRef.current.open()}
                onFocus={() => passwordViewRef.current.open()}
                onBlur={() => passwordViewRef.current.close()}
                onChange={(password) => setPassword(password.target.value)}
              />
              {passwordDetailView()}
            </div>
            <div className="form-group w-755">
              <label className="mt-4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpsd"
                onChange={(cpassword) => setCpassword(cpassword.target.value)}
              />
            </div>
            </>
            : <></>
            }

            {
              uid == null ? 
              <div className="mt-4 w-755 business_select_list">
                <label>Business Type</label>
                {["Secondary"].map((variant) => (
                  <SplitButton
                    key={variant}
                    id={`dropdown-split-variants-${variant}`}
                    variant={variant.toLowerCase()}
                    title={bussinessTypeText}
                    onSelect={(obj, id) => handleBusinessSelect(obj, id)}
                  >
                    <Dropdown.Item eventKey="1" active={businessType == "1"}>
                      Convenience store
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" active={businessType == "2"}>
                      Grocery store
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3" active={businessType == "3"}>
                      Mobile street vendor
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="4" active={businessType == "4"}>
                      Virtual grocer
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="5" active={businessType == "5"}>
                      Liquor Store
                    </Dropdown.Item>
                  </SplitButton>
                ))}
              </div>              
              : 
              <></>
            }
          </div>
          <div className="border-top mt-6">
            <div className="custom-control custom-checkbox mt-5 w-55 term-policy">
              <input
                className="custom-control-input"
                type="checkbox"
                value={isTermsCondition}
                id="isTermsCondition"
                onChange={(value) => onTermConditionChange(value)}
              />
              <label htmlFor="isTermsCondition" className="form-check-label h-w custom-control-label">
                I understand and agree to Produce Locator's&nbsp;
                <span className="text-sucesscl">
                  <b>
                    <Link to="terms" target="_blank" className="text-success">
                      Vendor Terms of Use
                    </Link>
                  </b>
                </span>
              </label>
            </div>
            <div className="text-right mt-5 mb-5 w-501">
              <button
                disabled={isLoading}
                type="button"
                className="btn btn-success clr width"
                onClick={(e) => [signup(e)]}
              >
                {isLoading ? (
                  <div className="text-center">
                    <img src={loadingIcon} alt="loading..." />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BusinessAccount;
