import React from "react";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "../../../components";
import PlacingSlipAndCoverDocument from "./PlacingSlipAndCoverDocument";
import SendPlacingNote from "./SendPlacingNote";

const PreviewPlacing = ({ treaty }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMailbox, setShowMailbox] = useState(false);
  const { pathname } = useLocation();
  const manageUrl = `${pathname}/manage/${Buffer.from(
    JSON.stringify({
      treaty_id: treaty?.treaty_id,
      doc_type: "PLACING",
      treaty_type: treaty?.treaty_program?.treaty_type,
      treaty_reference: treaty?.treaty_reference,
    })
  ).toString("base64")}`;

  const showManageButton = treaty?.treaty_participants?.every(
    (el) => parseFloat(el.treaty_participation_percentage) > 0
  );

  return (
    <Fragment>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span className="card-title">Placing slip</span>
          {showManageButton && (
            <Link
              to={manageUrl}
              className="btn btn-primary btn-sm d-flex align-items-center"
            >
              Manage
              <i className="bx bx-edit ml-3"></i>
            </Link>
          )}
        </div>
        <div className="card-body row">
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-sm w-md mr-2 btn-primary"
          >
            Preview placing slip
          </button>
          <button
            onClick={() => setShowMailbox(true)}
            className="btn btn-sm w-md btn-success"
          >
            Send placing slip
          </button>
        </div>
      </div>

      <Drawer
        isvisible={showMailbox}
        setShow={setShowMailbox}
        toggle={() => setShowMailbox(false)}
      >
        <SendPlacingNote />
      </Drawer>

      <Drawer
        isvisible={showPreview}
        width="50%"
        toggle={() => setShowPreview(false)}
        setShow={setShowPreview}
      >
        <PlacingSlipAndCoverDocument
          {...{ treaty_id: treaty?.treaty_id, doc_type: "PLACING" }}
        />
      </Drawer>
    </Fragment>
  );
};

export default PreviewPlacing;
