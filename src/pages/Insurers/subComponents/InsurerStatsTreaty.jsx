import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CurrencyValues } from "../../../components";

const InsurerStatsTreaty = ({ insurer }) => {
  const type = useSelector((state) => state.insurer.type);
  // return null;
  return type !== "Treaty" ? null : (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">
                    Total Brokerage
                  </p>
                  <CurrencyValues
                    data={JSON.parse(
                      insurer?.insurer_overview?.treaties_overview
                        ?.total_brokerage_amt
                    )}
                  />
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
    </Fragment>
  );
};

export default InsurerStatsTreaty;
