import React, { Fragment } from "react";
import BrokersListing from "./BrokersListing";
import BrokersHeader from "./components/BrokersHeader";
import BrokersStats from "./components/BrokersStats";

const Brokers = () => {
  return (
    <Fragment>
      <div className="page-content">
        <BrokersStats />
        <BrokersHeader />
        <BrokersListing />
      </div>
    </Fragment>
  );
};

export default Brokers;
