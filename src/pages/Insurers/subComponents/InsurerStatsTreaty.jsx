import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CurrencyValues, OverViewCard } from "../../../components";

const InsurerStatsTreaty = ({ insurer }) => {
  const type = useSelector((state) => state.insurer.type);
  // return null;
  return type !== "Treaty" ? null : (
    <Fragment>
      <div className="row">
        <OverViewCard className="col-md-12" title={"Total Brokerage"} data={JSON.parse(
          insurer?.insurer_overview?.treaties_overview
            ?.total_brokerage_amt
        )} />
      </div>
    </Fragment>
  );
};

export default InsurerStatsTreaty;
