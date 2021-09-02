/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import "../styles/preview.css";
import { BASE_URL_LOCAL } from "../../../graphql";
import moment from "moment";
import { getFlexibleName } from "../../Insurers/components/Note";
import { toPosition } from "../../../utils";
import PreviewLogo from "../../../components/PreviewLogo";

export const cashBalance = (
  grossPremium,
  commission,
  claim_settled,
  cash_loss = 0
) => {
  const result =
    parseFloat(grossPremium) -
    parseFloat(commission) -
    parseFloat(claim_settled) -
    parseFloat(cash_loss);
  return result;
};

const money = (value) =>
  value?.toLocaleString(undefined, { maximumFractionDigits: 2 });

const DebitNote = ({ surplus, note, treaty, offer, isFleet, ...props }) => {
  const [defualt, setDefualt] = useState(true);
  const cashBal = cashBalance(
    surplus?.gross_premium,
    surplus?.commission_amount,
    note?.claim_settled,
    note?.cash_loss
  );

  const note_details = JSON.parse(note?.exchange_rate || "{}");

  const currency =
    treaty?.treaty_program?.treaty_type === "PROPORTIONAL"
      ? JSON.parse(treaty?.treaty_details ?? "[]").find(
          (el) => el.keydetail.toLowerCase() === "currency"
        )?.value
      : treaty?.currency;

  return (
    <>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_debit_note/${btoa(
            JSON.stringify({
              treaty_account_id: note?.treaty_account_id,
              default: defualt,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div>
      <div className="col-md-12 mx-3">
        <div className="form-group d-flex align-items-center ml-2">
          <input
            style={{ width: 20, height: 20 }}
            type="checkbox"
            className="form-check-input"
            checked={defualt}
            onChange={(e) => setDefualt(e.target.checked)}
          />
          <label
            className="form-check-label ml-2 font-weight-bold font-size-16"
            htmlFor="exampleCheck1"
          >
            Default
          </label>
        </div>
      </div>
      {!defualt ? (
        <div className="col-md-12">
          <div className="alert alert-danger">
            <p></p>
          </div>
        </div>
      ) : null}
      <div className="preview-card container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-6 col-6">
            {isFleet && (
              <h3
                style={{ color: "#000" }}
              >{`${props.currentStep}/${props.totalSteps}`}</h3>
            )}
          </div>
          <PreviewLogo />
          {JSON.stringify(note_details)}
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div className="col-md-12 mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              {cashBal < 0 ? "Credit Note" : "Debit Note"}
            </h3>
          </div>
          <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
            <Row
              title="Reinsured"
              value={treaty?.insurer?.insurer_company_name}
            />
            <Row
              title="Period"
              value={`${getFlexibleName(note?.account_periods)} 
                  ${moment(treaty?.treaty_deduction?.treaty_period_from).format(
                    "YYYY"
                  )}`}
            />
            <Row title="Currency" value={note_details?.currency || currency} />
            <Row title="Account Year" value={note_details?.account_year} />
            <Row title="Cover" value={treaty?.treaty_program?.treaty_name} />
            <Row title="Our Order" />
            <Row
              title="Amount Now Due to KEKE RE"
              value={`${note_details?.currency || currency} ${money(
                Math.abs(cashBal)
              )}`}
            />
          </div>
        </div>
      </div>
      {isFleet && (
        <div className="row m-2 d-flex justify-content-between">
          <button
            className="btn btn-sm btn-primary w-md"
            onClick={props.previousStep}
          >
            Prev
          </button>
          <button
            className="btn btn-sm btn-primary w-md"
            onClick={props.nextStep}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};

export default DebitNote;

const Row = ({ title, value }) => (
  <div className="row mb-2">
    <div className="col-md-6 col-6 col-sm-4 col-4 col-xs-4">
      <h3 className="dark-text">{title}:</h3>
    </div>
    <div className="col-md-6 col-6 col-sm-8 col-8 col-xs-8">
      <h3 className="dark-text-value">{value}</h3>
    </div>
  </div>
);
