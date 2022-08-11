import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadingIcon } from "../assets";
import Utility from "../utility/utility";
import APP_STRING from "../constants/String";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "../components/header";
import {
  billingRequest,
  billingSaveRequest,
} from "../redux/actions/billingAction";

const statesArray = [
  "Alabama",
  "Alaska ",
  "Arizona ",
  "Arkansas ",
  "California ",
  "Colorado ",
  "Connecticut ",
  "Delaware ",
  "Florida ",
  "Georgia ",
  "Hawaii ",
  "Idaho ",
  "Illinois ",
  "Indiana ",
  "Iowa ",
  "Kansas ",
  "Kentucky ",
  "Louisiana ",
  "Maine ",
  "Maryland ",
  "Massachusetts ",
  "Michigan ",
  "Minnesota ",
  "Mississippi ",
  "Missouri ",
  "Montana ",
  "Nebraska ",
  "Nevada ",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota ",
  "Ohio ",
  "Oklahoma ",
  "Oregon ",
  "Pennsylvania ",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee ",
  "Texas ",
  "Utah ",
  "Vermont ",
  "Virginia ",
  "Washington ",
  "West Virginia",
  "Wisconsin ",
  "Wyoming ",
];

const BillingInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isExpiryMonth, setExpiryMonthVisible] = useState(false);
  const [isExpiryYear, setExpiryYearVisible] = useState(false);
  const [isExpiryCredit, setExpiryCreditVisible] = useState(false);
  const [isCvv, setCvv] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvvNumber] = useState("");
  const [plan, setPlan] = useState("Free plan :$0");
  const [selectUpdateAllBusiness, setSelectAllBusiness] = useState(false);
  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data
  );
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );
  const isLoading = useSelector(
    (state: RootStateOrAny) => state.billingReducer.isLoading
  );
  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      getBillingDetails();
    });
  }, []);

  const getBillingDetails = () => {
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false,
    };
    dispatch(billingRequest(payload, onBillingDetailSuccess));
  };
  const onBillingDetailSuccess = (response) => {
    const {
      name,
      email,
      state,
      city,
      zip_code,
      street,
      credit_card,
      expire_date,
      expire_month,
      stripe_customer_id,
    } = response;

    if (Utility.isObjEmpty(response)) {
      const { firstname, lastname } = UserData;
      setFullName(firstname + " " + lastname);
      setEmail(UserData.email);
    } else {
      setFullName(name);
      setEmail(email);
      setCity(city);
      setState(state);
      setZipCode(zip_code);
      setStreet(street);
      setCreditCardNumber(credit_card);
      setExpiryMonth(expire_month);
      setExpiryYear(expire_date);
      if (!Utility.isEmpty(stripe_customer_id)) {
        setPlan("$14.99");
      }
    }
  };
  function IsNumeric(input) {
    return input - 0 == input && input.length > 0;
  }
  const validateForm = () => {
    var message = "";
    if (Utility.isEmpty(fullName)) {
      message = APP_STRING.ENTER_FULL_NAME;
    } else if (Utility.isEmpty(street)) {
      message = APP_STRING.ENTER_STREET;
    } else if (Utility.isEmpty(city)) {
      message = APP_STRING.ENTER_CITY;
    } else if (/[^a-zA-Z]/.test(city)) {
      message = "Enter valid city";
    } else if (Utility.isEmpty(state)) {
      message = APP_STRING.ENTER_STATE;
    } else if (Utility.isEmpty(zip)) {
      message = APP_STRING.ENTER_ZIP;
    } else if (!/^[0-9\b]+$/.test(zip)) {
      message = "Enter valid code";
    } else if (Utility.isEmpty(creditCardNumber)) {
      message = APP_STRING.ENTER_CARD_NUMBER;
    } else if (creditCardNumber.length < 16) {
      message = APP_STRING.ENTER_VALID_CARD_NUMBER;
    } else if (Utility.isEmpty(expiryMonth)) {
      message = APP_STRING.ENTER_EXPIRY_MONTH;
    } else if (!IsNumeric(expiryMonth) || expiryMonth < 1 || expiryMonth > 12) {
      message = "Enter valid Month";
    } else if (Utility.isEmpty(cvv)) {
      message = APP_STRING.ENTER_EXPIRY_CVV;
    } else if (Utility.isEmpty(expiryYear)) {
      message = APP_STRING.ENTER_EXPIRY_YEAR;
    } else if (
      !IsNumeric(expiryYear) ||
      expiryYear < 1900 ||
      expiryYear > 2100
    ) {
      message = "Enter valid Year";
    }
    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };
  const saveOrEditBillingDetails = () => {
    if (validateForm()) {
      let payload = {
        employee_id: JSON.stringify(UserData.id),
        business_id: JSON.stringify(parseInt(businessId)),
        name: fullName,
        email: email,
        state: state,
        city: city,
        street: street,
        zip_code: zip,
        credit_card: creditCardNumber,
        expire_date: expiryYear,
        expire_month: expiryMonth,
        cvv: cvv,
        all_business: selectUpdateAllBusiness
      };
      dispatch(billingSaveRequest(payload, onEditOrSaveBillingDetailSuccess));
    }
  };
  const onEditOrSaveBillingDetailSuccess = (response) => {
    setExpiryMonthVisible(false);
    setExpiryYearVisible(false);
    setCvv(false);
    setExpiryCreditVisible(false);
    getBillingDetails();
  };
  const onStateSelected = (value) => {
    setState(value);
  };
  return (
    <>
      <Header highlightedItem={"billing_payment"} />
      <div className="content mobile billing">
        {isLoading ? (
          <div className="text-center">
            <img src={loadingIcon} alt="loading..." />
          </div>
        ) : (
          <div className="container mobile-no-padding">
            <h4 className="text-success mt-5 w-61 auto font-family">
              Billing information
            </h4>
            <div className="card mb-10 W-61 MR-A mt-4 mb-4">
              <div className="container">
                <div className="margin-auto">
                  <p className="text-dark mt-3">
                    <b>Monthly subscription - {plan}</b>
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>Name on Card</label>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>Email</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="text-dark mt-3">
                    <b>Billing Address</b>
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>Street</label>
                        <input
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>City</label>
                        <input
                          pattern="[A-Za-z]"
                          value={city}
                          // onkeypress="return /[a-z]/i.test(event.key)"
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label>State</label>
                      <div className="input-group">
                        <Dropdown
                          arrowClassName="arrowClassName"
                          placeholderClassName="myPlaceholderClassName"
                          controlClassName="form-control input-shadow hours_dropdown"
                          options={statesArray}
                          onChange={(object) => onStateSelected(object.value)}
                          value={state}
                          placeholder="Select an option"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>Zip Code</label>
                        <input
                          value={zip}
                          onChange={(e) => setZipCode(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="text-dark mt-3">
                    <b>Payment Method</b>
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="form-group margin-au">
                        <label>Credit Card Number</label>
                        <input
                          maxLength={16}
                          value={creditCardNumber}
                          type={isExpiryCredit ? "password" : "number"}
                          onChange={(e) => [
                            setCreditCardNumber(e.target.value),
                            // setExpiryCreditVisible(true),
                          ]}
                          className="form-control number"
                          placeholder="1111 2222 3333 4444"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-8">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Expiration Date</label>
                            <div className="row">
                              <input
                                maxLength={2}
                                value={expiryMonth}
                                onChange={(e) => [
                                  setExpiryMonth(e.target.value),
                                  // setExpiryMonthVisible(true),
                                ]}
                                type={isExpiryMonth ? "password" : "number"}
                                className="form-control w-21 ml-3 number"
                                placeholder="MM"
                              />
                              <input
                                maxLength={4}
                                value={expiryYear}
                                onChange={(e) => [
                                  setExpiryYear(e.target.value),
                                  // setExpiryYearVisible(true),
                                ]}
                                type={isExpiryYear ? "password" : "number"}
                                className="form-control w-22 ml-2 number"
                                placeholder="YY"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-4">
                      <div className="form-group margin-au">
                        <label>cvv</label>
                        <input
                          type="password"
                          maxLength={4}
                          onChange={(e) => [
                            setCvvNumber(e.target.value),
                            // setCvv(true),
                          ]}
                          className="form-control w-22"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="w-100 margin mobile">
                    <div className="row mb-5 mt-4">
                      <div className="col-md-8">
                        <div className="myTest custom-control custom-checkbox float-right">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck12rere"
                            checked={selectUpdateAllBusiness}
                            onChange={(e) => setSelectAllBusiness(!selectUpdateAllBusiness)}
                          />
                          <label className="custom-control-label">
                            Update for all businesses
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 mobile-center">
                        <button
                          onClick={saveOrEditBillingDetails}
                          type="button"
                          className="btn render color-66 w-10"
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
        )}
      </div>
    </>
  );
};

export default BillingInfo;
