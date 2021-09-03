import React from "react";
import BrokerDetailHeader from "./components/BrokerDetailHeader";
import BrokerDetailOtherInfo from "./components/BrokerDetailOtherInfo";
import BrokerDetailTreaties from "./components/BrokerDetailTreaties";
import BrokerDetailTreatyStats from "./components/BrokerDetailTreatyStats";
import BrokerDetailWelcome from "./components/BrokerDetailWelcome";

const BrokerDetails = () => {
  return (
    <div className="page-content">
      <BrokerDetailHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4">
            <BrokerDetailWelcome />
            <BrokerDetailOtherInfo />
          </div>
          <div className="col-xl-8">
            <BrokerDetailTreatyStats />
          </div>
          <div className="row">
            <BrokerDetailTreaties />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetails;
