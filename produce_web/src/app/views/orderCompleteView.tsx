import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import { Tab, Nav } from "react-bootstrap";
import Utility from "../utility/utility";

import { shopingbag, clock, greemArrow, loadingIcon,vectore } from "../assets";
import {
  orderListingRequest,
  orderViewRequest,
} from "../redux/actions/orderAction";
import Utils from "../utility/utility";
import moment from "moment";
const OrderCompleteView = () => {
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
  const [orderItems, setOrderItems] = useState([]);
  const [pickDate, setPickUpDate] = useState(0);
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
      showSuccessToast: false,
    };
    dispatch(orderViewRequest(payload, onSuccess));
  };
  const onSuccess = async (response) => {
    console.log("onsuccess", response);
    setDetails(response[0]);
  };
  const setDetails = (response) => {
    const { id, order_items, pickup_date } = response;
    setOrderId(id);
    setOrderItems(order_items);
    setPickUpDate(pickup_date);
  };

  const orderRenderItems = () => {
    return orderItems.map(({ product_name, qty, note, product_image, available }) => (
      <tr>
        <td className="p-5 w-25">
          <span className="hi-w-set">
            <button type="button" className="btn btn-secondary radius">
              {!Utils.isEmpty(product_image)? (
                <img
                  src={product_image}
                  className="size-img-pending"
                  alt="..."
                />
              ) : ""}
            </button>
          </span>
          <span className="mt-4 block float-left">{product_name}</span>
        </td>
        <td>{available != null ? available : qty}</td>
        <td>{note}</td>
      </tr>
    ));
  };
  return (
    <>
      <Header highlightedItem={"orders"} />
      <div className="content">
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
                    Complete: details
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-right mt-5 wd-order">
                  <button
                    onClick={() =>
                      history.push("/orders", { activeKey: "complete" })
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
                      <span className="text-dark ml-2 pickuo-top">Pickup</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="tabs-left0">
                      <img
                        src={clock}
                        className="img-fluid height-pickupse"
                        alt="..."
                      />
                      <span className="text-dark">
                        {Utils.isEmpty(pickDate)
                          ? ""
                          : moment.unix(pickDate).format("lll")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <div className="row complete-top">
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
                    <tbody>
                      {orderRenderItems()}
                      {/* <tr>
                      <td className="w-25">
                        <span className="hi-w-set">
                          <button
                            type="button"
                            className="btn btn-secondary radius mt-4"
                          ></button>
                        </span>
                        <span className="mt-4 block">
                          White Button Mushrooms
                        </span>
                      </td>
                      <td>$0.50/ct</td>
                      <td>This is a small of a note a customer can leave.</td>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCompleteView;
