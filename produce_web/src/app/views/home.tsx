import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  image_2021,
  mobilecatalog,
  checkbox_check,
  megaphone,
  MagnifyingGlass,
  ConsolidateInfo,
  cloud,
  Revenu,
  timeIcon,
  performance,
  cameraIllustration,
  Delivery,
  homeBanner,
} from "../assets";

const Home = () => {
  const history = useHistory();

  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );

  useEffect(() => {
    console.log("HomePage=>", JSON.stringify(UserData));
    Utility.isSignedIn(UserData).then((value) => {
      if (value) {
        history.push("/business-account");
      }
    });
  }, []);
  return (
    <>
      <Header highlightedItem={"location"} />
      <div className="bg-successd text-center p-1 font">
        <span className="color-white text-white">Register for FREE</span>
      </div>
      <img src={homeBanner} className="img-fluid w-100 h-50" alt="..." />

      <div className="bg-successd text-center p-1 font">
        <span className="color-white text-white">
          Order Management Software
        </span>
      </div>
      <div className="container">
        <div className="row bg-secondaryd">
          <div className="col-md-6 col-6">
            <div className="text-center ">
              <img
                src={mobilecatalog}
                className="img-fluid margin-8"
                alt="..."
              />
            </div>
            <div className="text-center mt-5 text-clr">
              <h3 className="green mobile-fnt">OPTIMIZED</h3>
              <h3 className="green mobile-fnt">EXCLUSIVELY FOR</h3>
              <h3 className="green mobile-fnt">GROCERS:</h3>
            </div>
            <div className="w-501 margin-auto">
              <p>
                <img src={checkbox_check} className="img-fluid" alt="..." />
                <span className="ml-3 text-dark">Virtual Grocers</span>
              </p>
              <p>
                <img src={checkbox_check} className="img-fluid" alt="..." />
                <span className="ml-3 text-dark">Mobile Vendors</span>
              </p>
              <p>
                <img src={checkbox_check} className="img-fluid" alt="..." />
                <span className="ml-3 text-dark">Convenice Stores</span>
              </p>
              <p>
                <img src={checkbox_check} className="img-fluid" alt="..." />
                <span className="ml-3 text-dark">Grocery Stores</span>
              </p>
              <p>
                <img src={checkbox_check} className="img-fluid" alt="..." />
                <span className="ml-3 text-dark">Liquor Stores</span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-6">
            <div className="">
              <h4 className="text-center mr-09">How it works</h4>
            </div>
            <div className="row w-7y">
              <div className="col-md-1 col-1">
                <span className="bg-bor">1</span>
              </div>
              <div className="col-md-10 col-11">
                <h5 className="fnt-mo mon-left">Input Business Info</h5>
                <p className="text-dark fnt-size3 mon-left text-justify">
                  Via account dashboard, add/edit catalog, prices, hours, and
                  location on our order management software. Info is synced and
                  automatically publishes on integrated online food ordering
                  system marketplaces.
                </p>
              </div>
            </div>
            <div className="row mt-2 w-7y">
              <div className="col-md-1 col-1">
                <span className="bg-bor">2</span>
              </div>
              <div className="col-md-10 col-11">
                <h5 className="fnt-mo mon-left">Manage Orders</h5>
                <p className="text-dark fnt-size3 mon-left text-justify">
                  View and manage all pending, ongoing, complete, and canceled
                  orders from all online food ordering system marketplaces in
                  real time from one consolidated platform; our order management
                  software.
                </p>
              </div>
            </div>
            <div className="row mt-2 w-7y">
              <div className="col-md-1 col-1">
                <span className="bg-bor">3</span>
              </div>
              <div className="col-md-10 col-11">
                <h5 className="fnt-mo mon-left">View Performance Data</h5>
                <p className="text-dark fnt-size3 mon-left text-justify">
                  Receive aggregated statistics gathered from all your online
                  food ordering system marketplaces such as which items sell
                  most to least, total orders and revenue each day, and item
                  unavailability rate.
                </p>
              </div>
            </div>
            <div className="row mt-4 w-7y">
              <p className="w-30 mar text-dark">
                Online grocery adoption will reach
              </p>
            </div>
            <div className="row w-7y">
              <h1 className="w-30 mar mon-left">55% - 66%</h1>
            </div>
            <div className="row w-7y">
              <p className="w-30 mar text-dark mon-left glp text-right">
                of US customers by 2024 <br />
                <b>- Business Insider</b>
              </p>
            </div>
          </div>
        </div>
        <div className="row bg-hgj">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="left box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={megaphone}
                        className="img-fluid bort bort1"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Increase <br />
                      Awareness
                    </span>
                  </h5>
                </div>
                <div className="left box-content">
                  <p className="text-dark ml-2">
                    51% of customers place an order through an app. Reach new
                    customers by listing on new online food ordering system apps
                    without adding new apps or tablets for you to manage.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="right box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={MagnifyingGlass}
                        className="img-fluid bort bort2"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Increase Search <br />
                      Visibility
                    </span>
                  </h5>
                </div>
                <div className="right box-content">
                  <p className="text-dark ml-3">
                    Search engines rank grocers higher when their listing info
                    is consistent online. Catalogs will be synced to online food
                    ordering system marketplaces ensuring 100% accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="left box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={ConsolidateInfo}
                        className="img-fluid bort bort3"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Consolidate <br />
                      Information
                    </span>
                  </h5>
                </div>
                <div className="left box-content">
                  <p className="text-dark ml-2">
                    Aggregate your orders across all online food ordering system
                    marketplaces into one feed and view performance stats
                    gathered from all integrated ordering channels, combined
                    into various KPI statistics.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="right box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={Revenu}
                        className="img-fluid bort bort4"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Increase <br />
                      Revenue
                    </span>
                  </h5>
                </div>
                <div className="right box-content">
                  <p className="text-dark ml-3">
                    Shrink labor costs by eliminating time spent on data entry.
                    Sync all your online food ordering system marketplace data
                    in a single, easy to use dashboard. No more juggling apps or
                    tablets.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="left box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={cloud}
                        className="img-fluid bort bort5"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Improve <br />
                      Efficiency
                    </span>
                  </h5>
                </div>
                <div className="left box-content">
                  <p className="text-dark ml-2">
                    With one base catalog for all online food ordering system
                    marketplaces, manage catalogs across locations, devices, and
                    ordering channels in one order management software.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="right box-title">
                  <h5 className="d-flex">
                    <span className="d-images">
                      <img
                        src={timeIcon}
                        className="img-fluid bort bort6"
                        alt="..."
                      />
                    </span>
                    <span className="ml-2 mt-2 text-dark font-24">
                      Save <br />
                      Time
                    </span>
                  </h5>
                </div>
                <div className="right box-content">
                  <p className="text-dark ml-3">
                    Save hours previously spent going through each online food
                    ordering system to make changes individually. Order
                    management software syncs and automatically posts an update
                    to all platforms at once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-secondaryd">
          <div className="col-md-12">
            <h2 className="text-center mt-4 vf">Unique Features</h2>
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="card w-33 bottom-shadow-card">
                  <img
                    src={performance}
                    className="img-fluid bortss"
                    alt="..."
                  />
                  <h4 className="text-center mt-3">Data</h4>
                  <p className="text-dark text-center mr-3 ml-3">
                    Via our order management software dashboard, receive
                    aggregated data from all online food ordering system
                    marketplaces so you can identify areas in need of
                    improvement.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="card w-33w bottom-shadow-card">
                  <img
                    src={cameraIllustration}
                    className="img-fluid we we1"
                    alt="..."
                  />
                  <h4 className="text-center mt-3">Photography</h4>
                  <p className="text-dark text-center mr-3 ml-3">
                    Our order management software database is prefilled with
                    professional produce photos that you can use for catalog
                    itmes synced to integrated online food ordering system
                    marketplaces.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="card w-33 bottom-shadow-card">
                  <img
                    src={image_2021}
                    className="img-fluid wes mb"
                    alt="..."
                  />
                  <h4 className="text-center mt-3">0 Fees</h4>
                  <p className="text-dark text-center  mr-3 ml-3">
                    Easily “pass on costs” to customers via an automatic price
                    markup to manage 3rd party fees such as online food ordering
                    system marketplace commission fees, delivery fees, and POS
                    surcharges.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="card w-33w bottom-shadow-card">
                  <img src={Delivery} className="img-fluid we" alt="..." />
                  <h4 className="text-center mt-3">Orders</h4>
                  <p className="text-dark text-center mr-3 ml-3">
                    Our order management software allows you to pause future
                    orders, mark orders as ready for pickup, and mark items as
                    out of stock. Actions are relayed to all integrated online
                    food ordering system marketplaces in real time.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 mb-5">
              <button
                onClick={() => history.push("/business-account")}
                type="button"
                className="btn render color-66 text-center font-family w-25 jho mt-5 mb-5"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
