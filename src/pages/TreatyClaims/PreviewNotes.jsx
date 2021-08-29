import React, { useMemo } from "react";
import StepWizard from "react-step-wizard";
import PreviewNoteSlip from "./PreviewNoteSlip";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

const PreviewNotes = ({ participant, treaty }) => {
  const treaties = useMemo(() => {
    if (participant && participant.treaty_claims) {
      return participant.treaty_claims;
    }
    return [];
  }, [participant]);

  return _.isEmpty(treaties) ? (
    <NoSlip />
  ) : (
    <StepWizard nav={<CoolNav />}>
      {treaties.map((el, key) => (
        <PreviewNoteSlip
          participant={participant}
          treaty={treaty}
          claim={el}
          key={key}
        />
      ))}
    </StepWizard>
  );
};

export default PreviewNotes;

const CoolNav = ({ ...props }) => {
  return (
    <div className="row m-2 d-flex justify-content-between">
      {props.currentStep > 1 && (
        <button className="btn btn-sm  w-md" onClick={props.previousStep}>
          <IoIosArrowBack size={30} />
        </button>
      )}
      {props.currentStep < props.totalSteps && (
        <button className="btn btn-sm  w-md" onClick={props.nextStep}>
          <IoIosArrowForward size={30} />
        </button>
      )}
    </div>
  );
};

const NoSlip = () => (
  <div className="h-full">
    <h4>No Claims Made Yet</h4>
  </div>
);
