/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from "react";
import "../styles/preview.css";
import { BASE_URL_LOCAL } from "../../../graphql";
import { AuthContext } from "../../../context/AuthContext";
import { getCurrencyFullName } from "../../../components";
import PreviewLogo from "../../../components/PreviewLogo";
import { useLocation } from "react-router-dom";

const downloadAccess = [
  "CEO",
  "General Manager",
  // 'Finance Executive',
  "System Administrator",
];

const downloadAccessA = [
  "CEO",
  "General Manager",
  "Senior Broking Officer",
  // 'Finance Executive',
  "System Administrator",
];

function EndorsementCoverNote({ offer, index, endorsement, sign = false }) {
  const { pathname } = useLocation();

  const { state: ctx } = useContext(AuthContext);
  const showDate = (offer) => {
    const from = new Date(offer?.offer_detail?.period_of_insurance_from);
    const to = new Date(offer?.offer_detail?.period_of_insurance_to);
    return `${from.getDate()}/${
      from.getMonth() + 1
    }/${from.getFullYear()} ${to.getDate()}/${
      to.getMonth() + 1
    }/${to.getFullYear()}`;
  };

  const __condition = pathname !== "/admin/approve-closing";
  const access =
    endorsement.approval_status === "APPROVED"
      ? downloadAccessA
      : downloadAccess;
  return (
    <div style={{ fontFamily: "Times New Roman" }}>
      <div className="row m-2">
        {access.includes(ctx?.user?.position) && (
          <a
            target="_blank"
            href={`${BASE_URL_LOCAL}/contract_changes/${btoa(
              JSON.stringify({
                offer_endorsement_id: endorsement?.offer_endorsement_id,
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
        className="preview-card container-fluid text-black bg-white"
      >
        <PreviewLogo />
        <div className="row">
          <div className="col-md-12 mt-3 mb-3">
            <h4
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              ENDORSEMENT {__condition ? "NO." : ""} {index}
            </h4>
            <p
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              ATTACHING TO AND PERFORMING PART OF FACULTATIVE REINSURANCE
            </p>
          </div>
          <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">TYPE:</h3>
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
                <h3 className="dark-text">Insured :</h3>
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
                  {getCurrencyFullName(offer?.offer_detail.currency)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-12 mt-3">
            <p
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              CONTRACT CHANGES
            </p>
          </div>

          <div className="col-md-10 col-sm-12 ml-md-4">
            <div className="mt-3 mb-2">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: endorsement?.offer_endorsement_detail.offer_comment,
                }}
              ></div>
              <h6 style={{ fontWeight: "bold" }}>
                ALL OTHER TERMS AND CONDITIONS REMAIN UNCHANGED{" "}
              </h6>
            </div>
          </div>
          <div className="col-md-10 col-sm-12 ml-md-4">
            <div className="mt-3 mb-2">
              <h3
                style={{
                  color: "#000",
                  textDecoration: "underline",
                  fontSize: 18,
                }}
              >
                Securities:
              </h3>
            </div>
            {offer?.offer_participant.map((reinsurer, key) =>
              !reinsurer.offer_participant_percentage ? null : (
                <div key={key} className="row mb-2">
                  <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                    <h3 className="dark-text">
                      {reinsurer.reinsurer.re_company_name} :
                    </h3>
                  </div>
                  <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                    <h3 className="dark-text-value">
                      {reinsurer.offer_participant_percentage}% of 100.00%
                    </h3>
                  </div>
                </div>
              )
            )}
            <div className="row mb-2">
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text">Total :</h3>
              </div>
              <div className="col-md-4 col-4 col-sm-4 col-xs-4 border border-bottom-0 border-left-0 border-right-0 border-dark">
                <h3 className="dark-text-value">
                  {offer?.placed_offer}% of 100.00%
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndorsementCoverNote;
