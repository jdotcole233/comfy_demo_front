import React from "react";
import { Link } from "react-router-dom";

const ClaimComponent = ({ data }) => {
  const [offer, setOffer] = React.useState(null);
  const [claim, setClaim] = React.useState(null);
  const [particiupants, setParticiupants] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const __offer = atob(
        JSON.parse(data.system_notification.notification_content).data
      );
      console.log(JSON.parse(__offer));
      const _offer = JSON.parse(__offer);
      setOffer(_offer.offer);
      setClaim(_offer.claim_data);
      setParticiupants(_offer.claim_participants);
    }
  }, [data]);

  return (
    <div className="container-fluid">
      <div className="">
        <div className="row alert alert-warning">
          <p>
            {JSON.parse(data.system_notification.notification_content).message}
          </p>
        </div>
      </div>
      <div className="row">
        <p>
          Offer: <strong>{offer?.policy_number}</strong>{" "}
        </p>
        <p className="mx-3">
          Offer status:{" "}
          <span
            style={{ letterSpacing: 3 }}
            className={`badge badge-${
              offer?.offer_status === "OPEN"
                ? "primary"
                : offer?.offer_status === "PENDING"
                ? "warning"
                : "success"
            } p-2 w-md`}
          >
            {offer?.offer_status}
          </span>{" "}
        </p>
      </div>
      <div className="row mb-2">
        <div className="col-md-12">
          <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
            Claim
          </p>
        </div>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>Claim amount</td>
              <td>
                {offer?.currency} {claim?.claim_amount}
              </td>
            </tr>
            <tr>
              <td>Claim date</td>
              <td>{new Date(claim?.claim_date).toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Claim Share */}
      {particiupants.length && (
        <div className="row mb-2">
          <div className="col-md-12">
            <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
              Participants share
            </p>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Reinsurer</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {particiupants.map((payment, key) => (
                <tr key={key}>
                  <td>{payment.reinsurer}</td>
                  <td>
                    {offer?.currency} {payment.claim_share}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mb-2">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>Created By</td>
              <td>
                {offer?.employee_first_name} {offer?.employee_first_name}
              </td>
            </tr>
            <tr>
              <td>Created on</td>
              <td>{offer?.offer_created_date}</td>
            </tr>
            <tr>
              <td>Class of Business</td>
              <td>{offer?.business_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row mb-2">
        <div className="col-md-12">
          <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
            Offer Details
          </p>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Policy #</th>
              <td>{offer?.policy_number}</td>
              <th>Insured By</th>
              <td>{offer?.insured_by}</td>
            </tr>
            <tr>
              <th>Period of Insurance</th>
              <td>{offer?.period_of_insurance}</td>
              <th>Reinsured</th>
              <td>{offer?.insurer_company_name}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row mb-2">
        <div className="col-md-12">
          <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
            Offer
          </p>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Fac. Premium</th>
              <td>
                {offer?.currency} {offer?.fac_premium}
              </td>

              <th>Brokerage</th>
              <td>{offer?.brokerage} %</td>
            </tr>
            <tr>
              <th>Fac. Sum Insured</th>
              <td>
                {offer?.currency} {offer?.fac_sum_insured}
              </td>
              <th>Commission</th>
              <td>{offer?.commission} %</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <Link
          to="/admin/claims"
          className="btn btn-success btn-square btn-sm w-md"
        >
          Go to Claims
        </Link>
      </div>
    </div>
  );
};

export default ClaimComponent;
