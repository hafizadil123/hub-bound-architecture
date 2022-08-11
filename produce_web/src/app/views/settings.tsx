import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import { loadingIcon } from "../assets";
import { settingsInfoRequest } from "../redux/actions/settingsAction";
import { SETTINGS_SAVE_URL } from "../services/ApiUrls";
import { useRest, CALL_TYPES } from "../services/rest/api";

const Settings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );

  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data
  );
  const { id = {} } = UserData;

  const [products_updates, setProductsUpdates] = useState("");
  const [order_cancel, setOrderCancel] = useState("");
  const [order_placed, setOrderPlaced] = useState("");
  const [all_business, setAllBussines] = useState("");

  const handleSelectOrderCancel = (e) => {
    if (e.target.checked) {
      setOrderCancel("1");
    } else {
      setOrderCancel("0");
    }
  };

  const handleSelectProductUpdates = (e) => {
    if (e.target.checked) {
      setProductsUpdates("1");
    } else {
      setProductsUpdates("0");
    }
  };

  const handleSelectOrderPlace = (e) => {
    if (e.target.checked) {
      setOrderPlaced("1");
    } else {
      setOrderPlaced("0");
    }
  };

  const handleSelectAllBusiness = (e) => {
    if (e.target.checked) {
      setAllBussines("1");
    } else {
      setAllBussines("0");
    }
  };

  //save setting
  const {
    data,
    loading: updateloading,
    error: updateerror,
    fetchData: SettingSave,
    responseCode: responseCode__,
  } = useRest({
    URL: SETTINGS_SAVE_URL,
    CALL_TYPE: CALL_TYPES.POST,
    PAYLOAD: {
      products_updates: products_updates.toString(),
      order_cancel: order_cancel.toString(),
      order_placed: order_placed.toString(),
      uid: id.toString(),
      business_id: JSON.stringify(parseInt(businessId)),

      all_business: all_business.toString(),
    },
    lazy: true,
  });

  async function saveSetting(e) {
    SettingSave(0);
  }

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
    });
    setLoading(true);
    let payload = {
      uid: id.toString(),
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false,
    };
    dispatch(settingsInfoRequest(payload, onSettingInfo));
  }, []);

  async function onSettingInfo(SettingInfo) {
    if (SettingInfo) {
      if (!Utility.isEmpty(SettingInfo.products_updates)) {
        setProductsUpdates(SettingInfo.products_updates);
      }
      if (!Utility.isEmpty(SettingInfo.order_placed)) {
        setOrderPlaced(SettingInfo.order_placed);
      }
      if (!Utility.isEmpty(SettingInfo.order_cancel)) {
        setOrderCancel(SettingInfo.order_cancel);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Header highlightedItem={"settings"} />
      <div className="content mobile settings">
        {isLoading ? (
          <div className="text-center">
            <img src={loadingIcon} alt="loading..." />
          </div>
        ) : (
          <div className="container mobile-no-padding">
            <h4 className="mt-5 text-success font-family ml-3">Settings</h4>
            <div className="card mt-5 mb-5">
              <div className="container">
                <div className="w-92 margin mt-5">
                  <h5>Manage email notifications</h5>
                </div>
                <div className="w-92 margin mt-4">
                  <p className="text-dark">
                    Automatically sent to your account email. Change account
                    email under Account information.
                  </p>
                </div>
                <div className="w-92 margin mt-5">
                  <h5>Account Emails</h5>
                </div>
                <div className="w-92 margin mt-4">
                  <h6>Product Updates</h6>
                </div>
                <div className="myTest custom-control custom-checkbox w-92 margin mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={products_updates == "1"}
                    onClick={(e) => handleSelectProductUpdates(e)}
                  />
                  <label className="custom-control-label">
                    <p className="text-dark">
                      Stay up to date with new products and features,
                      announcements, and beta testing opportunities.
                    </p>
                  </label>
                </div>
                <div className="w-92 margin mt-5">
                  <h6>Transactional Emails</h6>
                </div>
                <div className="myTest custom-control custom-checkbox w-92 margin mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={order_placed == "1"}
                    onClick={(e) => handleSelectOrderPlace(e)}
                  />
                  <label className="custom-control-label">Order placed</label>
                  <p className="text-dark">
                    Receive an email every time an order is placed
                  </p>
                </div>
                <div className="myTest custom-control custom-checkbox w-92 margin mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={order_cancel == "1"}
                    onClick={(e) => handleSelectOrderCancel(e)}
                  />
                  <label className="custom-control-label">Order Canceled</label>
                  <p className="text-dark">
                    Receive an email every time an order is canceled
                  </p>
                </div>
                <div className="row">
                  <div className="w-50 margin mobile">
                    <div className="row mb-5 mt-4">
                      <div className="col-md-8">
                        <div className="myTest custom-control custom-checkbox float-right">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            onClick={(e) => handleSelectAllBusiness(e)}
                          />
                          <label className="custom-control-label">
                            Update for all businesses
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 mobile-center">
                        <button
                          type="button"
                          className="btn render color-66 w-10"
                          onClick={(e) => saveSetting(e)}
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

export default Settings;
