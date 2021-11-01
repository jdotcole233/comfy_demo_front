import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const GeneratePaymentSchedulePluginButton = ({insurer_id = ""}) => {
    // const {pathname} = useLocation()
  return (
    <Fragment>
      <Link to={`recent/${Buffer.from(insurer_id).toString("base64")}/generate-payment-schedule`} className="btn btn-secondary ml-1 mr-1 text-white waves-effect waves-light btn-sm">
        Generate Schedule <i className="mdi mdi-arrow-right ml-1"></i>
      </Link>
    </Fragment>
  );
};

export default GeneratePaymentSchedulePluginButton;
