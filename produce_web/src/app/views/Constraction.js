import React from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { PageIllustration } from "../assets";

const Constraction = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="col-md-12 mt-5 w-35 img">
          <img src={PageIllustration} className="img-fluid p-l-h" alt="..." />
        </div>
        <div className="w-73">
          <h5 className="text-success text-center">Site Under Construction</h5>
        </div>
        <div className="mt-5 text-center font-weight">
          <h5 className="font-weight">
            We will be back soon! Currently updating our software for new and
            exciting things!
          </h5>
        </div>
      </div>
    </>
  );
};

export default Constraction;
