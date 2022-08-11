import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import { Tab, Nav } from "react-bootstrap";
import Utility from "../utility/utility";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  shopingbag,
  clock,
  person,
  emptycircle,
  phone,
  greemArrow,
  loadingIcon
} from "../assets";
import { orderViewRequest, orderUpdateRequest } from "../redux/actions/orderAction";
import Utils from "../utility/utility";
import moment from "moment";

const OrderOngoingView = () => {
  
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);
  const UserData = useSelector((state) => state.loginReducer.data);
  const isLoading = useSelector((state) => state.orderReducer.isLoading);
  const [orderId, setOrderId] = useState("");
  const [availabeQty, setAvailabeQty] = useState([]);
  const [name, setName] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [isUpdating, setUpdating] = useState(false);
  const [pickDate, setPickUpDate] = useState(0);
  const [orderDate, setOrderDate] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  const updateAvailabeQty = (val, item_id) => {
    const available = val == "None" ? 0: val;
    const newArr = availabeQty.concat({item_id: item_id, val: available});
    setAvailabeQty(newArr);
  }

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      if (location.state) {
        const { order_id } = location.state;
        getOrderDetails(order_id);
      }
    });
  }, []);
  const getOrderDetails = async (order_id) => {
    let payload = {
      business_id: JSON.stringify(businessId),
      order_id: JSON.stringify(order_id),
      showSuccessToast: false
    };
    dispatch(orderViewRequest(payload, onSuccess));
  };
  const onSuccess = async (response) => {
    setDetails(response[0]);
  };
  const setDetails = (response) => {
    const {
      id,
      order_items,
      customer_name,
      order_date,
      pickup_date,
      customer_phone
    } = response;
    setOrderId(id);
    setOrderItems(order_items.map((v) => ({ ...v, isVisible: false })));
    setName(customer_name);
    setPickUpDate(pickup_date);
    setOrderDate(order_date);
    setCustomerPhone(customer_phone);
  };
  const onCheckBoxChange = (index) => {
    orderItems[index].isVisible = !orderItems[index].isVisible;
    setUpdating(!isUpdating);
  };
  const orderRenderItems = () => {
    return orderItems.map(
      ({ product_name, qty, note, isVisible, product_image, id }, index) => {
        var dropDownArray = ["None"];
        for (var input = 1; input <= qty; input++) {
          dropDownArray.push(input);
        }
        return (
          <tr>
            <td className="w-25">
              <span className="hi-w-set">
                <button type="button" className="btn btn-secondary radius">
                  {!Utils.isEmpty(product_image) ? (
                    <img
                      src={product_image}
                      className="size-img-pending"
                      alt="..."
                    />
                  ) : (
                    ""
                  )}
                </button>
              </span>
              <span className="mt-4 block float-left">{product_name}</span>
            </td>
            <td>{qty}</td>
            <td>{note}</td>
            <td className="custom-flex ml-2">
              <div className="myTest custom-control custom-checkbox  mt-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={index.id}
                  onChange={(value) => onCheckBoxChange(index)}
                />
                <label className="custom-control-label"></label>
              </div>
              {isVisible && (
                <Dropdown
                  arrowClassName="arrowClassName"
                  placeholderClassName="myPlaceholderClassName"
                  controlClassName="form-control input-shadow hours_dropdown"
                  options={dropDownArray}
                  //onChange={(object) =>
                  // onFirstTimeChange(object.value, index, mainIndex)
                  // }
                  // value={"start"}
                  onChange={val => updateAvailabeQty(val.value, id)}
                  placeholder="#available"
                />
              )}
            </td>
          </tr>
        );
      }
    );
  };


  const setOrderReady = () => {
    
    const payLoad = {
      "order_id": JSON.stringify(parseInt(orderId)),
      "order_status": JSON.stringify(2),
      "availability": availabeQty
    };
    dispatch(orderUpdateRequest(payLoad, async function(resp){
      history.push('/orders', { activeKey: "complete" });
    }));

  }

  return (
    <>
      <Header highlightedItem={"orders"} />
      <div className="content col-md-12">
        {isLoading ? (
          <div className="text-center">
            <img src={loadingIcon} alt="loading..." />
          </div>
        ) : (
          <div className="container orders">
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-12">
                  <h4 className="text-success mt-5 font-family">
                    Orders: Accepted
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-right mt-5 wd-order">
                  {/* <Link to="/orders"> */}
                  <button
                    onClick={() =>
                      history.push("/orders", { activeKey: "ongoing" })
                    }
                    type="button"
                    className="btn render color-66 width mb-5 green"
                  >
                    <img
                      src={greemArrow}
                      className="img-fluid mr-2 text-white"
                      alt="..."
                    />
                    Back to Order
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="card mt-5">
              <div className="col-md-12 mt-5 col-12">
                <div className="row">
                  <div className="col-md-3 col-10">
                    <h4 className="text-primaryg">{`Order #` + orderId}</h4>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-2 col-4">
                    <p>
                      <img
                        src={shopingbag}
                        className="img-fluid size-order height-pickup"
                        alt="..."
                      />
                      <span className="text-dark ml-2 fnt-size">Pickup</span>
                    </p>
                  </div>
                  <div className="col-md-4 col-7 p-0">
                    <p className="tabs-left0 order">
                      <img
                        src={clock}
                        className="img-fluid height-pickups"
                        alt="..."
                      />
                      <span className="text-dark ml-2 fnt-size order">
                        {Utility.isEmpty(pickDate)
                          ? moment.unix(orderDate).format("MM/DD h:mm a")
                          : moment.unix(pickDate).format("lll")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-5 col-12">
                <div className="row">
                  <div className="col-md-12 col-10">
                    <h6>Customer</h6>
                    <div className="border"></div>
                    <div className="row mt-4">
                      <div className="col-md-2 col-4">
                        <p>
                          <img src={person} className="img-fluid" alt="..." />
                          <span className="text-dark ml-2 fnt-size">
                            {name}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-4 col-7  p-0">
                        <p className="orders">
                          <img src={phone} className="img-fluid" alt="..." />
                          <span className="text-dark ml-2  fnt-size order">
                            {customer_phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-5 col-12">
                <div className="row">
                  <div className="col-md-12 col-12">
                    <h6>Order</h6>
                    <div className="border"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3 col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="white-clr">
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">QTY</th>
                        <th scope="col">NOTES/BACKUP</th>
                        <th scope="col">OUT OF STOCK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td className="w-25">
                          <span className="hi-w-set">
                            <button
                              type="button"
                              className="btn btn-secondary radius mt-4"
                            ></button>
                          </span>
                          <span className="mt-4 block">Banana</span>
                        </td>
                        <td>$0.50/ct</td>
                        <td>Green/unripe</td>
                        <td>
                          <div className="myTest custom-control custom-checkbox  mt-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck12w"
                            />
                            <label className="custom-control-label"></label>
                          </div>
                        </td>
                      </tr> */}
                      {orderRenderItems()}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" col-md-12 text-right  margin-auto mt-4 col-12">
                <button onClick={setOrderReady}
                  type="button"
                  className="btn render btn-successe width mb-5 po9 orders"
                >
                  Ready for Pickup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderOngoingView;
