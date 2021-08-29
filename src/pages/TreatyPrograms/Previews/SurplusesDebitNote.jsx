import React from "react";
import StepWizard from "react-step-wizard";
import DebitNote from "./DebitNote";

const SurplusesDebitNote = ({ surpluses = [], note = {}, treaty = {} }) => {
  return (
    <StepWizard>
      {surpluses.map((surplus, surplusKey) => (
        <DebitNote
          treaty={treaty}
          note={note}
          key={surplusKey}
          surplus={surplus}
          isFleet
        />
      ))}
    </StepWizard>
  );
};

export default SurplusesDebitNote;
