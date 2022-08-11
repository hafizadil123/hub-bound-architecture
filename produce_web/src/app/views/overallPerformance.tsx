import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import { Line, Bar } from "react-chartjs-2";
import { SplitButton, Dropdown } from "react-bootstrap";
import { dashboardRequest } from "../redux/actions/dashboardAction";
import { loadingIcon } from "../assets";

const OverallPerformance = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data || {}
  );
  const { id = {} } = UserData;

  const DashboarData = useSelector(
    (state: RootStateOrAny) => state.dashboardReducer.data || []
  );

  const businessId = useSelector(
    (state: RootStateOrAny) => state.updateBusinessIdReducer.data || 1
  );

  const [showLoader, setShowLoader] = useState(false);
  const [MonthID, setMonthID] = useState("2");
  const [MonthText, setMonthText] = useState("Feburary");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleMonthSelect = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setMonthText(optionText);
    setMonthID(id);
    getOverAllPerformance(optionText);
  };

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
    });

    getOverAllPerformance(MonthText);
  }, []);

  const getOverAllPerformance = (MonthText) => {
    setShowLoader(true);
    var payload = {
      uid: JSON.stringify(id),
      showSuccessToast: false,
      month: MonthText,
      business_id: JSON.stringify(businessId)
    };
    console.log("payload=>", JSON.stringify(payload));
    dispatch(dashboardRequest(payload, onSuccess));
  };
  async function onSuccess() {
    setShowLoader(false);
  }

  return (
    <>
      {showLoader ? (
        <div className="text-center">
          <img src={loadingIcon} alt="loading..." />
        </div>
      ) : (
        <>
          <Header highlightedItem={"overall_performance"} />
          <div className="content mobile">
            <div className="container">
              <div className="col-md-12">
                <h4 className="text-success mt-5 font-family">
                  Overall Performance
                </h4>
              </div>
              <div className="mt-4">
                <div className="container mobile-no-padding">
                  <div className="row">
                    <div className="col-md-3 col-7 mb-5 mt-4 split-dropdown-right">
                      {["Secondary"].map((variant) => (
                        <SplitButton
                          key={variant}
                          id={`monthselector`}
                          variant={variant.toLowerCase()}
                          title={MonthText}
                          onSelect={(obj, id) => handleMonthSelect(obj, id)}
                        >
                          <Dropdown.Item eventKey="1" active={MonthID == "1"}>
                            January
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="2" active={MonthID == "2"}>
                            February
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3" active={MonthID == "3"}>
                            March
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="4" active={MonthID == "4"}>
                            April
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="5" active={MonthID == "5"}>
                            May
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="6" active={MonthID == "6"}>
                            June
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="7" active={MonthID == "7"}>
                            July
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="8" active={MonthID == "8"}>
                            August
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="9" active={MonthID == "9"}>
                            September
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="10" active={MonthID == "10"}>
                            October
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="11" active={MonthID == "11"}>
                            November
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="12" active={MonthID == "12"}>
                            December
                          </Dropdown.Item>
                        </SplitButton>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card performance-graph custom-header">
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-6">
                              <p>
                                <b>Orders</b>
                              </p>
                              <p>
                                <span className="item_text">
                                  {DashboarData?.order_graph?.total_order}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-6 col-6 text-right">
                              <p>
                                <b>Total Sales</b>
                              </p>
                              <p>
                                <span className="item_text">
                                  {DashboarData?.order_graph?.total_revenue}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          {DashboarData?.order_graph?.data ? (
                            <Line
                              data={DashboarData?.order_graph?.data}
                              options={options}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mobile-margin-top5">
                      <div className="card performance-graph custom-header">
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-7">
                              <p>
                                <b>Product Unavailability</b>
                              </p>
                              <p>
                                <span className="item_text">
                                  {
                                    DashboarData?.product_unavailable_graph
                                      ?.item
                                  }
                                </span>
                                <span className="item ml-1">
                                  instances / Items
                                </span>
                              </p>
                            </div>
                            <div className="col-md-6 col-5 text-right">
                              <p>
                                <b>Percantage</b>
                              </p>
                              <p>
                                <span className="item_text">
                                  {
                                    DashboarData?.product_unavailable_graph
                                      ?.percantage
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          {DashboarData?.product_unavailable_graph?.data ? (
                            <Line
                              data={
                                DashboarData?.product_unavailable_graph?.data
                              }
                              options={options}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row  mt-5">
                    <div className="col-md-6 mb-5">
                      <div className="card performance-graph custom-header">
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-6">
                              <p>
                                <b>Product Performance</b>
                              </p>
                              <p></p>
                            </div>
                            <div className="col-md-6 col-6 text-right">
                              <p>
                                <b>Items Offered</b>
                              </p>
                              <p>
                                <span className="item_text">
                                  {DashboarData?.product_performace_graph?.item}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          {DashboarData?.product_performace_graph?.data ? (
                            <Bar
                              data={
                                DashboarData?.product_performace_graph?.data
                              }
                              options={options}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OverallPerformance;
