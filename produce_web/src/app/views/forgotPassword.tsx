import React, { useState, useEffect } from "react";
import Utility from "../utility/utility";
import APP_STRING from "../constants/String";
import { userPasswordUpdateRequest } from "../redux/actions/userPasswordUpdateAction";
import { passwordResetGetUserRequest } from "../redux/actions/passwordResetTokenGetUserAction";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [uid, setUid] = useState(null);

  async function Updatepassword(e) {
    e.preventDefault();

    if (validateLoginFields()) {
      setLoading(true);
      // var payload = {
      //   password: password,
      //   cpassword: cpassword,
      // };
      dispatch(userPasswordUpdateRequest({password: password, uid: uid}, function(resp){
        console.log(resp);
        history.push('/login');
      }, onError));
  
    }
  }

  const validateLoginFields = () => {
    
    let message = "";
    
    if (Utility.isEmpty(password)) {
      message = APP_STRING.ENTER_PASSWORD;
    } 
    else if (password.length < 6) {
      message = APP_STRING.ENTER_SIX_DIGIT_PASSWORD;
    }
    else if(password != cpassword){
      message = "Password and Confirm Password don't match";
    }
    
    if (message === "") {
      return true;
    }
    
    Utility.showToast("error", message);  
    return false;
  
  };

  useEffect( () => {

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if(token == null){

      Utility.showToast("error", "Token Required");

    }else{

      dispatch(passwordResetGetUserRequest({token: token, showSuccessToast: false}, function(resp){
        setUid(resp.uid);
      }, onError));

    }

  },[] );

  function onError(resp){

    if(resp.status != 200 || resp.data.status != 200)
      Utility.showToast("error", resp.data.message);

    console.log("Api Error", resp);

  }

  return (
    <>
      <div className="fullbackground">
        <div className="container">
          <section id="cover" className="min-vh-100">
            <div id="cover-caption">
              <div className=" card rows">
                <h4 className="text-center text-success mt-51">
                  Set New Password
                </h4>
                <div className="form-group w-75 mobile-re">
                  <label className="mt-5g">New password</label>
                  <input
                    type="password"
                    className="form-control h-10"
                    id="usr h-10"
                    placeholder="******"
                    onChange={(password) => setPassword(password.target.value)}
                  />
                </div>
                <div className="form-group w-75 mobile-re">
                  <label className="mt-5g">Confirm New password</label>
                  <input
                    type="password"
                    className="form-control h-10"
                    id="usr h-10"
                    placeholder="******"
                    onChange={(cpassword) => setCPassword(cpassword.target.value)}
                  />
                  <div className="text-center mt-5c mb-5">
                    <button 
                    onClick={(e) => [Updatepassword(e)]}
                    type="button" className="btn btn-success clr w-60">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
