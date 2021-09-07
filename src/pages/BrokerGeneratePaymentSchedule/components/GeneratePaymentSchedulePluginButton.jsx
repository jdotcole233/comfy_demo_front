import React from "react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const GeneratePaymentSchedulePluginButton = () => {
    const {pathname} = useLocation()
  return (
    <Fragment>
      <Link to={`${pathname}/generate-payment-schedule`} className="btn btn-secondary ml-1 text-white waves-effect waves-light btn-sm">
        Generate Payment Schedule <i className="mdi mdi-arrow-right ml-1"></i>
      </Link>
    </Fragment>
  );
};

export default GeneratePaymentSchedulePluginButton;
