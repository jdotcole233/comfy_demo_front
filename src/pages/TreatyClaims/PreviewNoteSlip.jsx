/* eslint-disable react/jsx-no-target-blank */
import React, { useMemo } from "react";
import { BASE_URL_LOCAL } from "../../graphql";
import { money } from "../../utils";
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
      // console.log("Limit", participant?.treaty?.layer_limit);
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
      <div className=" container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-12 col-12">
            <h3
              style={{ color: "#000" }}
            >{`${props.currentStep}/${props.totalSteps}`}</h3>
          </div>
          <div
            className="col-md-10 col-6"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              width={100}
              height={100}
              src={require("../../assets/logo.png")}
              alt="company name"
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="col-md-2 col-6"
          >
            <address style={{ color: "#000" }}>
              1 <sup>st</sup> Floor OmniBsic Building, <br />
              Plot 48, 49 Boundary Road East Legon. <br />
              Contact: info@visalre.com/0554859447/0265375693
              <br />
            </address>
          </div>
        </div>
        <div className="p-2 border">
          <div className="row">
            <div className="col-md-8 t_t_h">REINSURER</div>
            <div className="col-md-4 t_t_v">
              {participant?.reinsurer?.re_company_name}
            </div>
          </div>

          <div className="d-flex align-items-center t_t_h_H justify-content-center">
            DEBIT NOTE REF: {participant?.treaty?.treaty_reference}
          </div>

          <div className="row mb-2">
            <div className="col-md-8 t_t_h">REINSURED</div>
            <div className="col-md-4 t_t_v">
              {participant?.treaty?.insurer?.insurer_company_name}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">TREATY</div>
            <div className="col-md-4 t_t_v">
              {participant?.treaty?.treaty_program?.treaty_name}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">INSURED</div>
            <div className="col-md-4 t_t_v">{claim?.insured_name}</div>
          </div>
          <div className="pt-4"></div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">CURRENCY</div>
            <div className="col-md-4 t_t_v">
              {participant?.treaty?.currency}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">DATE OF LOSS</div>
            <div className="col-md-4 t_t_v">{claim?.date_of_loss}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">CLAIM NUMBER</div>
            <div className="col-md-4 t_t_v">{claim?.claim_number}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 t_t_h">LAYER</div>
            <div className="col-md-4 t_t_v">{claim?.layer_number}</div>
          </div>
        </div>

        <div className="p-4">
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
            <div className="col-md-7 t_t_h">Claim paid</div>
            <div className="col-md-5 t_t_v">
              {money(parseFloat(claim?.claim_paid))}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Claim Liability</div>
            <div className="col-md-5 t_t_v">
              {money(claim?.expected_deductible) || "N/A"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-7 t_t_h">Balance Due From Reinsurers</div>
            <div className="col-md-5 t_t_v">
              {/* Claim paid - Claim Liability */}
              {isNaN(balDueReinsurers) ? "N/A" : money(balDueReinsurers)}
            </div>
          </div>

          <div>
            <table className="table table-bordered">
              <tbody className="t_t_v">
                <tr>
                  <td>Your Participation</td>
                  <td>{participant?.treaty_participation_percentage}%</td>
                </tr>
                <tr>
                  <td>Balance Due from you</td>
                  <td>{money(balDueYou)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewNoteSlip;
