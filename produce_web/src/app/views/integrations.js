import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Utility from "../utility/utility";
import Header from "../components/header";
import { useHistory, Link } from "react-router-dom";
import {
  Infoicon,
  Instacart_Logo,
  greenDot,
  cornershop,
  store,
  upArrow,
  loadingIcon,
} from "../assets";
import Switch from "react-switch";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  integrationRequest,
  integrationSaveRequest,
} from "../redux/actions/integrationAction";

const Integrations = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRequesting1, setRequesting1] = useState(false);
  const [isRequesting2, setRequesting2] = useState(false);
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);
  const popUpRefOne = useRef();
  const popUpRefTwo = useRef();
  const [selectedPassOnCostFirst, setSelectedPassOnCostFirst] = useState([]);
  const [selectedOrderAllowedFirst, setSelectedOrderAllowedFirst] = useState(
    []
  );
  const [selectedMarketPlace, setSelectedMarketPlace] = useState("");
  const [selectedPassOnCostSecond, setSelectedPassOnCostSecond] = useState([]);
  const [selectedOrderAllowedSecond, setSelectedOrderAllowedSecond] = useState(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [ifOrderSettingsPaused, setIfOrderSettingsPaused] = useState(false);
  const UserData = useSelector((state) => state.loginReducer.data);

  const uid = UserData && UserData.id!= undefined ? JSON.stringify(parseInt(UserData.id)) : '';

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/login");
      }
      getIntegrationDetails();
    });
  }, []);

  const setPassOnCostFirst = (id) => {
    let updatedArr = selectedPassOnCostFirst;
    const idx = updatedArr.indexOf(id);
    if (idx == -1) updatedArr = updatedArr.concat([id]);
    else updatedArr.splice(idx, 1);

    setSelectedPassOnCostFirst(updatedArr);
  };

  const setPassOnCostSecond = (id) => {
    let updatedArr = selectedPassOnCostSecond;
    const idx = updatedArr.indexOf(id);
    if (idx == -1) updatedArr = updatedArr.concat([id]);
    else updatedArr.splice(idx, 1);

    setSelectedPassOnCostSecond(updatedArr);
  };

  const setOrderAllowedFirst = (id) => {

    let updatedArr = selectedOrderAllowedFirst;

    const idx = updatedArr.indexOf(id);

    if (idx == -1)
      updatedArr = updatedArr.concat([id]);
    else
      updatedArr.splice(idx, 1);

    setSelectedOrderAllowedFirst(updatedArr);
    
  };

  const setOrderAllowedSecond = (id) => {
    
    let updatedArr = selectedOrderAllowedSecond;

    const idx = updatedArr.indexOf(id);

    if (idx == -1)
      updatedArr = updatedArr.concat([id]);
    else
      updatedArr.splice(idx, 1);  

    setSelectedOrderAllowedSecond(updatedArr);

  };

  const getIntegrationDetails = () => {
    setLoading(true);
    let payload = {
      showSuccessToast: false,
      business_id: JSON.stringify(businessId),
    };
    console.log(
      "integerations.payload.business_id",
      JSON.stringify(payload.business_id)
    );
    dispatch(integrationRequest(payload, onIntegrationDetailSuccess));
  };
  const onIntegrationDetailSuccess = (response) => {

    const result = response.result;
    //If order paused (from the orders page), then make the orders allowed as "Paused Orders" for both
    const ifOrderPaused = response.if_orders_paused;

    if (result.length > 0) {

      if (result.length == 1) {
        if (result[0].market_place_type == "1") {
          setSelectedPassOnCostFirst(result[0].pass_on_cost.split(','));
          const ordersAllowed = result[0].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowed.push('3');
          setSelectedOrderAllowedFirst( ordersAllowed );
          setRequesting1( Boolean(parseInt(result[0].status)) );
        } else {
          setSelectedPassOnCostSecond(result[0].pass_on_cost.split(','));
          const ordersAllowed = result[0].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowed.push('3');
          setSelectedOrderAllowedSecond( ordersAllowed );
          setRequesting2( Boolean(parseInt(result[0].status)) );
        }
      } else if (result.length == 2) {
        if (result[1].market_place_type == "2") {
          setSelectedPassOnCostSecond(result[1].pass_on_cost.split(','));
          const ordersAllowedSecond = result[1].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowedSecond.push('3');
          setSelectedOrderAllowedSecond( ordersAllowedSecond );
          setSelectedPassOnCostFirst(result[0].pass_on_cost.split(','));
          const ordersAllowedFirst = result[0].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowedFirst.push('3');
          setSelectedOrderAllowedFirst( ordersAllowedFirst );
          setRequesting2( Boolean(parseInt(result[1].status)) );
          setRequesting1( Boolean(parseInt(result[0].status)) );
        } else {
          setSelectedPassOnCostSecond(result[0].pass_on_cost.split(','));
          const ordersAllowedSecond = result[0].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowedSecond.push('3');
          setSelectedOrderAllowedSecond( ordersAllowedSecond );
          setSelectedPassOnCostFirst(result[1].pass_on_cost.split(','));
          const ordersAllowedFirst = result[1].order_allowed.split(',');
          if(ifOrderPaused) ordersAllowedFirst.push('3');
          setSelectedOrderAllowedFirst( ordersAllowedFirst );
          setRequesting1( Boolean(parseInt(result[1].status)) );
          setRequesting2( Boolean(parseInt(result[0].status)) );
        }
      }

    }else if(ifOrderPaused == true){

      setSelectedOrderAllowedFirst(['3']);
      setSelectedOrderAllowedSecond(['3']);

    }
  
    setLoading(false);
  
  };

  const saveIntegrationDetails = () => {
    setLoading(true);

    console.log("selectedPassOnCostFirst", selectedPassOnCostFirst);

    let payload = {
      employee_id: uid,
      business_id: JSON.stringify(parseInt(businessId)),
      integrations: [
        {
          pass_on_cost: selectedPassOnCostFirst,
          order_allowed: selectedOrderAllowedFirst,
          status: isRequesting1
        },
        {
          pass_on_cost: selectedPassOnCostSecond,
          order_allowed: selectedOrderAllowedSecond,
          status: isRequesting2
        }
      ]
    }
    console.log(
      "integerations.payload.business_id",
      JSON.stringify(payload.business_id)
    );
    dispatch(integrationSaveRequest(payload, onSaveIntegrationDetailSuccess));
  };

  const onSaveIntegrationDetailSuccess = (response) => {
    setLoading(false);
  };
  const popupOne = () => (
    <Popup
      trigger={(open) => <p></p>}
      position="top center"
      closeOnDocumentClick
      className="pass-on-cost"
      ref={popUpRefOne}
    >
      {
        <div style={{ background: "#16538B", padding: 0 }}>
          <lable style={{ color: "white" }}>
            Automatically pass costs onto customers via a price markup
          </lable>
        </div>
      }
    </Popup>
  );
  const popupTwo = () => (
    <Popup
      trigger={(open) => <p></p>}
      position="right"
      closeOnDocumentClick
      ref={popUpRefTwo}
    >
      {
        <div style={{ background: "#16538B", padding: 0 }}>
          <lable style={{ color: "white" }}>
            *Must set catalog, hours and location prior to going live
          </lable>
        </div>
      }
    </Popup>
  );
  return (
    <>
      <Header highlightedItem={"integrations"} />
      {isLoading ? (
        <div className="text-center">
          <img src={loadingIcon} alt="loading..." />
        </div>
      ) : (
        <div className="content mobile integration">
          <div className="container">
            <h4 className="text-success mt-5 font-family">Integrations</h4>
            <div className="card mt-5 mb-5">
              <div className="container">
                <div className="col-md-12 mt-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="th-integration">
                            Marketplace
                          </th>

                          <th
                            className=""
                            scope="col"
                            className="th-integration"
                          >
                            Pass on costs
                            <img
                              onClick={() => popUpRefOne.current.open()}
                              onMouseOver={() => popUpRefOne.current.open()}
                              // onMouseOut={() => popUpRefOne.current.close()}
                              src={Infoicon}
                              className="img-fluid mt-01 hovers"
                              alt="..."
                            ></img>
                            {popupOne()}
                            <div className="hover-block d-none">
                              <div className="arrowsin"></div>
                              <div className="inteb">
                                <p className="text-white fnt-sze">
                                  Automatically pass
                                  <br />
                                  costs anto customers
                                  <br />
                                  via a price markup
                                </p>
                              </div>
                            </div>
                          </th>
                          <th scope="col" className="th-integration">
                            Orders allowed
                          </th>
                          <th scope="col" className="th-integration">
                            Integrate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={Instacart_Logo}
                              className="img-fluid mt-01"
                              alt="..."
                            />
                          </td>
                          <td>
                            <label
                              for="isSurChargeFirst"
                              className="containers  w-83 mt-2 margin"
                            >
                              3% Surcharge
                              <input
                                onChange={(e) => [
                                  setPassOnCostFirst("1"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                type="checkbox"
                                defaultChecked={selectedPassOnCostFirst.includes(
                                  "1"
                                )}
                                name="isSurChargeFirst"
                                id="isSurChargeFirst"
                                key="1pc1"
                              />
                              <span
                                for="isSurChargeFirst"
                                className="checkmark mth"
                              ></span>
                            </label>
                            <label
                              for="isDeliveryFirst"
                              className="containers  w-83 mt-2 margin"
                            >
                              $3 Delivery
                              <input
                                onChange={(e) => [
                                  setPassOnCostFirst("2"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                defaultChecked={selectedPassOnCostFirst.includes(
                                  "2"
                                )}
                                type="checkbox"
                                name="isDeliveryFirst"
                                id="isDeliveryFirst"
                                key="1pc2"
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label
                              for="isCommissionFirst"
                              className="containers  w-83 mt-2 margin"
                            >
                              15% Commission
                              <input
                                onChange={(e) => [
                                  setPassOnCostFirst("3"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                defaultChecked={selectedPassOnCostFirst.includes(
                                  "3"
                                )}
                                type="checkbox"
                                name="isCommissionFirst"
                                id="isCommissionFirst"
                                key="1pc3"
                              />
                              <span className="checkmark mth"></span>
                            </label>
                          </td>
                          <td>
                            <label
                              for="isDelivFirst"
                              className="containers  w-83 mt-2 margin"
                            >
                              Delivery
                              <input
                                onChange={(e) => [
                                  setOrderAllowedFirst("1"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                defaultChecked={selectedOrderAllowedFirst.includes(
                                  "1"
                                )}
                                type="checkbox"
                                name="isDelivFirst"
                                id="isDelivFirst"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              Pickup
                              <input
                                onChange={(e) => [
                                  setOrderAllowedFirst("2"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                defaultChecked={selectedOrderAllowedFirst.includes(
                                  "2"
                                )}
                                type="checkbox"
                                name="isPickupFirst"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              Pause orders
                              <input
                                onChange={(e) => [
                                  setOrderAllowedFirst("3"),
                                  setSelectedMarketPlace("1"),
                                ]}
                                defaultChecked={selectedOrderAllowedFirst.includes(
                                  "3"
                                )}
                                type="checkbox"
                                name="isPauseOrderFirst"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                          </td>
                          <td
                            //onMouseOut={() => popUpRefTwo.current.close()}
                            //onMouseOver={() => popUpRefTwo.current.open()}
                          >
                            {/* <img
                              src={upArrow}
                              className="img-fluid mr-2 hovers"
                              alt="..."
                            />
                            {popupTwo()}
                            Request */}
                            <Switch
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onChange={(value) => setRequesting1(value)}
                                checked={isRequesting1}
                                className="custom-integration-switch"
                                onColor="#344d89"
                              />
                              <label>Request</label>                            
                          </td>
                          <div className="hover-block d-none">
                            <div className="arrowso"></div>
                            <div className="boxbm">
                              <p className="text-white fnt-sze">
                                Must set catalog,
                                <br />
                                hours and location
                                <br />
                                prior to going live
                              </p>
                            </div>
                          </div>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src={cornershop}
                              className="img-fluid mt-01"
                              alt="..."
                            />
                          </td>

                          <td>
                            <label className="containers  w-83 mt-2 margin">
                              3% Surcharge
                              <input
                                onChange={(e) => [
                                  setPassOnCostSecond("1"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                type="checkbox"
                                defaultChecked={selectedPassOnCostSecond.includes(
                                  "1"
                                )}
                                name="isSurChargeSecond"
                                key="2pc1"
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              $5 Delivery Fee
                              <input
                                onChange={(e) => [
                                  setPassOnCostSecond("2"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                type="checkbox"
                                defaultChecked={selectedPassOnCostSecond.includes(
                                  "2"
                                )}
                                name="isDeliverySecond"
                                key="2pc2"
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              10% Commission
                              <input
                                onChange={(e) => [
                                  setPassOnCostSecond("3"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                type="checkbox"
                                defaultChecked={selectedPassOnCostSecond.includes(
                                  "3"
                                )}
                                name="isCommissionSecond"
                                key="2pc3"
                              />
                              <span className="checkmark mth"></span>
                            </label>
                          </td>
                          <td>
                            <label className="containers  w-83 mt-2 margin">
                              Delivery
                              <input
                                onChange={(e) => [
                                  setOrderAllowedSecond("1"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                defaultChecked={selectedOrderAllowedSecond.includes(
                                  "1"
                                )}
                                type="checkbox"
                                name="isDelivSecond"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              Pickup
                              <input
                                onChange={(e) => [
                                  setOrderAllowedSecond("2"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                defaultChecked={selectedOrderAllowedSecond.includes(
                                  "2"
                                )}
                                type="checkbox"
                                name="isPickupSecond"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                            <label className="containers  w-83 mt-2 margin">
                              {/* <span className="checkmark mth"></span> */}
                              Pause orders
                              <input
                                onChange={(e) => [
                                  setOrderAllowedSecond("3"),
                                  setSelectedMarketPlace("2"),
                                ]}
                                defaultChecked={selectedOrderAllowedSecond.includes(
                                  "3"
                                )}
                                type="checkbox"
                                name="isPauseOrderSecond"
                                key={Math.random()}
                              />
                              <span className="checkmark mth"></span>
                            </label>
                          </td>
                          <td>
                            <div className="custom-control custom-switch mt-2 integration-switch">
                              {/* <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitchess1"
                              /> */}
                              <Switch
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onChange={(value) => setRequesting2(value)}
                                checked={isRequesting2}
                                className="custom-integration-switch"
                                onColor="#344d89"
                              />
                              <label>Request</label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-6">
                      <h4 className="text-col text-right mobile-center-stay">
                        Stay tuned for
                      </h4>
                      <h4 className="text-col text-right mobile-center-stay">
                        more integrations
                      </h4>
                      <h4 className="text-col text-right mobile-center-stay">
                        to come!
                      </h4>
                    </div>
                    <div className="col-md-6 mb-5 mobile-center-stays">
                      {/* <img src={greenDot} className="img-fluid mt-01" alt="..." />
                      <img
                        src={greenDot}
                        className="img-fluid mt-01 mr-3 ml-3"
                        alt="..."
                      />
                      <img src={greenDot} className="img-fluid mt-01" alt="..." /> */}
                      <img src={store} className="img-fluid mt-01" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mobile-center">
                <button
                  onClick={saveIntegrationDetails}
                  type="button"
                  className="btn render color-66 w-10"
                >
                  Save
                </button>
                <br/><br/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Integrations;
