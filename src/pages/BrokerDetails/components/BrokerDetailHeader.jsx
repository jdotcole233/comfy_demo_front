import React from "react";
import { Link } from "react-router-dom";

const BrokerDetailHeader = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Broker Deatil</h4>

            <div className="page-title-right row">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/admin/brokers">Brokers</Link>
                </li>
                <li className="breadcrumb-item active">Broker session</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailHeader;
