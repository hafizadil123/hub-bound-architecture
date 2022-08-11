import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import Modal from "react-bootstrap/Modal";
import {
  sidebarBanner,
  Signuparrowbutton,
  loadingIcon,
  loadingIcon2,
  Deleteicon,
} from "../assets";
import Utility from "../utility/utility";
import APP_STRING from "../constants/String";
import { loginRequest } from "../redux/actions/loginAction";
import { passwordResetRequest } from "../redux/actions/passwordResetAction";
import { googleProvider, facebookProvider } from "../config/authMethods";
import socialMediaAuth from "../services/auth";
import { updateBusinessIdRequest } from "../redux/actions/updateBusinessIdAction";

const ROLE_USER = 2;

const Login = () => {
  const dispatch = useDispatch();
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [show, setShow] = useState(false);
  const [fildtype, setFildtype] = useState("password");
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [passToogle, setPassToogle] = useState("fa fa-eye-slash p-1");

  async function loggingIn(e) {
    e.preventDefault();

    if (validateLoginFields()) {
      setLoading(true);
      var payload = {
        email: email,
        password: password,
        social_id: ""
      };
      dispatch(loginRequest(payload, onSuccess, onError));
    }
  }

  async function onSuccess(response) {  
    const businessId = response.business[0].id;
    dispatch(updateBusinessIdRequest(businessId));
    setLoading(false);
    const redirectionUrl = getRedirectUrl(response, businessId);
    setTimeout(() => {
      history.push(redirectionUrl);
    }, 2000);
  }

  const getRedirectUrl = (response, business_id) => {
    
    const userPermissions = response.permissions != null ? response.permissions : [];
    const userBusinessPermissions = userPermissions.find( v => v.business_id ==  business_id);
    return (response.role == ROLE_USER ||  (userBusinessPermissions != undefined && userBusinessPermissions.order_management == 1) ) ? '/orders' : '/account-information';

  }

  async function onError() {
    //history.push("/overall-performance");
    setLoading(false);
  }

  const validateLoginFields = () => {
    var message = "";
    if (Utility.isEmpty(email)) {
      message = APP_STRING.ENTER_EMAIL;
    } else if (!Utility.validateEmail(email)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    } else if (Utility.isEmpty(password)) {
      message = APP_STRING.ENTER_PASSWORD;
    } else if (password.length < 6) {
      message = APP_STRING.ENTER_SIX_DIGIT_PASSWORD;
    }
    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };
  const validateResetPasswordFields = () => {
    var message = "";
    if (Utility.isEmpty(resetEmail)) {
      message = APP_STRING.ENTER_EMAIL;
    } else if (!Utility.validateEmail(resetEmail)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    }
    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };
  const PassViewToggle = () => {
    if (fildtype === "password") {
      setPassToogle("fa fa-eye p-1");
      setFildtype("text");
    } else {
      setPassToogle("fa fa-eye-slash p-1");
      setFildtype("password");
    }
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (value) {
        const businessId = UserData.business[0].id;
        const redirectionUrl = getRedirectUrl(UserData, businessId);
        history.push(redirectionUrl);
      }
    });
  }, []);

  const handleOnGoogleLoginClick = async (provider) => {
    const result = await socialMediaAuth(provider);
    const { email, displayName, uid } = result;
    if (email) {
      var payload = {
        email: email, 
        displayName: displayName, 
        social_id: uid,
        login: true
      };
      dispatch(loginRequest(payload, onSocialSuccess, onSocialError));
      // history.push({
      //   pathname: "/business-account",
      //   state: { email: email, displayName: displayName, social_id: uid },
      // });
    } else {
      Utility.showToast("error", "You need to allow email permission");
    }
  };

  async function onSocialSuccess(response) { 
    dispatch(updateBusinessIdRequest(response.business[0].id));
    setTimeout(() => {
      setLoading(false);
      history.push("/orders");
    }, 2000);
  }
  async function onSocialError() {
    setLoading(false);
  }

  const handleOnFacebookLoginClick = async (provider) => {
    const result = await socialMediaAuth(provider);
    const { email, displayName, uid } = result;
    if (email) {
      var payload = {
        email: email, 
        displayName: displayName, 
        social_id: uid,
        login: true
      };
      dispatch(loginRequest(payload, onSocialSuccess, onSocialError));
    } else {
      Utility.showToast("error", "You need to allow email permission");
    }
  };
  const onResetPasswordClick = () => {
    setLoading2(true);
    if (validateResetPasswordFields()) {
      sendPasswordResetRequest(resetEmail);
      //handleClose();
    }
  };


  const sendPasswordResetRequest = email => {

    dispatch(passwordResetRequest({
      email: email
    }, function(resp){

      setLoading2(false);
      handleClose();
      console.log("response", resp);

    }, function(err){

      setLoading2(false);
      console.log("error:", err);
      if(err.status != 200 || err.data.status_code != 200){
        Utility.showToast("error", err.data.message);
      }

    }
    ));

  }

  const handleEnterKeypress = (event) => {
    //it triggers by pressing the enter key
    var code = event.keyCode || event.which;
    if (code === 13) {
      loggingIn(event);
    }
  };
  const forgotPasswordModalView = () => (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Modal.Body>
        <img src={Deleteicon} onClick={handleClose} className="modal_closer" />
        <div id="cover-caption">
          <h4 className="text-center text-success mt-51 mb-3">
            Forgot Password?
          </h4>
          <p className="margin-auto w-75 mt-55 text-dark">
            Please enter your email address to receive instructions to reset
            your password. If an account exists with that email, we will send a
            password reset.
          </p>
          <div className="form-group w-75 mobile-re">
            <label className="mt-5g">Email</label>
            <input
              type="email"
              className="form-control h-10"
              id="usr h-10"
              onChange={(mail) => setResetEmail(mail.target.value)}
              placeholder="name@domain.com"
            />
            <div className="text-center mt-5c mb-5">
              <button
                onClick={onResetPasswordClick}
                type="button"
                className="btn btn-success clr w-60"
              >

                {isLoading2 ? (
                  <div className="text-center">
                    <img src={loadingIcon2} alt="loading..." />
                  </div>
                ) : 
                 "Reset Password"
                }
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <Header highlightedItem={"login"} />
      <div className="container">
        <div className="row mt-6">
          <div className="col-md-6 mb-5 mt-4 mobile_none">
            <img src={sidebarBanner} className="img-fluid swt" alt="..." />
          </div>
          <div className="col-md-6">
            <h6 className="text-dark w-75">Welcome Back</h6>
            <form id="login">
              <div className="form-group mt-7 w-75">
                <label htmlFor="usr" className="mt-5">
                  Email or Username
                </label>
                <input
                  value={email}
                  type="text"
                  className="form-control"
                  id="usr height"
                  onChange={(email) => setEmail(email.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group m-8 w-75">
                <label>Password</label>
                <div className="input-group" id="show_hide_password">
                  <input
                    className="form-control br"
                    type={fildtype}
                    value={password}
                    onChange={(password) => setPassword(password.target.value)}
                    placeholder="******"
                    onKeyPress={(e) => handleEnterKeypress(e)}
                    autoComplete="on"
                  />
                  <div
                    className="input-group-border"
                    onClick={() => [PassViewToggle()]}
                  >
                    <i className={passToogle} aria-hidden="true"></i>
                  </div>
                </div>
                <p
                  onClick={() => setShow(true)}
                  className="text-right text-success bold mt-2"
                >
                  {/* <Link to="/forgot-password" className="text-success">
                    Forgot Password?
                  </Link> */}
                  Forgot Password?
                </p>
              </div>
              <div className="row mt-9 w-76">
                <div className="col-md-8 mobile-z">
                  <h6>Sign in</h6>
                </div>
                <div className="col-md-4 mobile-z">
                  <button
                    disabled={isLoading}
                    onClick={(e) => [loggingIn(e)]}
                    type="button"
                    className="btn float-right mobile-top"
                  >
                    {isLoading ? (
                      <div className="text-center">
                        <img src={loadingIcon} alt="loading..." />
                      </div>
                    ) : (
                      <img
                        src={Signuparrowbutton}
                        className="img-fluid ml-2"
                        alt="..."
                      />
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4 w-76">
              <div className="btn-wrapper">
                <button
                  onClick={() => handleOnGoogleLoginClick(googleProvider)}
                  type="button"
                  className="btn render btn-success w-100 clr font-family"
                >
                  Login with Google
                </button>
              </div>
              <div className="btn-wrapper">
                <button
                  onClick={() => handleOnFacebookLoginClick(facebookProvider)}
                  type="button"
                  className="btn render btn-success w-100 mt-4 clr font-family"
                >
                  Login with Facebook
                </button>
              </div>
              <div className="col-md-12 mt-4 bold text-center">
                <p>
                  Don't have an account? &nbsp;
                  <span className="text-success">
                    <Link to="/business-account" className="text-success">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORGOT PASSWORD MODAL @DEVELOPER_WILL */}
        {forgotPasswordModalView()}
      </div>
    </>
  );
};

export default Login;
