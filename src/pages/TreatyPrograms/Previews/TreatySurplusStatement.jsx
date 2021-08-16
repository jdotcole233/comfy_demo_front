import React from "react";
import StepWizard from "react-step-wizard";
import TreatyStatement from "./TreatyStatement";

const TreatySurplusStatement = ({
  note = {},
  treaty = {},
  reinsurer = {},
  surpluses = [],
}) => {
  return (
    <StepWizard>
      {surpluses.map((surplus, key) => (
        <TreatyStatement
          key={key}
          reinsurer={reinsurer}
          treaty={treaty}
          note={note}
          surplus={surplus}
          isFleet
        />
      ))}
    </StepWizard>
  );
};

export default TreatySurplusStatement;
