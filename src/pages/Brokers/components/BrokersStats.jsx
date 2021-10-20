import React from "react";
import { Fragment } from "react";
import { useBrokerContext } from "../provider/BrokerProvider";

const BrokersStats = ({ associates = 0 }) => {
  const { brokers } = useBrokerContext();
  return (
    <Fragment>
      <div className="col-xl-12 mt-">
        <div className="row">
          <div className="col-md-6">
            <div className="card mini-stats-wid">
              <div className="card-body">
                <div className="media">
                  <div className="media-body">
                    <p className="text-muted font-weight-medium">
                      Total number of Brokers
                    </p>
                    <h4 className="mb-0">{brokers.length}</h4>
                  </div>

                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                    <span className="avatar-title">
                      <i className="bx bx-copy-alt font-size-24"></i>
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
                      Total number of Associates
                    </p>
                    <h4 className="mb-0">{brokers?.reduce((pV, cV) => pV + cV?.re_broker_associates?.length || 0, 0)}</h4>
                  </div>

                  <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-primary">
                      <i className="bx bx-archive-in font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BrokersStats;
