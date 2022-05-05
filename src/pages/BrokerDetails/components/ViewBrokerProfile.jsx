/* eslint-disable jsx-a11y/anchor-is-valid */
import { Drawer } from "../../../components";
import AddBrokerForm from "../../../pages/Brokers/components/AddBrokerForm";
import React, { useState } from "react";
import { Fragment } from "react";
import { useBrokerDetailsContext } from "../provider/BrokerDetailsProvider";

const ViewBrokerProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { broker } = useBrokerDetailsContext();
  return (
    <Fragment>
      <a
        onClick={() => setShowProfile(true)}
        className="btn btn-success text-white waves-effect waves-light btn-sm"
      >
        View Profile <i className="mdi mdi-arrow-right ml-1"></i>
      </a>

      <Drawer
        width="40%"
        isvisible={showProfile}
        toggle={() => setShowProfile(false)}
        setShow={setShowProfile}
      >
        <AddBrokerForm editing={broker} />
      </Drawer>
    </Fragment>
  );
};

export default ViewBrokerProfile;
