import React from "react";
import { Link } from "react-router-dom";

const BrokerDetails = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">Broker Deatil</h4>

              <div className="page-title-right row">
                {/* {granted && (
                  <div className="btn-group mr-4">
                    <div
                      onClick={() => changePageType("Fac")}
                      className={`btn ${
                        type !== "Fac" ? "btn-secondary" : "btn-primary"
                      } w-lg btn-sm`}
                    >
                      <span className="bx bx-archive-in mr-4"></span>
                      Facultative
                    </div>
                    <div
                      onClick={() => changePageType("Treaty")}
                      className={`btn ${
                        type !== "Treaty" ? "btn-secondary" : "btn-primary"
                      } w-lg btn-sm`}
                    >
                      <span className="bx bx-receipt mr-4"></span>
                      Treaty
                    </div>
                  </div>
                )} */}
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/admin/re-insurers">Re-Insurers</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetails;
