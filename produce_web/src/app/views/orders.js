import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/header";
import { Tab, Nav } from "react-bootstrap";
import Utility from "../utility/utility";
import Switch from "react-switch";
import Utils from "../utility/utility";

import moment from "moment";
import { loadingIcon } from "../assets";

import {
  product1,
  calendarIcon,
  usercheck,
  circle,
  timer,
  check_mark,
  person_icon,
} from "../assets";
import {
  orderListingRequest,
  loadMoreOrderRequest,
  orderViewRequest,
  orderSettingRequest,
} from "../redux/actions/orderAction";
var pendingloadMorePage = 1;
var cancelloadMorePage = 1;
var completedloadMorePage = 1;
var ongoingloadMorePage = 1;
var tempPendingOrder = [];
var tempOngoingOrder = [];
var tempCompletedOrder = [];
var tempCancelledOrder = [];
var type = "1";
const Orders = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("pending");
  const [isOrderSetting, setOrderSetting] = useState(false);
  const isLoading = useSelector((state) => state.orderReducer.isLoading);
  const OrderListingData =
    useSelector((state) => state.orderReducer.data) || null;
  const UserData = useSelector((state) => state.loginReducer.data);
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);

  const [pendingtotalPage, setPendingTotalPage] = useState(0);
  const [canceltotalPage, setCancelTotalPage] = useState(0);
  const [completedtotalPage, setCompletedTotalPage] = useState(0);
  const [ongoingtotalPage, setongoingTotalPage] = useState(0);

  const [isLoadMoreLoader, setLoadMoreLoader] = useState(false);
  const [pendingOrderData, setPendingOrder] = useState([]);
  const [completeOrderData, setCompleteOrder] = useState([]);
  const [ongoingOrderData, setOngoingOrder] = useState([]);
  const [cancelledOrderData, setCancelledOrder] = useState([]);
  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      getOrders();
      if (props.history.location.state) {
        setActiveTab(props.history.location.state.activeKey);
      }
    });
  }, []);

  const getOrders = async () => {
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      page: "1",
      showSuccessToast: false,
    };
    dispatch(orderListingRequest(payload, onSuccess));
  };
  const onSuccess = async (response) => {
    setOrderSetting(response.order_accept_status == '0' ? false : true);
    setPendingOrder(response.pending_orders);
    tempPendingOrder = response.pending_orders;
    setCompleteOrder(response.complete_orders);
    tempCompletedOrder = response.complete_orders;
    setCancelledOrder(response.canceled_orders);
    tempCancelledOrder = response.canceled_orders;
    setOngoingOrder(response.ongoing_orders);
    tempCancelledOrder = response.ongoing_orders;
  };
  const pendingLoadMoreClick = () => {
    type = "1";
    if (tempPendingOrder.length == 10) {
      let payload = {
        business_id: JSON.stringify(parseInt(businessId)),
        showSuccessToast: false,
        type: type,
        page: JSON.stringify(pendingloadMorePage),
      };

      console.log("loadMorePage payload=", JSON.stringify(payload));
      setLoadMoreLoader(true);
      dispatch(loadMoreOrderRequest(payload, onSuccessPendingLoadMore));
    }
  };
  const onSuccessPendingLoadMore = async (result) => {
    pendingloadMorePage++;
    setLoadMoreLoader(false);
    tempPendingOrder = result.listing;
    let pod = pendingOrderData.concat(result.listing);
    setOrderSetting(result.order_accept_status === "0" ? false : true);
    setPendingTotalPage(result.total_pages);
    //alert(result.total_pages);
    setPendingOrder(pod);
    console.log("pendingloadMorePage", pendingloadMorePage);
    console.log("pendingtotalPage", pendingtotalPage);
  };
  const ongoingLoadMoreClick = () => {
    type = "2";
    if (tempOngoingOrder.length == 10) {
      let payload = {
        business_id: JSON.stringify(parseInt(businessId)),
        type: type,
        page: JSON.stringify(ongoingloadMorePage),
        showSuccessToast: false,
      };
      console.log("loadMorePage payload=", JSON.stringify(payload));
      setLoadMoreLoader(true);
      dispatch(loadMoreOrderRequest(payload, onSuccessongoingLoadMore));
    }
  };
  const onSuccessongoingLoadMore = async (result) => {
    ongoingloadMorePage++;
    setLoadMoreLoader(false);
    tempOngoingOrder = result.listing;
    let ogo = ongoingOrderData.concat(result.listing);
    setOngoingOrder(ogo);
    setOrderSetting(result.order_accept_status === "0" ? false : true);
    setongoingTotalPage(result.total_pages);
  };

  const completedLoadMoreClick = () => {
    type = "3";
    if (tempCompletedOrder.length == 10) {
      let payload = {
        business_id: JSON.stringify(parseInt(businessId)),
        type: type,
        page: JSON.stringify(completedloadMorePage),
        showSuccessToast: false,
      };
      console.log("loadMorePage payload=", JSON.stringify(payload));
      setLoadMoreLoader(true);
      dispatch(loadMoreOrderRequest(payload, onSuccesscompletedLoadMore));
    }
  };
  const onSuccesscompletedLoadMore = async (result) => {
    completedloadMorePage++;
    setLoadMoreLoader(false);
    tempCompletedOrder = result.listing;
    let cod = completeOrderData.concat(result.listing);
    setCompleteOrder(cod);
    setOrderSetting(result.order_accept_status === "0" ? false : true);
    setCompletedTotalPage(result.total_pages);
  };
  const cancelledLoadMoreClick = () => {
    type = "4";
    if (tempCancelledOrder.length == 10) {
      let payload = {
        business_id: JSON.stringify(parseInt(businessId)),
        type: type,
        page: JSON.stringify(cancelloadMorePage),
        showSuccessToast: false,
      };
      console.log("loadMorePage payload=", JSON.stringify(payload));
      setLoadMoreLoader(true);
      dispatch(loadMoreOrderRequest(payload, onSuccesscancelLoadMore));
    }
  };
  const onSuccesscancelLoadMore = async (result) => {
    cancelloadMorePage++;
    tempCancelledOrder = result.listing;
    setLoadMoreLoader(false);
    let cod = cancelledOrderData.concat(result.listing);
    setCancelledOrder(cod);
    setOrderSetting(result.order_accept_status === "0" ? false : true);
    setCancelTotalPage(result.total_pages);
  };

  const updateOrderStatus = async (value) => {
    setOrderSetting(value);
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      order_accept_status: value ? "1" : "0",
    };
    dispatch(orderSettingRequest(payload, onSuccessData));
  };
  const EmptyView = () => {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: 200,
        }}
      >
        <p>No items</p>
      </div>
    );
  };
  const onSuccessData = async (response) => {
    setTimeout(() => {
      getOrders();
    }, 1000);
  };
  const completedOrders = () => {
    if (completeOrderData) {
      if (completeOrderData.length == 0) {
        return EmptyView();
      } else {
        return completeOrderData.map((item) => {
          const qty = item.order_items.reduce( (acc, obj) => {
            acc += obj.available != null ? obj.available : parseInt(obj.qty);
            return acc;
          }, 0);
          return (
            <div className="col-md-12 mt-4  w-75 margin col-12">
              <div className="row">
                <div className="col-md-8 col-8">
                  <h6 className="order-fnt8">
                    <span>{item.customer_name}</span>
                  </h6>
                  <div className="row custom-padding">
                    <p className="text-dark margin-position1">
                      {qty + ` Items - `}
                    </p>
                    <p className="text-dark order-fnt8 ml-1">
                      {Utils.isEmpty(item.order_date)
                        ? ""
                        : moment.unix(item.order_date).format(" MMM do h:mm a")}
                    </p>
                  </div>
                </div>
                {/* <div className="col-md-6 mobile col-6"></div> */}
                <div className="col-md-4 mobile col-4">
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/complete-order-view",
                        state: { order_id: item.id },
                      })
                    }
                    type="button"
                    className="btn render render btn-successe w-100 w-258 float-right green10"
                  >
                    <Link to="#">Details</Link>
                  </button>
                </div>
              </div>
              <div className="border mt-2"></div>
            </div>
          );
        });
      }
    }
  };
  const cancelledOrder = () => {
    if (cancelledOrderData) {
      if (cancelledOrderData.length == 0) {
        return EmptyView();
      } else {
        return cancelledOrderData.map((item) => {
          const qty = item.order_items.reduce( (acc, obj) => {
            acc += parseInt(obj.qty);
            return acc;
          }, 0);
          return (
            <div className="col-md-12 mt-4 w-75 margin col-12">
              <div className="row">
                <div className="col-md-6 col-6">
                  <h6 className="order-fnt8">{item.customer_name}</h6>
                  <p className="text-dark order-fnt8">
                    {qty + ` Items - Order #` + item.id}
                  </p>
                </div>
                <div className="col-md-6 mobile col-6">
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/canceled-order-view",
                        state: { order_id: item.id },
                      })
                    }
                    type="button"
                    className="btn render btn-successe w-100 w-258 float-right green10"
                  >
                    <Link to="#">Details</Link>
                  </button>
                </div>
              </div>
              <div className="border mt-2"></div>
            </div>
          );
        });
      }
    }
  };
  const pendingOrder = () => {
    if (pendingOrderData) {
      if (pendingOrderData.length == 0) {
        return EmptyView();
      } else {
        return pendingOrderData.map((item) => {
          const qty = item.order_items.reduce( (acc, obj) => {
            acc += parseInt(obj.qty);
            return acc;
          }, 0);
          return (
            <>
              <div className="col-md-12 mt-5 w-78 margin col-12">
                <div className="row">
                  <div className="col-md-8 col-8">
                    <div className="row">
                      <div className="col-md-5 col-5 order">
                        <h6 className="text-center-mob">
                          <img
                            src={product1}
                            className="img-fluid order"
                            alt="..."
                          />
                          <span className="ml-3 order mob-w-100">
                            {item.customer_name}
                          </span>
                        </h6>
                      </div>
                      <div className="col-md-2 col-2">
                        <p className="text-dark margin-position">{qty}</p>
                      </div>
                      <div className="col-md-4 col-4">
                        <p className="text-dark order-font">
                          {Utils.isEmpty(item.order_date)
                            ? ""
                            : moment.unix(item.order_date).format(" MM/DD")}
                        </p>
                        <p className="text-dark order-font">
                          {Utils.isEmpty(item.order_date)
                            ? ""
                            : moment.unix(item.order_date).format("h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mobile col-4">
                    <div className="row">
                      <div className="col-md-6 col-6 p-0 order">
                        <p className="text-dark n-position order-font">ASAP</p>
                      </div>
                      <button
                        onClick={() =>
                          history.push({
                            pathname: "/pending-order-view",
                            state: { order_id: item.id },
                          })
                        }
                        type="button"
                        className="btn render start-red-btn w-100 w-258 float-right pending"
                      >
                        <Link to="#"> view</Link>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border mt-2"></div>
              </div>
            </>
          );
        });
      }
    }
  };
  const ongoingOrder = () => {
    if (ongoingOrderData) {
      var qty = 0;
      if (ongoingOrderData.length == 0) {
        return EmptyView();
      } else {
        return ongoingOrderData.map((item) => {
          const qty = item.order_items.reduce( (acc, obj) => {
            acc += parseInt(obj.qty);
            return acc;
          }, 0);
          return (
            <div className="col-md-12 mt-4 mb-4 w-78 margin col-12">
              <div className="row">
                <div className="col-md-8 col-8">
                  <div className="row">
                    <div className="col-md-5 col-5 order">
                      <h6 className="text-center-mob">
                        <img
                          src={product1}
                          className="img-fluid order"
                          alt="..."
                        />
                        <span className="ml-3 order mob-w-100">{item.customer_name}</span>
                      </h6>
                    </div>
                    <div className="col-md-2 col-2">
                      <p className="text-dark margin-position">{qty}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mobile col-4">
                  <div className="row">
                    <button
                      onClick={() =>
                        history.push({
                          pathname: "/ongoing-order-view",
                          state: { order_id: item.id },
                        })
                      }
                      type="button"
                      className="btn render start-red-btn w-100 w-258 float-right pending"
                    >
                      <Link to="#"> view</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border mt-2"></div>
            </div>
          );
        });
      }
    }
  };

  const pendingloadMoreView = () => {
    if (tempPendingOrder.length == 10) {
      return (
        <button
          disabled={isLoadMoreLoader}
          onClick={(e) => [pendingLoadMoreClick()]}
          type="button"
          className="btn float-right mobile-top"
        >
          {isLoadMoreLoader ? (
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          ) : (
            <p>Load More</p>
          )}
        </button>
      );
    }
  };

  const onOrderScrollListing = e => {

    const listingDiv = e.target;

    if (listingDiv.offsetHeight + listingDiv.scrollTop >= listingDiv.scrollHeight-1) {
      pendingLoadMoreClick();
    }

  }

  const completeloadMoreView = () => {
    if (tempCompletedOrder.length == 10) {
      return (
        <button
          disabled={isLoadMoreLoader}
          onClick={(e) => [completedLoadMoreClick()]}
          type="button"
          className="btn float-right mobile-top"
        >
          {isLoadMoreLoader ? (
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          ) : (
            <p>Load More</p>
          )}
        </button>
      );
    }
  };
  const ongoingloadMoreView = () => {
    if (tempOngoingOrder.length == 10) {
      return (
        <button
          disabled={isLoadMoreLoader}
          onClick={(e) => [ongoingLoadMoreClick()]}
          type="button"
          className="btn float-right mobile-top"
        >
          {isLoadMoreLoader ? (
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          ) : (
            <p>Load More</p>
          )}
        </button>
      );
    }
  };
  const cancelloadMoreView = () => {
    if (tempCancelledOrder.length == 10) {
      return (
        <button
          disabled={isLoadMoreLoader}
          onClick={(e) => [cancelledLoadMoreClick()]}
          type="button"
          className="btn float-right mobile-top"
        >
          {isLoadMoreLoader ? (
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          ) : (
            <p>Load More</p>
          )}
        </button>
      );
    }
  };
  return (
    <>
      <Header highlightedItem={"orders"} />
      <div className="container order-page-tabs mobile-no-padding">
        {isLoading ? (
          <div className="text-center">
            <img src={loadingIcon} alt="loading..." />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 col-12">
              <Tab.Container
                id="tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                defaultActiveKey="pending"
              >
                <Tab.Content id="nav-tabContent" className="tab-content">
                  <Tab.Pane eventKey="pending" className="card">
                    <div className="row mt-5 col-md-12">
                      <div className="col-md-8 col-6">
                        <h4 className="text-success font-family order">
                          Orders: Pending
                        </h4>
                      </div>

                      <div className="pause-order-wrapper col-6 col-md-4">
                        <div className="row">
                          <div className="col-4 p-0 text-right mobile-text-none">
                            <Switch
                              uncheckedIcon={false}
                              checkedIcon={false}
                              onChange={(value) => updateOrderStatus(value)}
                              checked={isOrderSetting}
                              onColor='#344d89'
                            />
                          </div>
                          <div className="col-7 p-0">
                            <label className="mobile-font f-none-lable">
                              Pause future orders
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mt-4">
                      <div className="header bg-greys">
                        <div className="row mt-3">
                          <div className="col-md-3 col-3 order">
                            <h6 className="text-dark text-right mr-left">
                              Customer
                            </h6>
                          </div>
                          <div className="col-md-2 col-2 order">
                            <h6 className="text-dark nwopt">Items</h6>
                          </div>
                          <div className="col-md-2 col-2 order">
                            <h6 className="text-dark order">Placed</h6>
                          </div>
                          <div className="col-md-4 col-4 order">
                            <h6 className="text-dark order">Due</h6>
                          </div>
                        </div>
                      </div>
                      <div className="order-listing-wrapper" onScroll={e => onOrderScrollListing(e)}>
                        {pendingOrder()}
                        {/* {
                          pendingOrderData &&
                          pendingOrderData.length != 0 &&
                          pendingloadMoreView()
                        } */}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="ongoing" className="card">
                    <div className="row mt-5 col-md-12">
                      <div className="col-md-8 col-6">
                        <h4 className="text-success font-family order">
                          Orders: Accepted
                        </h4>
                      </div>
                    </div>
                    <div className="card mt-4">
                      <div className="header bg-greys">
                        <div className="row mt-3">
                          <div className="col-md-3 col-4 order">
                            <h6 className="text-dark text-right mr-left">
                              Customer
                            </h6>
                          </div>
                          <div className="col-md-2 col-2 order">
                            <h6 className="text-dark nwopt">Items</h6>
                          </div>
                        </div>
                      </div>
                      <div className="order-listing-wrapper">
                        {ongoingOrder()}
                        {ongoingOrderData &&
                          ongoingOrderData.length != 0 &&
                          ongoingloadMoreView()}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="complete" className="card">
                    <div className="mt-5">
                      <div className="col-md-12 col-12">
                        <h4 className="text-success font-family">
                          Orders: Complete
                        </h4>
                      </div>
                    </div>
                    <div className="card mt-5">
                      <div className="order-listing-wrapper">
                        {completedOrders()}
                        {completeOrderData &&
                          completeOrderData.length != 0 &&
                          completeloadMoreView()}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="canceled" className="card">
                    <div className="col-md-12 mt-5 col-12">
                      <h4 className="text-success font-family">
                        Orders: Canceled
                      </h4>
                    </div>
                    <div className="card mt-5">
                      <div className="order-listing-wrapper">
                        {cancelledOrder()}
                        {cancelledOrderData &&
                          cancelledOrderData.length != 0 &&
                          cancelloadMoreView()}
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
                <div className="bg-greys mb-5">
                  <div className="w-75 margin order">
                    <Nav className="nav nav-tabs nav-fill" id="nav-tab">
                      <Nav.Link eventKey="pending" className="nav-item">
                        {/* <img
                          src={calendarIcon}
                          className="img-fluid tabs-image"
                          alt="..."
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="52"
                          viewBox="0 0 50 52"
                          fill="none"
                          className="img-fluid fill-issue"
                        >
                          <path
                            d="M28.3447 1.75412C28.3447 0.788273 29.2399 0 30.3548 0C31.4697 0 32.3649 0.783941 32.3649 1.75412V9.42895C32.3649 10.3948 31.4697 11.1831 30.3548 11.1831C29.2399 11.1831 28.3447 10.3991 28.3447 9.42895V1.75412ZM37.1786 24.7006C38.9119 24.7006 40.568 25.0688 42.0817 25.7358C43.6564 26.4288 45.0684 27.4423 46.2484 28.6983C47.4284 29.9544 48.3805 31.4616 49.0316 33.1291C49.6582 34.7403 50.0041 36.5031 50.0041 38.3482C50.0041 40.1932 49.6582 41.956 49.0316 43.5672C48.3805 45.2434 47.4284 46.7463 46.2484 48.0023C45.0684 49.2584 43.6523 50.2719 42.0858 50.9649C40.5721 51.6319 38.916 52 37.1826 52C35.4492 52 33.7931 51.6319 32.2795 50.9649C30.7048 50.2719 29.2928 49.2584 28.1128 48.0023C26.9328 46.7463 25.9806 45.239 25.3296 43.5672C24.703 41.956 24.3571 40.1932 24.3571 38.3482C24.3571 36.5031 24.703 34.7403 25.3296 33.1291C25.9806 31.4529 26.9328 29.95 28.1128 28.694C29.2928 27.4379 30.7088 26.4245 32.2754 25.7315C33.7891 25.0688 35.4411 24.7006 37.1786 24.7006ZM36.2183 32.644C36.2183 32.3148 36.3444 32.016 36.5479 31.7994C36.7513 31.5829 37.0321 31.4486 37.3454 31.4486C37.6587 31.4486 37.9395 31.5829 38.1429 31.7994C38.3464 32.016 38.4725 32.3148 38.4725 32.6483V39.0325L42.9565 41.8651L42.9932 41.8911C43.2414 42.06 43.4041 42.3155 43.4692 42.597C43.5384 42.8916 43.5059 43.2121 43.3553 43.4893L43.3472 43.5023C43.339 43.5196 43.3309 43.5326 43.3187 43.5456C43.16 43.8054 42.9199 43.9787 42.6595 44.048C42.3828 44.1216 42.0817 44.087 41.8213 43.9267L36.8083 40.7693C36.6333 40.6697 36.4868 40.5181 36.381 40.3405C36.2752 40.1586 36.2142 39.9464 36.2142 39.7211L36.2183 32.644ZM44.6574 30.3875C43.6808 29.348 42.5171 28.5121 41.2272 27.9447C39.9821 27.3946 38.6149 27.0958 37.1786 27.0958C35.7422 27.0958 34.375 27.399 33.1299 27.9447C31.84 28.5121 30.6763 29.348 29.6997 30.3875C28.7231 31.427 27.9378 32.6657 27.4048 34.0386C26.888 35.364 26.6073 36.8193 26.6073 38.3482C26.6073 39.8771 26.8921 41.3323 27.4048 42.6577C27.9378 44.0307 28.7231 45.2694 29.6997 46.3088C30.6763 47.3483 31.84 48.1842 33.1299 48.7516C34.375 49.3017 35.7422 49.6005 37.1786 49.6005C38.6149 49.6005 39.9821 49.2974 41.2272 48.7516C42.5171 48.1842 43.6808 47.3483 44.6574 46.3088C46.5739 44.2689 47.7539 41.4579 47.7539 38.3482C47.7539 36.8193 47.4691 35.364 46.9564 34.0386C46.4193 32.6657 45.634 31.427 44.6574 30.3875ZM5.47282 24.8436C5.35889 24.8436 5.25716 24.3108 5.25716 23.6568C5.25716 23.0028 5.34668 22.4744 5.47282 22.4744H10.9578C11.0718 22.4744 11.1735 23.0072 11.1735 23.6568C11.1735 24.3108 11.084 24.8436 10.9578 24.8436H5.47282ZM14.2171 24.8436C14.1032 24.8436 14.0015 24.3108 14.0015 23.6568C14.0015 23.0028 14.091 22.4744 14.2171 22.4744H19.7021C19.8161 22.4744 19.9178 23.0072 19.9178 23.6568C19.9178 24.3108 19.8283 24.8436 19.7021 24.8436H14.2171ZM22.9614 24.8436C22.8475 24.8436 22.7458 24.3108 22.7458 23.6568C22.7458 23.0028 22.8353 22.4744 22.9614 22.4744H28.4465C28.5604 22.4744 28.6621 23.0028 28.6621 23.6525C28.1128 24.0163 27.5838 24.4148 27.0793 24.8436H22.9614ZM5.48503 31.6349C5.37109 31.6349 5.26937 31.1021 5.26937 30.4481C5.26937 29.7941 5.35889 29.2614 5.48503 29.2614H10.9701C11.084 29.2614 11.1857 29.7941 11.1857 30.4481C11.1857 31.1021 11.0962 31.6349 10.9701 31.6349H5.48503ZM14.2293 31.6349C14.1154 31.6349 14.0137 31.1021 14.0137 30.4481C14.0137 29.7941 14.1032 29.2614 14.2293 29.2614H19.7144C19.8283 29.2614 19.93 29.7941 19.93 30.4481C19.93 31.1021 19.8405 31.6349 19.7144 31.6349H14.2293ZM5.49723 38.4305C5.3833 38.4305 5.28158 37.8977 5.28158 37.2437C5.28158 36.5897 5.37109 36.057 5.49723 36.057H10.9823C11.0962 36.057 11.1979 36.5897 11.1979 37.2437C11.1979 37.8977 11.1084 38.4305 10.9823 38.4305H5.49723ZM14.2415 38.4305C14.1276 38.4305 14.0259 37.8977 14.0259 37.2437C14.0259 36.5897 14.1154 36.057 14.2415 36.057H19.7266C19.8405 36.057 19.9422 36.5897 19.9422 37.2437C19.9422 37.8977 19.8527 38.4305 19.7266 38.4305H14.2415ZM10.2905 1.75412C10.2905 0.788273 11.1857 0 12.3006 0C13.4155 0 14.3107 0.783941 14.3107 1.75412V9.42895C14.3107 10.3948 13.4115 11.1831 12.3006 11.1831C11.1857 11.1831 10.2905 10.3991 10.2905 9.42895V1.75412ZM2.21354 16.7789H40.4948V7.94336C40.4948 7.64018 40.3809 7.37598 40.1978 7.18108C40.0147 6.98617 39.7542 6.8649 39.4816 6.8649H35.8114C35.1969 6.8649 34.6965 6.33217 34.6965 5.67816C34.6965 5.02415 35.1969 4.49142 35.8114 4.49142H39.4816C40.3809 4.49142 41.1865 4.87689 41.7765 5.50491C42.3665 6.13293 42.7287 6.99051 42.7287 7.94769V21.9763C41.9963 21.7078 41.2435 21.4913 40.4704 21.331V19.1394H40.4948H2.21354V42.021C2.21354 42.3242 2.32747 42.5884 2.51058 42.7833C2.69369 42.9782 2.9541 43.0995 3.22673 43.0995H21.4193C21.6268 43.9224 21.8872 44.7236 22.2005 45.4946H3.24707C2.35189 45.4946 1.54216 45.1091 0.952148 44.4811C0.362142 43.8574 0 42.9998 0 42.0426V7.95202C0 6.99917 0.362142 6.13727 0.952148 5.50925C1.54216 4.88123 2.34782 4.49575 3.24707 4.49575H7.16553C7.77995 4.49575 8.28044 5.02849 8.28044 5.68249C8.28044 6.3365 7.77995 6.86923 7.16553 6.86923H3.24707C2.96224 6.86923 2.71403 6.99051 2.53092 7.18541C2.34782 7.38031 2.23389 7.65751 2.23389 7.94769V16.7833H2.21354V16.7789ZM17.5252 6.8649C16.9108 6.8649 16.4103 6.33217 16.4103 5.67816C16.4103 5.02415 16.9108 4.49142 17.5252 4.49142H24.9959C25.6104 4.49142 26.1108 5.02415 26.1108 5.67816C26.1108 6.33217 25.6104 6.8649 24.9959 6.8649H17.5252Z"
                            fill="#444444"
                          />
                        </svg>
                      </Nav.Link>
                      <Nav.Link eventKey="ongoing" className="nav-item">
                        {/* <img
                          src={timer}
                          className="img-fluid tabs-image"
                          alt="..."
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="56"
                          height="51"
                          viewBox="0 0 56 51"
                          fill="none"
                        >
                          <path
                            d="M38.5 9.5625H17.5C14.525 9.5625 12.25 7.49063 12.25 4.78125H43.75C43.75 7.49063 41.475 9.5625 38.5 9.5625Z"
                            stroke="#444444"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 41.4375H38.5C41.475 41.4375 43.75 43.5094 43.75 46.2188H12.25C12.25 43.5094 14.525 41.4375 17.5 41.4375Z"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M40.2499 41.4375V35.0625C40.2499 34.1062 39.7249 33.15 38.8499 32.5125L32.3749 28.05C30.4499 26.775 30.4499 24.225 32.3749 22.95L38.8499 18.4875C39.7249 17.85 40.2499 16.8938 40.2499 15.9375V9.5625"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.75 9.5625V15.9375C15.75 16.8938 16.275 17.85 17.15 18.4875L23.625 22.95C25.55 24.225 25.55 26.775 23.625 28.05L17.15 32.5125C16.275 33.15 15.75 34.1062 15.75 35.0625V41.4375"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.25 41.4375L28 33.4688L36.75 41.4375H19.25Z"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M28 19.125L22.75 15.9375H33.25L28 19.125Z"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                      <Nav.Link eventKey="complete" className="nav-item">
                        {/* <img
                          src={person_icon}
                          className="img-fluid tabs-image"
                          alt="..."
                        /> */}
                        {/* <img
                          src={check_mark}
                          className="img-fluid wo-set"
                          alt="..."
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="49"
                          viewBox="0 0 44 49"
                          fill="none"
                          className="img-fluid fill-issue"
                        >
                          <path
                            d="M21.9309 27.1967C28.0704 27.1967 33.0503 21.6509 33.0503 14.8137C33.0503 7.9765 28.0704 2.46875 21.9309 2.46875C15.7914 2.46875 10.8115 8.01449 10.8115 14.8137C10.8115 21.6129 15.7914 27.1967 21.9309 27.1967ZM21.9309 5.69743C26.4332 5.69743 30.1169 9.79976 30.1169 14.8137C30.1169 19.8277 26.4332 23.93 21.9309 23.93C17.4286 23.93 13.7449 19.8277 13.7449 14.8137C13.7449 9.79976 17.4286 5.69743 21.9309 5.69743Z"
                            fill="#444444"
                          />
                          <path
                            d="M2.69421 46.5313H41.3051C42.1237 46.5313 42.7717 45.8096 42.7717 44.898C42.7717 36.3515 36.5299 29.3623 28.8213 29.3623H15.1779C7.50351 29.3623 1.22754 36.3135 1.22754 44.898C1.22754 45.8096 1.8756 46.5313 2.69421 46.5313ZM15.1779 32.629H28.8213C34.4151 32.629 39.0198 37.2631 39.7361 43.2646H4.2632C4.97948 37.3011 9.58413 32.629 15.1779 32.629Z"
                            fill="#444444"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="img-fluid wo-set"
                        >
                          <path
                            d="M18.3337 9.23355V10.0002C18.3326 11.7972 17.7507 13.5458 16.6748 14.9851C15.5988 16.4244 14.0864 17.4773 12.3631 17.9868C10.6399 18.4963 8.79804 18.4351 7.11238 17.8124C5.42673 17.1896 3.98754 16.0386 3.00946 14.5311C2.03138 13.0236 1.56682 11.2403 1.68506 9.44714C1.80329 7.65402 2.498 5.94715 3.66556 4.58111C4.83312 3.21506 6.41098 2.26303 8.16382 1.867C9.91665 1.47097 11.7506 1.65216 13.392 2.38355"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.3333 3.33301L10 11.6747L7.5 9.17467"
                            stroke="#444444"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                      <Nav.Link eventKey="canceled" className="nav-item">
                        {/* <img
                          src={circle}
                          className="img-fluid tabs-image"
                          alt="..."
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          className="img-fluid fill-issue"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24.0418 47.9167C37.2737 47.9167 48.0002 37.1902 48.0002 23.9583C48.0002 10.7265 37.2737 0 24.0418 0C10.81 0 0.0834961 10.7265 0.0834961 23.9583C0.0834961 37.1902 10.81 47.9167 24.0418 47.9167ZM24.0418 45.8333C36.1231 45.8333 45.9168 36.0396 45.9168 23.9583C45.9168 11.8771 36.1231 2.08333 24.0418 2.08333C11.9606 2.08333 2.16683 11.8771 2.16683 23.9583C2.16683 36.0396 11.9606 45.8333 24.0418 45.8333ZM15.203 34.2703L13.7298 32.7972L22.5687 23.9583L13.7298 15.1195L15.203 13.6463L24.0418 22.4852L32.8806 13.6463L34.3538 15.1195L25.5149 23.9583L34.3538 32.7972L32.8806 34.2703L24.0418 25.4315L15.203 34.2703Z"
                            fill="#444444"
                          />
                        </svg>
                      </Nav.Link>
                    </Nav>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
