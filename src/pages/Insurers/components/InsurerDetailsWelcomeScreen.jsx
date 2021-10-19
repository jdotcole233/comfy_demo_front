import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Drawer } from "../../../components";
import AddInsurer from "../AddInsurer";
import Reschedule from "./Reschedule";

const InsurerDetailsWelcomeScreen = ({ insurer }) => {
  const [showInsurerProfile, setShowInsurerProfile] = useState(false);
  const { type } = useSelector((state) => state.insurer);
  // const { insurer } = useInsurerProps();

  const isFac = type === "Fac";

  return (
    <Fragment>
      {/* {JSON.stringify(insurer)} */}
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
                  {insurer?.insurer_abbrv}
                </span>
              </div>
              <h5 className="font-size-15 text-truncate">
                {insurer?.insurer_company_name}
              </h5>
            </div>

            <div className="col-sm-8">
              <div className="pt-4">
                {/* Convert this to Component to handle for treaty and offer */}
                <div className="row">
                  <div className="col-6">
                    <h5 className="font-size-15">
                      {isFac
                        ? insurer?.offers?.length
                        : insurer?.insurer_overview?.treaties_overview
                            ?.total_treaties}
                    </h5>
                    <p className="text-muted mb-0">
                      {isFac ? "Offers" : "Treaties"}
                    </p>
                  </div>

                  <div className="col-6">
                    <h5 className="font-size-15">
                      {isFac
                        ? insurer?.insurer_overview?.total_paid
                        : insurer?.insurer_overview?.treaties_overview
                            ?.total_paid_treaties}
                    </h5>
                    <p className="text-muted mb-0">Paid</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setShowInsurerProfile(!showInsurerProfile)}
                    className="btn btn-primary waves-effect waves-light btn-sm mr-1"
                  >
                    View Profile <i className="mdi mdi-arrow-right ml-1"></i>
                  </button>
                  <Reschedule
                    id={insurer?.insurer_id}
                    remainders={insurer?.remainders}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Insurer */}
      <Drawer
        width="40%"
        isvisible={showInsurerProfile}
        toggle={() => setShowInsurerProfile(!showInsurerProfile)}
      >
        <AddInsurer
          view
          data={insurer}
          toggle={() => setShowInsurerProfile(!showInsurerProfile)}
        />
      </Drawer>
      {/* /end of edit insurer */}
    </Fragment>
  );
};

export default InsurerDetailsWelcomeScreen;
