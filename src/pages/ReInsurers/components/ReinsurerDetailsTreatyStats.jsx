import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CurrencyValues } from "../../../components";

const ReinsurerDetailsTreatyStats = ({ overview }) => {
  const type = useSelector((state) => state.reinsurer.type);
  return type === "Treaty" ? (
    <Fragment>
      <div className="row">
        <div className="col-md-4">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">
                    Unpaid Treaties
                  </p>
                  <h4 className="mb-0">
                    {overview?.treaties_overview?.total_unpaid_treaties}
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
                  <p className="text-muted font-weight-medium">
                    Proportional Treaties
                  </p>
                  <h4 className="mb-0">
                    {overview?.treaties_overview?.total_proportional}
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
                  <p className="text-muted font-weight-medium">
                    Nonproportional Treaties
                  </p>
                  <h4 className="mb-0">
                    {overview?.treaties_overview?.total_nonproportional}
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
        <div className="col-md-12">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">Total Revenue</p>
                  <CurrencyValues
                    data={JSON.parse(overview?.total_fac_premium || null)}
                  />
                </div>

                <div className="avatar-sm align-self-center mini-stat-icon  bg-primary">
                  <span className="avatar-title">
                    <i className="bx bx-money  font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">
                    Total Withholding Tax
                  </p>
                  <CurrencyValues
                    data={JSON.parse(overview?.total_withholding_tax || null)}
                  />
                </div>

                <div className="mini-stat-icon avatar-sm align-self-center  bg-primary">
                  <span className="avatar-title">
                    <i className="bx bx-money font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">
                    Total NIC Levy
                  </p>
                  <CurrencyValues
                    data={JSON.parse(overview?.total_nic_tax || null)}
                  />
                </div>

                <div className="mini-stat-icon avatar-sm align-self-center  bg-primary">
                  <span className="avatar-title">
                    <i className="bx bx-money font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : null;
};

export default ReinsurerDetailsTreatyStats;
