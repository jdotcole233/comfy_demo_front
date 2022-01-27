import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CurrencyValues, OverViewCard } from "../../../components";

const InsurerStatsFac = ({ insurer }) => {
  const type = useSelector((state) => state.insurer.type);

  // return null;

  return type !== "Fac" ? null : (
    <Fragment>
      <div className="row">
        <OverViewCard className="col-md-12" title="Total Fac. Premium" data={JSON.parse(
          insurer?.insurer_overview?.total_fac_premium ?? "{}"
        )} />
        <OverViewCard className="col-md-12" title="Total Brokerage" data={JSON.parse(
          insurer?.insurer_overview?.total_brokerage_amt ?? "{}"
        )} />
      </div>
    </Fragment>
  );
};

export default InsurerStatsFac;
