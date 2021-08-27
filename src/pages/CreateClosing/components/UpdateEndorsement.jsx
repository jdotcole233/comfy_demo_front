import React from "react";
import { Dropdown } from "react-bootstrap";
import { Drawer } from "../../../components";
import UpdateEndorsementForm from "./UpdateEndorsementForm";

function UpdateEndorsement({ endorsement, offer }) {
  const [showUpdateDrawer, setShowUpdateDrawer] = React.useState(false);
  return (
    <>
      <Dropdown.Item onClick={() => setShowUpdateDrawer(true)}>
        Edit Endorsement
      </Dropdown.Item>

      <Drawer
        width="40%"
        isvisible={showUpdateDrawer}
        toggle={() => setShowUpdateDrawer(false)}
      >
        {showUpdateDrawer && (
          <UpdateEndorsementForm
            toggle={() => setShowUpdateDrawer(false)}
            offer={offer}
            endorsement_id={endorsement?.offer_endorsement_id}
          />
        )}
      </Drawer>
    </>
  );
}

export default UpdateEndorsement;
