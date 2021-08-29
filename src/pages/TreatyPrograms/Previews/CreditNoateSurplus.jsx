import React from "react";
import StepWizard from "react-step-wizard";
import CreditNote from "./CreditNote";

const CreditNoateSurplus = ({
  surpluses = [],
  note = {},
  treaty = {},
  reinsurer = {},
}) => {
  return (
    <StepWizard>
      {surpluses.map((surplus, key) => (
        <CreditNote
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

export default CreditNoateSurplus;
