import React from "react";
import { BsCollection } from "react-icons/bs";
import TreatyActions from "./TreatyActions";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SELECT_INSURER } from "../../redux/types/InsurerTypes";

export const dateBuilder = (deduction) =>
  `${moment(new Date(deduction?.treaty_period_from)).format(
    "MMMM DD, YYYY"
  )} to ${moment(new Date(deduction?.treaty_period_to)).format(
    "MMMM DD, YYYY"
  )}`;

const Treaty = ({ treaty }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPeriod =
    treaty?.treaty_associate_deductions?.length > 0
      ? dateBuilder(treaty?.treaty_associate_deductions[0])
      : "N/A";
  const insurer_id = treaty?.insurer?.insurer_id;
  const navigateToDetails = () => {
    dispatch({
      type: SELECT_INSURER,
      payload: insurer_id,
    });
    history.push({
      pathname: "/admin/insurers-details/recent",
      state: { insurer_id: insurer_id },
    });
  };

  return (
    <div className="col-md-4 align-self-stretch mb-2">
      <div className="card py-1 px-1">
        <div className="card-body">
          <div className="row">
            <div
              className={`col-md-2 d-flex justify-content-center align-items-center ${treaty?.treaty_type === "PROPORTIONAL"
                  ? "text-primary"
                  : "text-warning"
                }`}
            >
              <BsCollection size={80} />
            </div>
            <div className="col-md-10">
              <h4>{treaty?.treaty_name}</h4>
              <span
                style={{ cursor: "pointer" }}
                className=""
                onClick={navigateToDetails}
              >
                {treaty?.insurer?.insurer_company_name}
              </span>{" "}
              <br />
              <span
                style={{ letterSpacing: 5, padding: 3, fontSize: 8 }}
                className={`badge badge-soft-${treaty?.treaty_type === "PROPORTIONAL" ? "primary" : "warning"
                  } font-size-11 mb-2`}
              >
                {treaty.treaty_type}
              </span>{" "}
              <h6>{currentPeriod}</h6>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <TreatyActions treaty={treaty} />
        </div>
      </div>
    </div>
  );
};

export default Treaty;
