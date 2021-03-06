import React from "react";
import { useSelector } from "react-redux";

const InsurerDetailsStatsTreaty = ({ insurer }) => {
  const type = useSelector((state) => state.insurer.type);
  return type !== "Treaty" ? null : (
    <div className="row">
      <div className="col-md-4">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="media-body">
                <p className="text-muted font-weight-medium">Unpaid Treaties</p>
                <h4 className="mb-0">
                  {
                    insurer?.insurer.insurer_overview?.treaties_overview
                      ?.total_unpaid_treaties
                  }
                </h4>
              </div>

              <div className="mini-stat-icon avatar-sm align-self-center  bg-success">
                <span className="avatar-title bg-success">
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
                <p className="text-muted font-weight-medium">
                  Proportional Treaties
                </p>
                <h4 className="mb-0">
                  {
                    insurer?.insurer.insurer_overview?.treaties_overview
                      ?.total_proportional
                  }
                </h4>
              </div>

              <div className="avatar-sm align-self-center mini-stat-icon  bg-success">
                <span className="avatar-title bg-success">
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
                <p className="text-muted font-weight-medium">
                  Nonproportional Treaties
                </p>
                <h4 className="mb-0">
                  {
                    insurer?.insurer.insurer_overview?.treaties_overview
                      ?.total_nonproportional
                  }
                </h4>
              </div>

              <div className="avatar-sm align-self-center mini-stat-icon  bg-success">
                <span className="avatar-title bg-success">
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

export default InsurerDetailsStatsTreaty;
