import React from "react";
import BrokerDetailHeader from "./components/BrokerDetailHeader";
import BrokerDetailWelcome from "./components/BrokerDetailWelcome";

const BrokerDetails = () => {
  return (
    <div className="page-content">
      <BrokerDetailHeader />
      <div className="row">
        <div className="col-xl-4">
          {/* Welcome */}
          <BrokerDetailWelcome />

          {/* Other Section */}
        </div>
      </div>
    </div>
  );
};

export default BrokerDetails;
