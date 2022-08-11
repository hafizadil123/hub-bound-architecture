import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { SplitButton, Dropdown } from "react-bootstrap";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import {
  HB_logo,
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
  book,
  integration,
  setting,
  emptycircle,
} from "../assets";
import Dialog from "./dialog";
import AsyncStorage from "@react-native-community/async-storage";
import { deleteBusinessRequest } from "../redux/actions/deleteBusinessAction";
import { updateBusinessIdRequest } from "../redux/actions/updateBusinessIdAction";
import Utils from "../utility/utility";

const ROLE_USER = 2;

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("active");
  const [businessType, setBusinessType] = useState("");
  const [isVisibel, setVisibel] = useState(false);
  const [deleteBusinessName, setDeleteBusinessName] =
    useState("test bussiness");
  const UserData = useSelector((state) => state.loginReducer.data);

  const businessId = useSelector(
    (state) => state.updateBusinessIdReducer.data || 1
  );

  const userPermissions = UserData && UserData.permissions != null ? UserData.permissions : [];
  const userRole = UserData ? UserData.role : ROLE_USER;
  const userBusinessPermissions = userPermissions.find( v => v.business_id ==  businessId);

  const businessData = useSelector((state) => state.loginReducer.data) || [];
  const pendingOrders = useSelector((state) => state.orderReducer.data.pending_orders) || [];
  const ordersPending = pendingOrders.length > 0;

  const [business_text, setBusinessText] = useState("");
  useEffect(() => {
    getDataFromStorage();
  }, []);
  const getDataFromStorage = async () => {
    let BusinessName = await AsyncStorage.getItem("BusinessName");
    if (BusinessName) {
      setBusinessText(BusinessName);
      setDeleteBusinessName(BusinessName);
    } else {
      var bname = businessData.business
        ? businessData.business[0].location
        : "";
      if (Utils.isEmpty(bname)) {
        bname = businessData.business
          ? businessData.business[0].name
          : "Choose Location";
      }
      setBusinessText(bname);
      setDeleteBusinessName(bname);
    }
  };

  const sidebarOpen = () => {
    setToggle("hide");
  };

  const sidebarClose = () => {
    setToggle("active");
  };

  const setBusinessNameLocalStorage = async (optionText) => {
    await AsyncStorage.setItem("BusinessName", optionText).then(() => {
      sidebarClose();
      window.location.reload(false);
      // refreshPage();
    });
  };

  const DeleteBusiness = () => {
    setVisibel(false);
    let payload = {
      business_id: businessId,
      employee_id: "2",
    };
    dispatch(deleteBusinessRequest(payload, onDeleteBusinessSuccess));
  };
  const onDeleteBusinessSuccess = async (response) => {
    setBusinessText(
      businessData.business ? businessData.business[0].name : "Switch Location"
    );
    setBusinessNameLocalStorage(
      businessData.business ? businessData.business[0].name : "Switch Location"
    );
  };
  const handleBusinessText = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setBusinessText(optionText);
    setBusinessType(id);
    setDeleteBusinessName(optionText);
    setBusinessNameLocalStorage(optionText);
    updateBusinessIdRequest(id);
    console.log("updateBusinessIdRequest(id)", updateBusinessIdRequest(id));
    dispatch(updateBusinessIdRequest(id));
  };
  function refreshPage() {
    history.push("/");
    //window.location.reload(true);
  }
  // console.log("businessId", businessId);
  const renderBusinessDropDown = () => {
    if (businessData.business) {
      return businessData.business.map((item) => (
        <Dropdown.Item eventKey={JSON.stringify(item.id)}>
          {!Utils.isEmpty(item.location) ? item.location : item.name}
        </Dropdown.Item>
      ));
    }
  };

  const { highlightedItem } = props;
  return (
    <>
      {isVisibel ? (
        <SweetAlert
          title=""
          confirmBtnText="Delete Business"
          confirmBtnBsStyle="success"
          onConfirm={DeleteBusiness}
          onCancel={() => setVisibel(false)}
        >
          <h6>Are you sure you want to delete this business?</h6>
          <p style={{ color: "#F0924E", marginTop: "2rem" }}>
            {deleteBusinessName}
          </p>
        </SweetAlert>
      ) : (
        ""
      )}
      {/* <Dialog isVisibel={isVisibel} Handler={() => setVisibel(!isVisibel)} /> */}
      <nav className="navbar navbar-expand-md navbar-light pc_header">
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <div className="row">
                <div className="ml-5">
                  <Link to="/account-information" className="navbar-brand">
                    <img
                      src={HB_logo}
                      alt="..."
                      height="36"
                      className="img-w-h"
                    />
                  </Link>
                </div>
                <div className="mt-4 mr-i3 logo-text">
                  <Link to="/account-information">
                    HUB
                    <br />
                    BOUND
                  </Link>
                </div>
              </div>
            </li>
          </ul>

          {UserData ? (
            <ul className="nav navbar-nav ml-auto margin-ri notification_pc">
              <div className="dropdown border-none">
                {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.order_management == 1) ? 
                <button
                  onClick={() => history.push("/orders")}
                  type="button"
                  className="bt bdropdown-toggle"
                  data-toggle="dropdown"
                >
                  <img
                    src={ordersPending ? Notificationbellicon : Notificationsicon}
                    className="img-fluid mr-5 mt-2"
                    alt="..."
                  />
                </button>
                : <></>}
                <div className="dropdown-menu widset d">
                  <Link className="dropdown-item" to="#">
                    Link 1
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Link 2
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Link 3
                  </Link>
                </div>
              </div>
              <Link className="outline-none mibile" to="#">
                <button
                  type="button"
                  id="sidebarCollapse_pc"
                  className="btn font-size navbar-btn"
                  onClick={() => [sidebarOpen()]}
                >
                  <i className="fa fa-bars fntsi" aria-hidden="true"></i>
                </button>
              </Link>
            </ul>
          ) : (
            <ul
              className={
                highlightedItem === "login" || highlightedItem === ""
                  ? "nav navbar-nav ml-auto margin-ri hidden"
                  : "nav navbar-nav ml-auto margin-ri"
              }
            >
              <Link to="/login" className="mr-5 fnt8">
                Login
              </Link>
              <Link to="/business-account" className="fnt8">
                Sign up
              </Link>
            </ul>
          )}
        </div>
      </nav>
      <nav className="header mobile_header">
        <Link className="links logo" to="/account-information">
          <img src={HB_logo} alt="logo" className="img-w-h" />
        </Link>
        <Link className="links mt-3 mr-3" to="/account-information">
          <p className="mr-2 mobile">
            HUB
            <br />
            BOUND
          </p>
        </Link>
        <div className="header-right">
          {UserData ? (
            <>
              <Link
                to="/orders"
                className="links widys"
                type="button"
                data-toggle="dropdown"
              >
                <img
                  src={ ordersPending ? Notificationbellicon : Notificationsicon}
                  className="img-fluid mt-4 mobile-header-top-img"
                  alt="..."
                />
              </Link>
              <div className="dropdown-menu mr-5">
                <i className="caret-up headers mobile"></i>
                <Link className="dropdown-item" to="#">
                  Link 1
                </Link>
                <Link className="dropdown-item" to="#">
                  Link 2
                </Link>
                <Link className="dropdown-item" to="#">
                  Link 3
                </Link>
              </div>
              <Link className="outline-none mibile mt-3" to="#">
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn font-size navbar-btn"
                  onClick={() => [sidebarOpen()]}
                >
                  <i className="fa fa-bars fntsi" aria-hidden="true"></i>
                </button>
              </Link>
            </>
          ) : (
            <ul
              className={
                highlightedItem === "login" || highlightedItem === ""
                  ? "nav navbar-nav ml-auto margin-ri hidden"
                  : "nav navbar-nav ml-auto margin-ri"
              }
            >
              <Link to="/login" className="mr-5 fnt8">
                Login
              </Link>
              <Link to="/business-account" className="fnt8">
                Sign up
              </Link>
            </ul>
          )}
        </div>
      </nav>

      <div className="alert" role="alert">
        <nav
          id="sidebar"
          className={toggle}
          //</div>onClick={() => [sidebarClose()]}
        >
          <button
            onClick={() => [sidebarClose()]}
            type="button"
            className="triggers"
          >
            <span aria-hidden="true">×</span>
          </button>
          {UserData && (
            <div className="w-75 margin mt-5">
              {/* <h6>{UserData.firstname}</h6> */}
              <h6>{business_text}</h6>
            </div>
          )}

          {/* <div className="w-75 margin mt-3">
            <Link to="">{business_text}</Link>
          </div> */}

          <div style={{ margin: 25 }}>
            {/* {console.log("sdasdasdasdasd", businessData?.business?.length)} */}
            {businessData?.business?.length > 1
              ? ["Secondary"].map((variant) => (
                  <SplitButton
                    key={variant}
                    id={`dropdown-split-variants-${variant}`}
                    variant={variant.toLowerCase()}
                    title="Switch Location"
                    className="change-business"
                    onSelect={(obj, id) => handleBusinessText(obj, id)}
                  >
                    <Dropdown.Item active="true">Switch Location</Dropdown.Item>
                    {renderBusinessDropDown()}
                  </SplitButton>
                ))
              : ""}
            {/* {["Secondary"].map((variant) => (
              <SplitButton
                key={variant}
                id={`dropdown-split-variants-${variant}`}
                variant={variant.toLowerCase()}
                title={business_text}
                className="change-business"
                onSelect={(obj, id) => (obj, id)}
              >
                {renderBusinessDropDown()}
              </SplitButton>
            ))} */}
            {/* <span style={{fontSize: '20px'}}><img width="20" src={emptycircle} />&nbsp;{business_text}</span> */}
          </div>
          {userRole == ROLE_USER ? 
          <div className=" w-85 margin mt-2">
            <button
              onClick={() => history.push("/AddBusiness")}
              type="button"
              className="btn render color-66 widths mb-3 "
            >
              Add Business
            </button>
          </div>
          :
          <></>}

          <div className="border-bottom  w-75 margin"></div>
          <ul className="list-unstyled components">
            <li>
              <Link
                to="/account-information"
                className={
                  highlightedItem === "account_information" ? "active" : ""
                }
              >
                <span className="w-28 float-left">
                  <img src={Accounticon} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Account information</span>
              </Link>
            </li>
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.inventor == 1) ? 
            <li>
              <Link
                to="/catalog"
                className={highlightedItem === "catalog" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={book} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Catalog</span>
              </Link>
            </li>
            : <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.business_hours == 1) ? 
            <li>
              <Link
                to="/business-hours"
                className={highlightedItem === "business_hours" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={Businesshrsicon} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Business Hours</span>
              </Link>
            </li>
            :
            <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.location == 1) ? 
            <li>
              <Link
                to="/location"
                className={highlightedItem === "location" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={location} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Location</span>
              </Link>
            </li>
            :
            <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.integrations == 1) ?
            <li>
              <Link
                to="/integrations"
                className={highlightedItem === "integrations" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={integration} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Integrations</span>
              </Link>
            </li>
            :
            <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.performance == 1) ?
            <li>
              <Link
                to="/overall-performance"
                className={
                  highlightedItem === "overall_performance" ? "active" : ""
                }
              >
                <span className="w-28 float-left">
                  <img
                    src={Overallperformanceicon}
                    className="img-fluid"
                    alt="..."
                  />
                </span>
                <span className="ml-2">Performance</span>
              </Link>
            </li>
            :
            <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.employees == 1) ?
            <li>
              <Link
                to="/admins"
                className={highlightedItem === "employee" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={Employeesicon} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Admins</span>
              </Link>
            </li>
            :
            <></>
            }
            {userRole == ROLE_USER || (userBusinessPermissions != undefined && userBusinessPermissions.payment == 1) ? 
            <li>
              <Link
                to="/billing"
                className={
                  highlightedItem === "billing_payment" ? "active" : ""
                }
              >
                <span className="w-28 float-left">
                  <img src={Billingicon} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Billing</span>
              </Link>
            </li>
            :
            <></>
            }
            <li>
              <Link
                to="/settings"
                className={highlightedItem === "settings" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={setting} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Settings</span>
              </Link>
            </li>

            {/* <li>
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
            </li> */}
            {/* <li>
              <Link
                to="/orders"
                className={highlightedItem === "orders" ? "active" : ""}
              >
                <span className="w-28 float-left">
                  <img src={Ordericon} className="img-fluid" alt="..." />
                </span>
                <span className="ml-2">Orders</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
