import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";

const PreviewClosing = ({ treaty_id, rebroker_id }) => {
  const encoded = Buffer.from(
    JSON.stringify({
      treaty_id,
      treaty_account_id: "",
      re_broker_id: rebroker_id,
    })
  ).toString("base64");
  const url = `${BASE_URL_LOCAL}/treaty_broker_closings/${encoded}`;
  return (
    <div className="">
      {/* {rebroker_id} */}
      <iframe src={url} width="100%" height={window.innerHeight - 100}></iframe>
    </div>
  );
};

export default PreviewClosing;
