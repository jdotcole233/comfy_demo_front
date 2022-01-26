import React from "react";
import { useSelector } from "react-redux";

const InsurerDetailsStatsFac = ({ insurer }) => {
  const type = useSelector((state) => state.insurer.type);
  return type !== "Fac" ? null : (
    <div className="row">
      <div className="col-md-4">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="media-body">
                <p className="text-muted font-weight-medium">Closed Offers</p>
                <h4 className="mb-0">
                  {insurer?.insurer_overview?.total_closed ?? 0}
                  {/* {JSON.stringify(insurer)} */}
                </h4>
              </div>

              <div className="mini-stat-icon avatar-sm align-self-center  bg-primary">
                <span className="avatar-title">
                  <i className="bx bx-check-circle font-size-24"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="media-body">
                <p className="text-muted font-weight-medium">Pending Offers</p>
                <h4 className="mb-0">
                  {insurer?.insurer_overview?.total_pending ?? 0}
                </h4>
              </div>

              <div className="avatar-sm align-self-center mini-stat-icon  bg-primary">
                <span className="avatar-title">
                  <i className="bx bx-hourglass font-size-24"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="media-body">
                <p className="text-muted font-weight-medium">Unpaid Offers</p>
                <h4 className="mb-0 text-primary">
                  {insurer?.insurer_overview?.total_unpaid}
                </h4>
              </div>

              <div className="avatar-sm align-self-center mini-stat-icon  bg-primary">
                <span className="avatar-title">
                  <i className="bx bx-money font-size-24"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurerDetailsStatsFac;
