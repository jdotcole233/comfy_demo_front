import React from "react";
import StepWizard from "react-step-wizard";
import TreatyStatement from "./TreatyStatement";

const getShare = (shares, participant_id, uuid) => {
  const share = shares.find(
    (el) =>
      el.treaty_participationstreaty_participation_id === participant_id &&
      el.uuid === uuid
  );

  return share ? share.share : {};
};

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
          share={getShare(
            note?.treaty_participant_deduction,
            reinsurer?.treaty_participation_id,
            surplus?.surpulus_uuid
          )}
          isFleet
        />
      ))}
    </StepWizard>
  );
};

export default TreatySurplusStatement;
