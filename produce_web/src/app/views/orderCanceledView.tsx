import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link, useLocation, useParams } from "react-router-dom";
import Header from "../components/header";
import moment from "moment";
import { Tab, Nav } from "react-bootstrap";
import Utility from "../utility/utility";
import Utils from "../utility/utility";
import {
  shopingbag,
  clock,
  person,
  phone,
  greemArrow,
  loadingIcon,
} from "../assets";
import { orderViewRequest } from "../redux/actions/orderAction";

const OrderCanceledView = () => {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );
  const isLoading = useSelector(
    (state: RootStateOrAny) => state.orderReducer.isLoading
  );

  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data
  );
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [orderDate, setOrderDate] = useState(0);
  const [cancelDate, setCancelDate] = useState(0);
  const [pickupDate, setPickupDate] = useState(0);
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
      order_id: JSON.stringify(parseInt(order_id)),
      showSuccessToast: false,
    };
    dispatch(orderViewRequest(payload, onSuccess));
  };
  const onSuccess = async (response) => {
    if((response[0]) != undefined) setDetails(response[0]);
  };
  const setDetails = (response) => {
    console.log("setDetails", JSON.stringify(response));
    const {
      id,
      order_items,
      customer_firstname,
      customer_lastname,
      cancel_date,
      pickup_date,
      order_date,
    } = response;
    setOrderId(id);
    setOrderItems(order_items);
    setName(customer_firstname + ` ` + customer_lastname);
    setOrderDate(order_date);
    setCancelDate(cancel_date);
    setPickupDate(pickup_date);
  };
  const orderRenderItems = () => {
    return orderItems.map(({ product_name, qty, note, product_image }) => (
      <tr>
        <td className="p-5 w-25">
          <span className="hi-w-set">
            <button type="button" className="btn btn-secondary radius">{!Utils.isEmpty(product_image) ? (
                    <img
                      src={product_image}
                      className="size-img-pending"
                      alt="..."
                    />
                  ) : (
                    ""
                  )}</button>
          </span>
          <span className="mt-4 block float-left">{product_name}</span>
        </td>
        <td>{qty}</td>
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
                    Canceled: details
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-right mt-5 wd-order">
                  <button
                    onClick={() =>
                      history.push("/orders", { activeKey: "canceled" })
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
              <div className="col-md-6 mt-4">
                <h6 className="bb pb-3">Order Placed</h6>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p>
                      <span className="text-dark ml-2">
                        {Utility.isEmpty(orderDate)
                          ? ""
                          : moment.unix(orderDate).format("lll")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-4">
                <h6 className="bb pb-3">Requested Pickup Time</h6>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p>
                      <span className="text-dark ml-2">
                        {Utility.isEmpty(pickupDate)
                          ? "N/A"
                          : moment.unix(pickupDate).format("lll")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-4">
                <h6 className="bb pb-3">Cancel Time</h6>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p>
                      <span className="text-dark ml-2">
                        {Utility.isEmpty(cancelDate)
                          ? ""
                          : moment.unix(cancelDate).format("lll")}
                      </span>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCanceledView;
