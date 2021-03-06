import React, { useState } from "react";
import AdjustmentStatementPreview from "../../Insurers/components/AdjustmentStatementPreview";
import CreditNote from "./NonProportionalCreditNote";

const NonProportionalStatements = ({ treaty, reinsurer, layer, reinsurers }) => {
  const layers = JSON.parse(treaty?.layer_limit || "[]");
  const [statement, setStatement] = useState("initialState");

  const adjustment_created = treaty?.treaty_np_detail?.adjustment_created;

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="Statement Type">Notes</label>
          <select
            onChange={(e) => setStatement(e.target.value)}
            className="form-control"
            name="statement_type"
            id="statement_type"
          >
            <option value="">Select ...</option>
            <option value="Closing Note">Closing Note</option>
            {/* Shows only when the adjustment statement has been submitted successfully */}
            {adjustment_created && (
              <option value="Adjustment Statement">Adjustment Statement</option>
            )}
          </select>
        </div>
      </div>
      {statement === "Closing Note" && (
        <CreditNote
          layer={layers[layer - 1]}
          layer_number={layer}
          insurer={treaty?.insurer}
          reinsurer={reinsurer}
          reinsurers={reinsurers}
          treaty={treaty}
        />
      )}

      {statement === "Adjustment Statement" && (
        <AdjustmentStatementPreview
          layer={layers[layer - 1]}
          layer_number={layer}
          insurer={treaty?.insurer}
          reinsurer={reinsurer}
          treaty={treaty}
        />
      )}
    </div>
  );
};

export default NonProportionalStatements;
