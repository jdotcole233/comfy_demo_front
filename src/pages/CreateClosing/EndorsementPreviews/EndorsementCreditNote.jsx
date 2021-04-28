/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useContext } from "react";
import "../styles/preview.css";
import { BASE_URL_LOCAL } from "../../../graphql";
import { AuthContext } from "../../../context/AuthContext";
import { getCurrencyFullName } from "../../../components";
// import { useLocation } from "react-router-dom";
import PreviewLogo from "../../../components/PreviewLogo";

const downloadAccess = [
  "CEO",
  "General Manager",
  "Senior Broking Officer",
  "System Administrator",
];

const handleSpecialCase = (offer, endorsement_id) => {
  return offer?.offer_endorsements?.findIndex(
    (el) => el.offer_endorsement_id === endorsement_id
  );
};

const getValues = (offer, size, key = "premium", endorsement_id) => {
  if (!offer) return 0.0;
  if (size < 0)
    return getValues(offer, handleSpecialCase(offer, endorsement_id) + 1); // special case for unapproved endorsement
  if (size === 1)
    return (
      parseFloat(offer.offer_endorsements[0][key]) - parseFloat(offer[key])
    );

  return (
    parseFloat(offer?.offer_endorsements[size - 1][key]) -
    parseFloat(offer?.offer_endorsements[size - 2][key])
  );
};

const downloadAccessA = ["CEO", "General Manager", "System Administrator"];

function EndorsementCreditNote({
  offer,
  reinsurer,
  index,
  endorsement,
  cc = false,
}) {
  const { state: ctx } = useContext(AuthContext);
  // const { pathname } = useLocation();
  const showDate = (offer) => {
    const from = new Date(offer?.offer_detail?.period_of_insurance_from);
    const to = new Date(offer?.offer_detail?.period_of_insurance_to);
    return `${from.getDate()}/${
      from.getMonth() + 1
    }/${from.getFullYear()} ${to.getDate()}/${
      to.getMonth() + 1
    }/${to.getFullYear()}`;
  };
  const access =
    endorsement.approval_status === "APPROVED"
      ? downloadAccess
      : downloadAccessA;

  const fac_premium =
    (parseFloat(reinsurer?.offer_participant_percentage) / 100) *
    getValues(offer, index, "premium", endorsement?.offer_endorsement_id);

  const commission =
    (parseFloat(reinsurer?.agreed_commission) / 100) * fac_premium;

  const withholding_tax =
    (parseFloat(reinsurer?.withholding_tax) / 100) * fac_premium;

  const brokerage =
    (parseFloat(reinsurer?.agreed_brokerage_percentage) / 100) * fac_premium;

  const nic_levy = (parseFloat(reinsurer?.nic_levy) / 100) * fac_premium;

  const amt_due =
    fac_premium - (commission + withholding_tax + brokerage + nic_levy);

  return (
    <Fragment>
      <div className="row m-2">
        {access.includes(ctx?.user?.position) && (
          <a
            target="_blank"
            href={`${BASE_URL_LOCAL}/endorsement_closing_note/${btoa(
              JSON.stringify({
                offer_endorsement_id: endorsement?.offer_endorsement_id,
                offer_participant_id: reinsurer?.offer_participant_id,
                doc_number: index || -1,
              })
            )}`}
            className="btn btn-sm btn-primary w-md"
          >
            <i className="bx bxs-file-pdf"></i> Save
          </a>
        )}
      </div>
      <div
        style={{ boxShadow: "1px 2px 2px 5px #f2f2f2" }}
        className="preview-card container-fluid  text-black bg-white"
      >
        <PreviewLogo />
        <div className="row">
          {/* <img className="" src={require('../../../assets/banner.png')} alt="kek letter head" /> */}
          <div className="col-md-12 text-align-center mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              ENDORSEMENT CLOSING {index}
            </h3>
          </div>

          <div className="col-md-12 ml-md-4">
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">To:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {reinsurer?.re_company_name}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Type:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.classofbusiness.business_name
                    .toUpperCase()
                    .replace("FLEET", "")
                    .toLowerCase()}
                </h3>
              </div>
            </div>
            {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(
              offer?.classofbusiness.business_name
            ) && (
              <div className="row mb-2">
                <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                  <h3 className="dark-text">REGISTRATION:</h3>
                </div>
                <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                  <h3 className="dark-text-value">
                    {
                      JSON.parse(offer?.offer_detail.offer_details).find(
                        (el) =>
                          el.keydetail === "Vehicle Reg No." ||
                          el.keydetail === "Vehicle Reg No"
                      )?.value
                    }
                  </h3>
                </div>
              </div>
            )}
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Form:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  As Original and/ Slip Policy Reins
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">Reinsured:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.insurer.insurer_company_name}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">Insured:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.offer_detail.insured_by}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">Period:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">{showDate(offer)}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">Currency:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {getCurrencyFullName(
                    offer?.exchange_rate?.ex_currency ||
                      offer?.offer_detail.currency
                  )}
                </h3>
              </div>
            </div>
          </div>
          {/* Summary of Trial Balance */}
          <div className="col-md-12">
            <table className="table table-borderless">
              <thead>
                <tr className="trial-balance-tr">
                  <th></th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="trial-balance-tr">
                  <td>100% Premium</td>
                  <td></td>
                  <td>
                    {getValues(
                      offer,
                      index,
                      "premium",
                      endorsement?.offer_endorsement_id
                    )?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Facultative Premium</td>
                  <td></td>
                  <td>
                    {fac_premium?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Less Commission ({reinsurer?.agreed_commission}%)</td>
                  <td>
                    {commission?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    }) || "NIL"}
                  </td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Brokerage ({reinsurer?.agreed_brokerage_percentage}%)</td>
                  <td>
                    {brokerage?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>NIC Levy ({reinsurer?.nic_levy}%)</td>
                  <td>
                    {nic_levy?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    }) || "NIL"}
                  </td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Withholding Tax ({reinsurer?.withholding_tax}%)</td>
                  <td>
                    {withholding_tax?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    }) || "NIL"}
                  </td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Balance Due to Reinsurers</td>
                  <td></td>
                  <td>
                    {amt_due?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Facultative Premium payable in full at inception</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td>Your reinsurance participation</td>
                  <td>100% of {reinsurer?.offer_participant_percentage}%</td>
                  <td></td>
                </tr>
                <tr className="trial-balance-tr">
                  <td className="balance">Balance Due to you </td>
                  <td className="balance"></td>
                  <td className="balance">
                    {offer?.exchange_rate?.ex_currency ||
                      offer?.offer_detail.currency}{" "}
                    {amt_due?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-5 col-8 col-sm-8 col-xs-8">
            <p className="date-text">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EndorsementCreditNote;
