/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ViewBrokerProfile from "./ViewBrokerProfile";

const BrokerDetailWelcome = ({ broker, overview }) => {
  return (
    <div className="card overflow-hidden">
      <div className="bg-soft-primary">
        <div className="row">
          <div className="col-7">
            <div className="text-primary p-3">
              <h5 className="text-primary">Welcome Back !</h5>
              <p>It will seem like simplified</p>
            </div>
          </div>
          <div className="col-5 align-self-end">
            <img
              src="/assets/images/profile-img.png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="row">
          <div className="col-sm-4">
            <div className="avatar-lg mr-3 mx-lg-auto mb-4 profile-user-wid">
              <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                {broker?.re_abbrv}
              </span>
            </div>
            <h5 className="font-size-15 text-truncate">
              {broker?.re_company_name}
            </h5>
          </div>

          <div className="col-sm-8">
            <div className="pt-4">
              <div className="row">
                <div className="col-6">
                  <h5 className="font-size-15">
                    {overview?.treaties_overview?.total_treaties}
                  </h5>
                  <p className="text-muted mb-0">Treaties</p>
                </div>
                <div className="col-6">
                  <h5 className="font-size-15">
                    {overview?.treaties_overview?.total_paid_treaties}
                  </h5>
                  <p className="text-muted mb-0">Paid</p>
                </div>
              </div>
              {/* View Broker Profile */}
              <ViewBrokerProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailWelcome;
