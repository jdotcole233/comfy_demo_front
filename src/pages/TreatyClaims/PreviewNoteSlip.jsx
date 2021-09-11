/* eslint-disable react/jsx-no-target-blank */
import React, { useMemo } from "react";
import { BASE_URL_LOCAL } from "../../graphql";
import { money } from "../../utils";
import PreviewLogo from "components/PreviewLogo";
import "./styles/TreatyClams.css";
// const showDate = (offer) => {
//     const from = new Date(offer?.offer_detail?.period_of_insurance_from)
//     const to = new Date(offer?.offer_detail?.period_of_insurance_to)
//     return <h1 className="dark-text-value">{`${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}`} {" - "} {`${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`}</h1>
// }

const PreviewNoteSlip = ({ claim, participant, ...props }) => {
  const limit = useMemo(() => {
    if (participant && participant.treaty) {
      const __limit = JSON.parse(participant?.treaty?.layer_limit || "[]");
      const _actualLimit = __limit[parseInt(claim?.layer_number) - 1];
      return _actualLimit?.limit;
    }
    return "N/A";
  }, [participant, claim]);

  const balDueReinsurers =
    parseFloat(claim?.claim_paid) - parseFloat(claim?.expected_deductible);
  const multiplier = isNaN(balDueReinsurers)
    ? 0
    : balDueReinsurers > parseFloat(limit)
    ? parseFloat(limit)
    : balDueReinsurers;

  const balDueYou =
    (parseFloat(participant?.treaty_participation_percentage) / 100) *
    multiplier;

  const url = `${BASE_URL_LOCAL}/treaty_claim_debit_note/${Buffer.from(
    JSON.stringify({
      treaty_id: participant?.treaty?.treaty_id,
      treaty_participant_id: participant?.treaty_participation_id,
      paged: 0,
    })
  ).toString("base64")}`;

  return (
    <>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_claim_debit_note/${btoa(
            JSON.stringify({
              treaty_id: participant?.treaty?.treaty_id,
              treaty_participant_id: participant?.treaty_participation_id,
              paged: props.currentStep,
            })
          )}`}
          className="btn mr-2 btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save single
        </a>
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_claim_debit_note/${btoa(
            JSON.stringify({
              treaty_id: participant?.treaty?.treaty_id,
              treaty_participant_id: participant?.treaty_participation_id,
              paged: 0,
            })
          )}`}
          className="btn btn-sm btn-info w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save all
        </a>
      </div>
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        // className="preview-card container-fluid text-black bg-white"
        src={url}
        frameborder="0"
      ></iframe>
      {/* <div className=" container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-12 col-12">
            <h3
              style={{ color: "#000" }}
            >{`${props.currentStep}/${props.totalSteps}`}</h3>
          </div>
          <PreviewLogo />
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="col-md-2 col-6"
          ></div>
        </div>
        <div className="p-2">
          <Row
            label="REINSURER"
            value={participant?.reinsurer?.re_company_name}
          />

          <div className="row">
            <div className="col-md-12 t_t_h">
              SURPULUS TREATY CLAIM DEBIT NOTE NUMBER :{" "}
              {participant?.treaty?.treaty_reference}
            </div>
          </div>

          <Row
            label="REINSURED"
            value={participant?.treaty?.insurer?.insurer_company_name}
          />
          <Row label="INSURED" value={claim?.insured_name} />
          <Row
            label="COVER"
            value={participant?.treaty?.treaty_program?.treaty_name}
          />
          <Row label="DATE OF LOSS" value={claim?.date_of_loss} />
          <Row label="CURRENCY" value={participant?.treaty?.currency} />
          <Row label="LAYER" value={claim?.layer_number} />
        </div>

        <div className="p-2">
          <h5 className="t_t_h_H">
            the claim was apportioned and settled as follows:
          </h5>
          <div
            className="t_t_v"
            dangerouslySetInnerHTML={{ __html: claim?.treaty_comment }}
          ></div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Cover</div>
            <div className="col-md-5 t_t_v">{money(parseFloat(limit))}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">
              {participant?.treaty?.insurer?.insurer_company_name} Claim
              liability
            </div>
            <div className="col-md-5 t_t_v">
              {money(parseFloat(claim?.claim_paid))}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">
              {participant?.treaty?.insurer?.insurer_company_name} Deductible
            </div>
            <div className="col-md-5 t_t_v">
              ({money(parseFloat(claim?.expected_deductible))})
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Balance Due From Reinsurers</div>
            <div className="col-md-5 t_t_v">
              {isNaN(balDueReinsurers) ? "N/A" : money(balDueReinsurers)}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Your Participation</div>
            <div className="col-md-5 t_t_v">
              {participant?.treaty_participation_percentage}%
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Balance Due from you</div>
            <div className="col-md-5 t_t_v">{money(balDueYou)}</div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PreviewNoteSlip;

const Row = ({ label, value }) => {
  return (
    <div className="row mt-2 mb-2">
      <div className="col-md-6 t_t_h">{label}</div>
      <div className="col-md-6 t_t_v">{value}</div>
    </div>
  );
};
