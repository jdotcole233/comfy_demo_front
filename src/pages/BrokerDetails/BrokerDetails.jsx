import React from "react";
import BrokerDetailHeader from "./components/BrokerDetailHeader";
import BrokerDetailOtherInfo from "./components/BrokerDetailOtherInfo";
import BrokerDetailWelcome from "./components/BrokerDetailWelcome";

const BrokerDetails = () => {
  return (
    <div className="page-content">
      <BrokerDetailHeader />
      <div className="row">
        <div className="col-xl-4">
          <BrokerDetailWelcome />
          <BrokerDetailOtherInfo />
        </div>
        <div className="col-xl-8"></div>
      </div>
    </div>
  );
};

export default BrokerDetails;
