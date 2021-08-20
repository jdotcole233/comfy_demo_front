/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "../styles/preview.css";
import { BASE_URL_LOCAL } from "../../../graphql";
import moment from "moment";
import { getFlexibleName } from "../../Insurers/components/Note";
import { toPosition } from "../../../utils";
import PreviewLogo from '../../../components/PreviewLogo'

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
  const cashBal = cashBalance(
    surplus?.gross_premium,
    surplus?.commission_amount,
    note?.claim_settled,
    note?.cash_loss
  );

  const note_details = JSON.parse(note?.exchange_rate || "{}");

  return (
    <>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_debit_note/${btoa(
            JSON.stringify({
              treaty_account_id: note?.treaty_account_id,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div>
      <div className="preview-card container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-6 col-6">
            {isFleet && (
              <h3
                style={{ color: "#000" }}
              >{`${props.currentStep}/${props.totalSteps}`}</h3>
            )}
          </div>
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              width={100}
              height={100}
              src={require("../../../assets/logo.png")}
              alt="company name"
            />
          </div>
          <PreviewLogo />
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
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Date:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {moment().format("Do MMMM, YYYY")}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Ceding Company:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {treaty?.insurer?.insurer_company_name}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Treaty:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {treaty?.treaty_program?.treaty_name} -{" "}
                  {toPosition(props.currentStep.toString())}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Period:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {moment(treaty?.treaty_deduction?.treaty_period_from).format(
                    "Do MMMM, YYYY"
                  )}{" "}
                  to{" "}
                  {moment(treaty?.treaty_deduction?.treaty_period_to).format(
                    "Do MMMM, YYYY"
                  )}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Account:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text">
                  {getFlexibleName(note?.account_periods)},
                  {moment(treaty?.treaty_deduction?.treaty_period_from).format(
                    "YYYY"
                  )}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Currency:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {note_details?.currency || treaty?.currency}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Gross Premium:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(surplus?.gross_premium)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  Commission {surplus?.commission}%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(surplus?.commission_amount)}
                </h3>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">Claims Settled:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(note?.claim_settled)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  {cashBal < 0 ? "Amount Due You" : "Cash Balance"} 100%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {cashBal < 0 ? "(" : ""}
                  {money(Math.abs(cashBal))}
                  {cashBal < 0 ? ")" : ""}
                </h3>
              </div>
            </div>
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
