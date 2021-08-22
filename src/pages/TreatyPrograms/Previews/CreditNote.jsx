/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "../styles/preview.css";
import { BASE_URL_LOCAL } from "../../../graphql";
import moment from "moment";
import { getFlexibleName } from "../../Insurers/components/Note";
import PreviewLogo from "../../../components/PreviewLogo";

const cashBalance = (grossPremium, commission, nic, wth) => {
  const result =
    parseFloat(grossPremium) -
    (parseFloat(commission) + parseFloat(nic) + parseFloat(wth));
  return result;
};

const getShare = (shares, participant_id, uuid) => {
  const share = shares.find(
    (el) =>
      el.treaty_participationstreaty_participation_id === participant_id &&
      el.uuid === uuid
  );
  if (share) {
    return share;
  }
  return null;
};

export const money = (value) =>
  value?.toLocaleString(undefined, { maximumFractionDigits: 2 });

const CreditNote = ({
  surplus = {},
  note = {},
  treaty = {},
  reinsurer = {},
  isFleet,
  ...props
}) => {
  // const deduction = note?.treaty_account_deduction
  const share = getShare(
    note?.treaty_participant_deduction,
    reinsurer?.treaty_participation_id,
    surplus?.surpulus_uuid
  );

  const cashBal = cashBalance(
    surplus?.gross_premium,
    share?.brokerage_amount,
    share?.commission_amount,
    note?.claim_settled
  );

  const finalAmmount =
    parseFloat(share?.treaty_participation_share) -
    (parseFloat(share?.nic_levy_amount) +
      parseFloat(share?.withholding_tax_amount));

  return (
    <>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/generate_treaty_credit_note/${btoa(
            JSON.stringify({
              participant_id: reinsurer?.treaty_participation_id,
              treaty_account_id: note?.treaty_account_id,
              type: 0,
            })
          )}`}
          id="Hello There"
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
          <PreviewLogo />
          <div
            className="col-md-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
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
              {cashBal < 0 ? "Debit Note" : "Credit Note"}
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
                  {treaty?.treaty_program?.treaty_name}
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
                <h3 className="dark-text-value">{treaty?.currency}</h3>
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
                  Commission {treaty?.treaty_deduction.commission}%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(share?.commission_amount)}
                </h3>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  Brokerage {treaty?.treaty_deduction.brokerage}%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(share?.brokerage_amount)}
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
                <h3 className="dark-text">Cash Balance 100%:</h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {cashBal < 0 ? "(" : ""}
                  {money(cashBal)}
                  {cashBal < 0 ? ")" : ""}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  Your {reinsurer?.treaty_participation_percentage}% share:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(Math.abs(share?.treaty_participation_share))}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  NIC Contribution {treaty?.treaty_deduction.nic_levy}%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(share?.nic_levy_amount)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  Withholding Tax {treaty?.treaty_deduction.withholding_tax}%:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(share?.withholding_tax_amount)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text">
                  AMOUNT DUE {cashBal < 0 ? "FROM" : "TO"} YOU:
                </h3>
              </div>
              <div className="col-md-6 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {money(Math.abs(finalAmmount))}
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

export default CreditNote;
