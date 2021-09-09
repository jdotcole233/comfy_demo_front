/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Fragment } from "react";

const ViewBrokerProfile = () => {
  const [, setShowProfile] = useState(false);
  return (
    <Fragment>
        <a
          onClick={() => setShowProfile(true)}
          className="btn btn-primary text-white waves-effect waves-light btn-sm"
        >
          View Profile <i className="mdi mdi-arrow-right ml-1"></i>
        </a>
    </Fragment>
  );
};

export default ViewBrokerProfile;
