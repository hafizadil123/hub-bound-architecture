import React, { useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import Utility from "../utility/utility";
import Header from "../components/header";
import { useHistory, Link } from "react-router-dom";
import { welcome } from "../assets";

const VerificationUser = () => {

  const history = useHistory();
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (value) {
        history.push("/account-information");
      }
    });
  }, []);

  return (
    <>
      <Header highlightedItem={""} />
      <div className="container welcome">
        <div className="col-md-12 w-35 img text-center">
          <img src={welcome} className="img-fluid p-l-h" alt="..." />
        </div>
        <div className="mt-4 w-40 m-auto">
          <h6 className="text-success mt font-weight font-family">
            Welcome to Produce Locator!
          </h6>
        </div>
        <div className="mt-4 text-center font-weight">
          <h6 className="font-weight font-family mt-5">
            Your account has been verified successfully.
          </h6>
        </div>
        <div className="mt-4 col-md-12  welcome-login w-login-welcome m-auto mt-4">
          <Link to="/login" className="blue mt-5">
            Login
          </Link>
        </div>
      </div>
    </>
  );
  
};

export default VerificationUser;
