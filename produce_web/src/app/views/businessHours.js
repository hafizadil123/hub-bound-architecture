/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useContext } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Utility from "../utility/utility";
//import { SplitButton, Dropdown } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "../components/header";
import {
  businessHourRequest,
  addVsEditBusinessHourRequest,
} from "../redux/actions/businessHourAction";
import { Deleteicon, loadingIcon } from "../assets";
import APP_STRING from "../constants/String";
let payload = null;
var staticArrayData = [
  {
    dayname: "Monday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Tuesday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Wednesday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Thursday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Friday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Saturday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
  {
    dayname: "Sunday",
    close: "0",
    timeing: [{ start: "08:00 AM", end: "08:15 AM" }],
  },
];


var emptyStaticArrayData = [
  {
    dayname: "Monday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Tuesday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Wednesday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Thursday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Friday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Saturday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
  {
    dayname: "Sunday",
    close: "0",
    timeing: [{ start: '', end: '' }],
  },
];

const BusinessHours = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const UserData = useSelector((state) => state.loginReducer.data);
  const [selectedBusinessId, setBusinessIdApp] = useState(null);
  const [selectedEmployeeId, setEmployeeId] = useState(null);
  const [firstTimeValue, setFirstTimeValue] = useState("");
  const [lastTimeValue, setLastTimeValue] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [bussinessTypeText, setBussinessTypeText] = useState("");
  const [hours, setHours] = useState([]);
  const isLoading = useSelector((state) => state.businessHourReducer.isLoading);
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);
  const [updateForAll, setUpdateForAll] = useState(false);
  const [isData, setIsData] = useState(false);

  const [firstTime, setFirstTime] = useState([
    "12:00 AM",
    "12:15 AM",
    "12:30 AM",
    "12:45 AM",
    "01:00 AM",
    "01:15 AM",
    "01:30 AM",
    "01:45 AM",
    "02:00 AM",
    "02:15 AM",
    "02:30 AM",
    "02:45 AM",
    "03:00 AM",
    "03:15 AM",
    "03:30 AM",
    "03:45 AM",
    "04:00 AM",
    "04:15 AM",
    "04:30 AM",
    "04:45 AM",
    "05:00 AM",
    "05:15 AM",
    "05:30 AM",
    "05:45 AM",
    "06:00 AM",
    "06:15 AM",
    "06:30 AM",
    "06:45 AM",
    "07:00 AM",
    "07:15 AM",
    "07:30 AM",
    "07:45 AM",
    "08:00 AM",
    "08:15 AM",
    "08:30 AM",
    "08:45 AM",
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
    "02:00 PM",
    "02:15 PM",
    "02:30 PM",
    "02:45 PM",
    "03:00 PM",
    "03:15 PM",
    "03:30 PM",
    "03:45 PM",
    "04:00 PM",
    "04:15 PM",
    "04:30 PM",
    "04:45 PM",
    "05:00 PM",
    "05:15 PM",
    "05:30 PM",
    "05:45 PM",
    "06:00 PM",
    "06:15 PM",
    "06:30 PM",
    "06:45 PM",
    "07:00 PM",
    "07:15 PM",
    "07:30 PM",
    "07:45 PM",
    "08:00 PM",
    "08:15 PM",
    "08:30 PM",
    "08:45 PM",
    "09:00 PM",
    "09:15 PM",
    "09:30 PM",
    "09:45 PM",
    "10:00 PM",
    "10:15 PM",
    "10:30 PM",
    "10:45 PM",
    "11:00 PM",
    "11:15 PM",
    "11:30 PM",
    "11:45 PM",
  ]);
  const [lastTime, setLastTime] = useState([
    "12:00 AM",
    "12:15 AM",
    "12:30 AM",
    "12:45 AM",
    "01:00 AM",
    "01:15 AM",
    "01:30 AM",
    "01:45 AM",
    "02:00 AM",
    "02:15 AM",
    "02:30 AM",
    "02:45 AM",
    "03:00 AM",
    "03:15 AM",
    "03:30 AM",
    "03:45 AM",
    "04:00 AM",
    "04:15 AM",
    "04:30 AM",
    "04:45 AM",
    "05:00 AM",
    "05:15 AM",
    "05:30 AM",
    "05:45 AM",
    "06:00 AM",
    "06:15 AM",
    "06:30 AM",
    "06:45 AM",
    "07:00 AM",
    "07:15 AM",
    "07:30 AM",
    "07:45 AM",
    "08:00 AM",
    "08:15 AM",
    "08:30 AM",
    "08:45 AM",
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
    "02:00 PM",
    "02:15 PM",
    "02:30 PM",
    "02:45 PM",
    "03:00 PM",
    "03:15 PM",
    "03:30 PM",
    "03:45 PM",
    "04:00 PM",
    "04:15 PM",
    "04:30 PM",
    "04:45 PM",
    "05:00 PM",
    "05:15 PM",
    "05:30 PM",
    "05:45 PM",
    "06:00 PM",
    "06:15 PM",
    "06:30 PM",
    "06:45 PM",
    "07:00 PM",
    "07:15 PM",
    "07:30 PM",
    "07:45 PM",
    "08:00 PM",
    "08:15 PM",
    "08:30 PM",
    "08:45 PM",
    "09:00 PM",
    "09:15 PM",
    "09:30 PM",
    "09:45 PM",
    "10:00 PM",
    "10:15 PM",
    "10:30 PM",
    "10:45 PM",
    "11:00 PM",
    "11:15 PM",
    "11:30 PM",
    "11:45 PM",
  ]);
  const [isUpdating, setUpdating] = useState(false);

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
      var payloadF = {
        business_id: JSON.stringify(parseInt(businessId)),
        showSuccessToast: false,
      };
      dispatch(
        businessHourRequest(payloadF, onGetHoursSuccess, onGetHoursFailure)
      );
    });
  }, []);
  const onGetHoursSuccess = async (result) => {
    if (result.data.hours) {
      setHours(result.data.hours);
      setEmployeeId(result.data.employee_id);
      setBusinessIdApp(result.data.business_id);
      setIsData(true);
    } else {
      setHours(emptyStaticArrayData);
      setEmployeeId(UserData.id);
      setIsData(false);
    }
  };

  const onGetHoursFailure = async (error) => {};

  const onDeleteHoursPress = (item, itemIndex, listIndex) => {
    hours[listIndex].timeing.splice(itemIndex, 1);
    payload = {
      employee_id: JSON.stringify(selectedEmployeeId),
      business_id:
        selectedBusinessId == null
          ? JSON.stringify(parseInt(businessId))
          : JSON.stringify(selectedBusinessId),
      hours: hours,
    };
    setUpdating(!isUpdating);
  };

  const onAddHourPress = (index) => {
    var itemToAdd = {
      start: "08:00 AM",
      end: "08:30 PM",
    };
    hours[index].timeing.push(itemToAdd);
    payload = {
      employee_id: JSON.stringify(selectedEmployeeId),
      business_id:
        selectedBusinessId == null
          ? JSON.stringify(parseInt(businessId))
          : JSON.stringify(selectedBusinessId),
      hours: hours,
    };
    setUpdating(!isUpdating);
  };

  const onSuccess = async (result) => {};
  const onFailure = async (error) => {};
  const onCheckBoxPress = async (value, index) => {
    hours[index].close === APP_STRING.ONE
      ? (hours[index].close = APP_STRING.ZERO)
      : (hours[index].close = APP_STRING.ONE);
    setUpdating(!isUpdating);
    payload = {
      employee_id: JSON.stringify(selectedEmployeeId),
      business_id:
        selectedBusinessId == null
          ? JSON.stringify(parseInt(businessId))
          : JSON.stringify(selectedBusinessId),
      hours: hours,
    };
  };
  const onFirstTimeChange = async (value, itemIndex, listIndex) => {
    hours[listIndex].timeing[itemIndex].start = value;
    //setFirstTimeValue(value);
    payload = {
      employee_id: JSON.stringify(selectedEmployeeId),
      business_id:
        selectedBusinessId == null
          ? JSON.stringify(parseInt(businessId))
          : JSON.stringify(selectedBusinessId),
      hours: hours,
    };
    setUpdating(!isUpdating);
    //dispatch(addVsEditBusinessHourRequest(payload, onSuccess, onFailure))
  };
  const onLastTimeChange = async (value, itemIndex, listIndex) => {
    hours[listIndex].timeing[itemIndex].end = value;
    //setLastTimeValue(value)
    payload = {
      employee_id: JSON.stringify(selectedEmployeeId),
      business_id:
        selectedBusinessId == null
          ? JSON.stringify(parseInt(businessId))
          : JSON.stringify(selectedBusinessId),
      hours: hours,
    };
    setUpdating(!isUpdating);
    //dispatch(addVsEditBusinessHourRequest(payload, onSuccess, onFailure))
  };

  const onSavePress = async () => {
    if (payload != null) {
      payload.update_for_all = updateForAll;
      dispatch(addVsEditBusinessHourRequest(payload, onSuccess, onFailure));
    } else {
      console.log(" onSavePress .please update anything");
    }
  };
  const onAddPress = async () => {};
  const TimingListItem = (data, mainIndex) => {
    return data.map(({ start, end }, index, item) => (
      <div style={{ marginTop: 10 }} className="row">
        <Dropdown
          arrowClassName="arrowClassName"
          placeholderClassName="myPlaceholderClassName"
          controlClassName="form-control input-shadow hours_dropdown"
          options={firstTime}
          onChange={(object) =>
            onFirstTimeChange(object.value, index, mainIndex)
          }
          value={start}
          placeholder="Select an option"
        />
        <span className="ml-2 mr-2 mt-2"> - </span>
        <Dropdown
          arrowClassName="arrowClassName"
          placeholderClassName="myPlaceholderClassName"
          controlClassName="form-control input-shadow hours_dropdown"
          options={lastTime}
          onChange={(object) =>
            onLastTimeChange(object.value, index, mainIndex)
          }
          value={end}
          placeholder="Select an option"
        />
        {index != 0 && (
          <button
            onClick={() => onDeleteHoursPress(item, index, mainIndex)}
            type="button"
            className="img-dl"
            aria-label="Close"
          >
            <img src={Deleteicon} className="img-fluid" alt="..." />
          </button>
        )}
      </div>
    ));
  };

  const ListItemForDesktop = () => {
    if (hours.length > 0) {
      return hours.map((item, index) => (
        <div className="col-md-12">
          <div className="row mt-4">
            <div className="col-md-3 col-3">
              <h6>{item.dayname}</h6>
            </div>
            <div className="col-md-6 col-6">
              {hours.length > 0 ? TimingListItem(item.timeing, index) : null}
              <div onClick={() => onAddHourPress(index)} className="row">
                <p className="text-success m-2"><strong>Add additional hour</strong></p>
              </div>
            </div>
            <div className="col-md-3 col-3">
              <div className="myTest custom-control custom-checkbox mtless float-right">
                <input
                  type="checkbox"
                  onChange={(value) => onCheckBoxPress(value, index)}
                  checked={item.close == "1" ? true : false}
                  className="custom-control-input"
                  id="customChd"
                />
                <label className="custom-control-label">
                  Closed for the day?
                </label>
              </div>
            </div>
          </div>
          <div className="border mt3 mb-4"></div>
        </div>
      ));
    } else {
    }
  };


  const ListItemForMobile = () => {
    if (hours.length > 0) {
      return hours.map((item, index) => (
        <div className="col-md-12">
          <div className="row mt-4">

            <div className="p-0 col-md-12 col-12">

              <div className="p-0 col-md-6 col-6 float-left">
                <h6>{item.dayname}</h6>
              </div>

              <div className="p-0 col-md-6 col-6 float-left">
                <div className="myTest custom-control custom-checkbox float-right">
                  <label className="custom-control-label">
                    Closed for the day?
                  </label>
                  <input
                    type="checkbox"
                    onChange={(value) => onCheckBoxPress(value, index)}
                    checked={item.close == "1" ? true : false}
                    className="custom-control-input"
                    id="customChd"
                  />
                </div>
              </div>

            </div>

            <br/>

            <div className="col-md-12 col-12">
              {hours.length > 0 ? TimingListItem(item.timeing, index) : null}
              <div onClick={() => onAddHourPress(index)} className="row add-additional-hour-container">
                <p className="text-success m-2 add-additional-hour-text"><strong>Add additional hour</strong></p>
              </div>
            </div>
            
          </div>
          <div className="border mt3 mb-4"></div>
        </div>
      ));
    } else {
    }
  };

  const EmptyView = () => {
    return (
      <>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: 200,
          }}
        >
          <p>No Business Hour</p>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => onAddPress()}
            type="button"
            className="btn render color-666 hj-w mb-5 w-100"
          >
            Add
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      <Header highlightedItem={"business_solution"} />
      <div className="content mobile page-business-hours">
        <div className="container">
          <h4 className="text-success mt-5 font-family">Business Hours</h4>
          <div className="card mt-4 mb-5">
            {isLoading ? (
              <div className="text-center">
                <img src={loadingIcon} alt="loading..." />
              </div>
            ) : (
              <div className="container">
                    <div className="desktop_view">
                      {
                        isData ? 
                        ListItemForDesktop()
                        :
                        <p>No business hours set &nbsp; <i title="Edit" onClick={e => setIsData(!isData)} className="fa fa-edit pointer"></i></p>
                      }
                    </div>
                    <div className="mobile_view">
                      {
                        isData ? 
                        ListItemForMobile()
                        :
                        <p>No business hours set &nbsp; <i onClick={e => setIsData(!isData)} className="fa fa-edit pointer"></i></p>
                      }
                    </div>                
                    {
                    isData ?
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-10">
                          <div className="myTest custom-control custom-checkbox float-right">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCrh44d"
                              checked={updateForAll}
                              onChange={(e) => setUpdateForAll(!updateForAll)}
                            />
                            <label className="custom-control-label">
                              Update for all businesses
                            </label>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <button
                            onClick={() => onSavePress()}
                            type="button"
                            className="btn render color-666 hj-w mb-5 w-100"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  :
                  <></>
                  }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessHours;
