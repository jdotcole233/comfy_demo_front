import React, { useState } from "react";
import { BASE_URL_LOCAL } from "../../../graphql";
import { getFlexibleName } from "../components/Note";

const PreviewClosing = ({ treaty, re_broker_treaties_participation_id }) => {
  const treaty_id = treaty?.treaty_id;
  const isProp = treaty?.treaty_program?.treaty_type === "PROPORTIONAL";
  const [treaty_account_id, setNote] = useState("");

  const encoded = Buffer.from(
    JSON.stringify({
      treaty_id,
      treaty_account_id,
      re_broker_treaties_participation_id,
    })
  ).toString("base64");
  const url = `${BASE_URL_LOCAL}/treaty_broker_closings/${encoded}`;
  return (
    <div className="">
      {/* {rebroker_id} */}
      {isProp && (
        <div className="">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="Statement Type">Quarter</label>
              <select
                onChange={(e) => setNote(e.target.value)}
                className="form-control"
                name="statement_type"
                id="statement_type"
              >
                <option value="">Select ...</option>
                {treaty?.treaty_accounts?.map((note, key) => (
                  <option key={key} value={note?.treaty_account_id}>
                    {getFlexibleName(note?.account_periods)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <iframe src={url} width="100%" height={window.innerHeight - 100}></iframe>
    </div>
  );
};

export default PreviewClosing;
