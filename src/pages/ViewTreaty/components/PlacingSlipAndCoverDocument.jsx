import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";

const PlacingSlipAndCoverDocument = ({ treaty_id, doc_type }) => {
  const _xl = Buffer.from(JSON.stringify({ treaty_id, doc_type })).toString(
    "base64"
  );
  const url = `${BASE_URL_LOCAL}/treaty_placing_cover_note/${_xl}`;
  return (
    <div>
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        src={url}
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default PlacingSlipAndCoverDocument;
