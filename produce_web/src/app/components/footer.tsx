import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/loginAction";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, RootStateOrAny } from "react-redux";
import {
  Logo,
  location_pin,
  Notificationbellicon,
  Accounticon,
  Overallperformanceicon,
  Businesshrsicon,
  Returnsicon,
  Employeesicon,
  Billingicon,
  Notificationsicon,
  Deletebusinessicon,
  logoutIcon,
  inventory,
  location,
  Ordericon,
} from "../assets";
import Dialog from "../components/dialog";

const Footer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState("active");
  const [isVisibel, setVisibel] = useState(false);

  const LogoutClick = () => {
    dispatch(logout());
    history.push("/");
  };

  const sidebarOpen = () => {
    setToggle("hide");
  };

  const sidebarClose = () => {
    setToggle("active");
  };

  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );

  const onEmailClick = () => {
    window.location.href = "mailto:info@hubbound.com";
  };

  const { highlightedItem } = props;
  return (
    <>
      <div className="bg-bluey footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-4">
              <div className="mri-le">
                <h2 className="text-white  mt-5">Welcome</h2>
                <Link to="#">
                  <p
                    onClick={() => history.push("/business-account")}
                    className="text-lights mt-4"
                  >
                    Register businesses
                  </p>
                </Link>
                <Link onClick={() => onEmailClick()} to="#">
                  <p className="text-whites">integrate with us</p>
                </Link>
                <Link onClick={() => onEmailClick()} to="#">
                  <p className="text-whites">Partner with us</p>
                </Link>
                <Link to="/terms">
                  <p className="text-whites">Terms of Use</p>
                </Link>
                <Link to="/policy">
                  <p className="text-whites">Privacy Policy</p>
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-3">
              <div className="mri-le">
                <h2 className="text-white  mt-5">About Us</h2>
                <Link to="#">
                  <p className="text-whites mt-4">On a mission to</p>
                </Link>
                <Link to="#">
                  <p className="text-whites">improve retailers'</p>
                </Link>
                <Link to="#">
                  <p className="text-whites">efficiency,</p>
                </Link>
                <Link to="#">
                  <p className="text-whites">awareness,</p>
                </Link>
                <Link to="#">
                  <p className="text-whites">accessibility, & sales</p>
                </Link>
              </div>
            </div>
            <div className="col-md-4 text-center col-5">
              <h2 className="text-white  mt-5">Get in Touch</h2>
              <Link onClick={() => onEmailClick()} to="#">
                <p className="text-whites mt-4">info@hubbound.com</p>
              </Link>
              <script src="info@hubbound.com"></script>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
