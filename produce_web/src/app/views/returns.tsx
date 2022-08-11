import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import { Notificationbellicon } from "../assets";

const Returns = () => {
  const history = useHistory();

  const UserData = useSelector(
    (state: RootStateOrAny) => state.loginReducer.data
  );

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
    });
  }, []);

  return (
    <>
      <Header highlightedItem={"returns"} />
      <div className="content">
        <div className="container">
          <h4 className="text-success mt-5 font-family">Returns</h4>
          <p className="mt-5 ml-3">Order #34834</p>
          <div className="card">
            <div className="container">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table return">
                    <thead>
                      <tr>
                        <th scope="col" className="p-4">
                          PRODUCTS
                        </th>
                        <th scope="col" className="p-4">
                          QTY
                        </th>
                        <th scope="col" className="p-4">
                          TOTAL
                        </th>
                        <th scope="col" className="p-4">
                          REASON FOR RETURN
                        </th>
                        <th scope="col" className="p-4">
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                        <td>3</td>
                        <td>$7.50</td>
                        <td className="w-25">
                          This is a sample of a note a customer can leave.This
                          is sample of a note a custmer can leave.
                        </td>
                        <td>Accepted</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="hi-w-set">
                            <button
                              type="button"
                              className="btn btn-secondary radius mt-4"
                            ></button>
                          </span>
                          <span className="mt-4 block">
                            White ButtonMushrooms
                          </span>
                        </td>
                        <td>$0.50/ct</td>
                        <td>2 for $3</td>
                        <td className="w-25">
                          This is a sample of a note a customer can leave.This
                          is sample of a note a custmer can leave.
                        </td>
                        <td>Denied</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 ml-3">Order #34834</p>
          <div className="card mb-5">
            <div className="container">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table  return">
                    <thead>
                      <tr>
                        <th scope="col">PRODUCTS</th>
                        <th scope="col">QTY</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">REASON FOR RETURN</th>
                        <th scope="col">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                        <td>3</td>
                        <td>$7.50</td>
                        <td className="w-25">
                          This is a sample of a note a customer can leave.This
                          is sample of a note a custmer can leave.
                        </td>
                        <td>Accepted</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Returns;
