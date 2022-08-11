import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import { Tab, Nav } from "react-bootstrap";
import Utility from "../utility/utility";

import {
  shopingbag,
  clock,
  person,
  phone,
  greemArrow,
  loadingIcon,
} from "../assets";
import {
  orderViewRequest,
  orderUpdateRequest,
} from "../redux/actions/orderAction";
import Utils from "../utility/utility";
import moment from "moment";
const OrderPendingView = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data
  );
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );
  const isLoading = useSelector(
    (state: RootStateOrAny) => state.orderReducer.isLoading
  );
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [number, setNumber] = useState("");
  const [pickDate, setPickUpDate] = useState(0);
  const [orderDate, setOrderDate] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      if (location.state) {
        const { order_id } = location.state;
        getOrderDetails(order_id);
      }else if(location.search){
        const order_id = new URLSearchParams(location.search).get('id');
        getOrderDetails(order_id);
      }
    });
  }, []);
  const getOrderDetails = async (order_id) => {
    let payload = {
      business_id: JSON.stringify(businessId),
      showSuccessToast: false,
      order_id: JSON.stringify(order_id),
    };
    dispatch(orderViewRequest(payload, onSuccess));
  };
  const onSuccess = async (response) => {
    console.log("respons is=>", JSON.stringify(response));
    if(response[0] != undefined) setDetails(response[0]);
  };
  const setDetails = (response) => {
    const {
      id,
      order_items,
      customer_name,
      order_date,
      pickup_date,
      customer_phone,
    } = response;
    setOrderId(id);
    setOrderItems(order_items);
    setName(customer_name);
    setPickUpDate(pickup_date);
    setOrderDate(order_date);
    setCustomerPhone(customer_phone);
  };
  const orderRenderItems = () => {
    return orderItems.map(({ product_name, qty, note,product_image }) => (
      <tr>
        <td className="p-5 w-25">
          <span className="hi-w-set">
            <button type="button" className="btn btn-secondary radius"> {!Utils.isEmpty(product_image)? (
                <img
                  src={product_image}
                  className="size-img-pending"
                  alt="..."
                />
              ) : ""}</button>
          </span>
          <span className="mt-4 block float-left">{product_name}</span>
        </td>
        <td>{qty}</td>
        <td>{note}</td>
      </tr>
    ));
  };
  const onAcceptClick = () => {
    let payload = {
      order_id: JSON.stringify(orderId),
      order_status: "4",
    };
    dispatch(orderUpdateRequest(payload, onUpdateSuccessAccept));
  };
  const onDeclineClick = () => {
    let payload = {
      order_id: JSON.stringify(orderId),
      order_status: "3",
    };
    dispatch(orderUpdateRequest(payload, onUpdateSuccessDecline));
  };

  const onUpdateSuccessAccept = async () => {
    history.push({
      pathname: "/ongoing-order-view",
      state: { order_id: orderId },
    });
  };
  const onUpdateSuccessDecline = async () => {
    history.push("/orders", { activeKey: "pending" });
  };
  return (
    <>
      <Header highlightedItem={"orders"} />
      <div className="col-md-12 content">
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
                    Pending: view
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-right mt-5 wd-order">
                  <button
                    onClick={() =>
                      history.push("/orders", { activeKey: "pending" })
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
                </div>
              </div>
            </div>
            <div className="card mb-5">
              <div className="col-md-12 mt-3">
                <p className="texr-blues">{`Order` + ` #` + orderId}</p>
                <a href="bank-account.php"></a>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-2 mt-1">
                    <p>
                      <img
                        src={shopingbag}
                        className="img-fluid height-pickup"
                        alt="..."
                      />
                      <span className="text-dark ml-2">Pickup</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="tabs-left0">
                      <img
                        src={clock}
                        className="img-fluid height-pickups"
                        alt="..."
                      />
                      <span className="text-dark">
                        {Utils.isEmpty(pickDate)
                          ? moment.unix(orderDate).format("MM/DD h:mm a")
                          : moment.unix(pickDate).format("lll")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <h6 className="bb pb-3">Customer</h6>
              </div>
              <div className="col-md-12">
                <div className="row mt-3">
                  <div className="col-md-3">
                    <p>
                      <img src={person} className="img-fluid" alt="..." />
                      <span className="text-dark ml-2">{name}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="tabs-left0">
                      <img src={phone} className="img-fluid" alt="..." />
                      <span className="text-dark ml-2">{customer_phone}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <div className="row">
                  <div className="col-md-12">
                    <h6>Order</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div className="table-responsive">
                  <table className="table w-80">
                    <thead className="white-clr brd">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">QTY</th>
                        <th scope="col">NOTES/BACKUP</th>
                      </tr>
                    </thead>
                    <tbody>{orderRenderItems()}</tbody>
                  </table>
                  <div className=" col-md-12 text-right  margin-auto mt-4 col-12">
                    <button
                      onClick={onDeclineClick}
                      type="button"
                      className="btn render btn-successe width mb-5 mr-5 p09 orders"
                    >
                      Decline
                    </button>
                    <button
                      onClick={onAcceptClick}
                      type="button"
                      className="btn render btn-successe width mb-5 po9 orders"
                    >
                      Accept
                    </button>
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

export default OrderPendingView;
