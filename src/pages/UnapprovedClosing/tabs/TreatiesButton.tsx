import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "../../../components";
import { UnapporvedTreatyClaims_all_treaties } from "../../../graphql/queries/__generated__/unapporvedTreatyClaims";
import PlacingSlipAndCoverDocument from "../../ViewTreaty/components/PlacingSlipAndCoverDocument";
import ApprovTreaty from "./ApprovTreaty";

interface Props {
  treaty: UnapporvedTreatyClaims_all_treaties;
}

const TreatiesButton = ({ treaty }: Props) => {
  const [showApproval, setShowApproval] = useState(false);
  const [showPlacingSlip, setShowPlacingSlip] = useState(false);
  const [showCover, setShowCover] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowPlacingSlip(true)}
        className="btn btn-info btn-sm btn-square m-1"
      >
        Preview Placing
      </button>
      <button
        onClick={() => setShowCover(true)}
        className="btn btn-warning btn-sm btn-square m-1"
      >
        Preview Cover
      </button>
      <button
        onClick={() => setShowApproval(true)}
        className="btn btn-success btn-sm btn-square m-1"
      >
        Approve Treaty
      </button>
      <Link
        to={{
          pathname: "/admin/treaty-programs/overview",
          state: { treaty_id: treaty?.treaty_id },
        }}
        className="btn btn-primary btn-sm btn-square m-1"
      >
        View Treaty
      </Link>

      <Drawer
        isvisible={showApproval}
        width={"40%"}
        toggle={() => setShowApproval(false)}
        setShow={setShowApproval}
      >
        <ApprovTreaty treaty={treaty} />
      </Drawer>

      <Drawer
        isvisible={showPlacingSlip}
        toggle={() => setShowPlacingSlip(false)}
        setShow={setShowPlacingSlip}
        width={"50%"}
      >
        <PlacingSlipAndCoverDocument
          treaty_id={treaty?.treaty_id}
          doc_type={"PLACING"}
        />
      </Drawer>

      <Drawer
        isvisible={showCover}
        toggle={() => setShowCover(false)}
        setShow={setShowCover}
        width={"50%"}
      >
        <PlacingSlipAndCoverDocument
          treaty_id={treaty?.treaty_id}
          doc_type={"COVER"}
        />
      </Drawer>
    </>
  );
};

export default TreatiesButton;
