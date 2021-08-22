import React, { useState } from "react";
import { getFlexibleName } from "../../Insurers/components/Note";
import { mergeTwoArrays } from "../TreatyDebitNotes";
import CreditNoateSurplus from "./CreditNoateSurplus";
import TreatyPortfolioStatement from "./TreatyPortfolioStatement";
import TreatySurplusStatement from "./TreatySurplusStatement";

const Statements = ({ treaty, reinsurer }) => {
  const [note, setNote] = useState(undefined);
  const [statement, setStatement] = useState("");

  const chooseNote = (id) => {
    const note = treaty?.treaty_accounts?.find(
      (el) => el?.treaty_account_id === id
    );
    setNote(note);
  };

  const portfolioCond = treaty?.treaty_accounts?.length >= 4;

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className={`${
            statement === "Portfolio Statement" ? "col-md-12" : "col-md-6"
          }`}
        >
          <div className="form-group">
            <label htmlFor="Statement Type">Notes</label>
            <select
              onChange={(e) => setStatement(e.target.value)}
              className="form-control"
              name="statement_type"
              id="statement_type"
            >
              <option value="">Select ...</option>
              <option value="Treaty Statement">Treaty Statement</option>
              <option value="Credit Note">Credit Note</option>
              {portfolioCond && (
                <option value="Portfolio Statement">Portfolio Statement</option>
              )}
            </select>
          </div>
        </div>
        {statement !== "Portfolio Statement" && (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Statement Type">Quarter</label>
              <select
                disabled={!statement}
                onChange={(e) => chooseNote(e.target.value)}
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
        )}
      </div>

      {statement === "Portfolio Statement" && (
        <TreatyPortfolioStatement reinsurer={reinsurer} treaty={treaty} />
      )}

      {statement === "Treaty Statement" && note && (
        <TreatySurplusStatement
          reinsurer={reinsurer}
          treaty={treaty}
          note={note}
          surpluses={mergeTwoArrays(
            JSON.parse(treaty?.layer_limit ?? "[]"),
            note?.treaty_account_deduction
          )}
        />
      )}
      {statement === "Credit Note" && note && (
        <CreditNoateSurplus
          reinsurer={reinsurer}
          treaty={treaty}
          note={note}
          surpluses={mergeTwoArrays(
            JSON.parse(treaty?.layer_limit ?? "[]"),
            note?.treaty_account_deduction
          )}
        />
      )}
    </div>
  );
};

export default Statements;
