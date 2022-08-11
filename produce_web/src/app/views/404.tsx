import React from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { PageIllustration } from "../assets";

const Location = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="col-md-12 mt-5 w-35 img">
          <img src={PageIllustration} className="img-fluid p-l-h" alt="..." />
        </div>
        <div className="w-40">
          <h5 className="text-success text-center">Need a Help?</h5>
        </div>
        <div className="mt-5 text-center font-weight">
          <h5 className="font-weight">
            Looks like somethings went wrong. Let's take you back
            <span className="text-success">
              <Link to="/" className="ml-1">
                home
              </Link>
              .
            </span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Location;
