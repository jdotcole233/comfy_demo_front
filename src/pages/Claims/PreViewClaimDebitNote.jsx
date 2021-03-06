/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from "react";
import "./styles/preview.css";
import { BASE_URL_LOCAL } from "../../graphql";
import PreviewLogo from "../../components/PreviewLogo";

function PreviewClaimDebitNote({ offer, shares, claim }) {
  const showDate = (offer) => {
    if (!offer?.offer_detail?.period_of_insurance_from) return "TBA";
    const from = new Date(offer?.offer_detail?.period_of_insurance_from);
    const to = new Date(offer?.offer_detail?.period_of_insurance_to);
    return `${from.getDate()}/${
      from.getMonth() + 1
    }/${from.getFullYear()} ${to.getDate()}/${
      to.getMonth() + 1
    }/${to.getFullYear()}`;
  };
  return (
    <Fragment>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/claimdebitnote/${btoa(
            JSON.stringify({
              offer_id: offer?.offer_id,
              reinsurer_id: shares?.reinsurer_id,
              offer_claim_participant_id: shares?.offer_claim_participant_id,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div>
      <div
        style={{ boxShadow: "1px 2px 2px 5px #f2f2f2" }}
        className="preview-card container-fluid p-4 text-black bg-white"
      >
        <PreviewLogo />
        <div className="row">
          <div className="col-md-6 col-6"></div>
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img width={100} height={100} src={require("../../assets/logo.png")} alt="company name" /> */}
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              KEK RE: FACULTATIVE CLAIM DEBIT NOTE
            </h3>
          </div>
          <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">REINSURER:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {shares?.re_company_name.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">
                  FACULTATIVE CLAIM DEBIT NOTE NUMBER:
                </h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.offer_detail?.policy_number?.toUpperCase()}
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
            {offer?.offer_retrocedent && (
              <div className="row mb-2">
                <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                  <h3 className="dark-text">Retrocedent:</h3>
                </div>
                <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                  <h3 className="dark-text-value">
                    {offer?.offer_retrocedent?.reinsurer?.re_company_name}
                  </h3>
                </div>
              </div>
            )}
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">INSURED :</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.offer_detail.insured_by.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">COVER:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.classofbusiness.business_name
                    .toUpperCase()
                    .replace("FLEET", "")}
                </h3>
              </div>
            </div>
            {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(
              offer?.classofbusiness.business_name
            ) && (
              <div className="row mb-2">
                <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                  <h3 className="dark-text">REGISTRATION:</h3>
                </div>
                <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
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
              <div className="col-md-6 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">DATE OF LOSS:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">{showDate(offer)}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">CURRENCY:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.offer_detail.currency}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-10 col-sm-12 ml-md-4">
            <div className="mt-3 mb-2">
              <h3 style={{ color: "#000", fontSize: 18 }}>
                Claim apportioned and settled as follows:{" "}
              </h3>
            </div>
            <div
              className="row mb-2"
              dangerouslySetInnerHTML={{ __html: claim?.claim_comment }}
            ></div>
            <div className="row mb-2">
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text"> Claim amount :</h3>
              </div>
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text-value">{claim?.claim_amount}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text"> Your participation :</h3>
              </div>
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text-value">
                  {shares?.offer_participant_percentage}% of 100.00%
                </h3>
              </div>
            </div>
            <div className="row mb-2 border-bottom border-bottom-2">
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text" style={{ fontWeight: "bolder" }}>
                  Balance Due from you:
                </h3>
              </div>
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3
                  className="dark-text-value"
                  style={{ fontWeight: "bolder" }}
                >
                  {shares?.claim_share}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PreviewClaimDebitNote;
