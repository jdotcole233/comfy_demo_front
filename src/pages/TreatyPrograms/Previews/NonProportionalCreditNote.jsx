/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";

const NonProportionalClosingNote = ({
  layer,
  treaty,
  layer_number,
  reinsurer,
  reinsurers = [],
  insurer,
}) => {
  console.log("reinsurers", reinsurers);

  return (
    <>
      {/* <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_np_credit_note/${btoa(
            JSON.stringify({
              participant_id: reinsurer?.treaty_participation_id,
              limit: layer?.limit,
              layer: layer_number,
              uuid: layer?.uuid,
              m_and_d_premium: layer?.m_and_d_premium,
              total_participation_percentage:
                reinsurer?.treaty_participation_percentage,
              installment_type: layer?.installment_type,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div> */}
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        title="Non-Proportional Credit Note"
        src={`${BASE_URL_LOCAL}/treaty_np_credit_note/${btoa(
          JSON.stringify({
            participant_id: reinsurer?.treaty_participation_id,
            limit: layer?.limit,
            layer: layer_number,
            uuid: layer?.uuid,
            m_and_d_premium: layer?.m_and_d_premium,
            total_participation_percentage:
              reinsurer?.treaty_participation_percentage,
            installment_type: layer?.installment_type,
          })
        )}`}
        frameborder="0"
      ></iframe>
    </>
  );
};

export default NonProportionalClosingNote;
