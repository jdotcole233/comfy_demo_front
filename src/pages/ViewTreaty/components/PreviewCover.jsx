import React from "react";
import { Fragment, useState } from "react";
import { Drawer } from "../../../components";
import PlacingSlipAndCoverDocument from "./PlacingSlipAndCoverDocument";
import SendCoverNote from "./SendCoverNote";

const PreviewCover = ({ treaty }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMailbox, setShowMailbox] = useState(false);
  const approved = treaty?.approval_status === "APPROVED";
  return (
    <Fragment>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span className="card-title">Cover note</span>

          <span
            style={{ letterSpacing: 5, padding: 3 }}
            className={`badge badge-soft-${approved
              ? "success"
              : "danger"
              } font-size-11`}
          >
            {treaty?.approval_status}
          </span>

        </div>
        <div className="card-body row">
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-sm w-md mr-2 btn-primary"
          >
            Preview cover note
          </button>
          <button
            disabled={!approved}
            onClick={() => setShowMailbox(true)}
            className="btn btn-sm w-md btn-success"
          >
            Send cover note
          </button>
        </div>
      </div>

      <Drawer
        isvisible={showMailbox}
        setShow={setShowMailbox}
        toggle={() => setShowMailbox(false)}
      >
        <SendCoverNote {...{ treaty }} />
      </Drawer>

      <Drawer
        isvisible={showPreview}
        width="50%"
        toggle={() => setShowPreview(false)}
        setShow={setShowPreview}
      >
        <PlacingSlipAndCoverDocument
          {...{ treaty_id: treaty?.treaty_id, doc_type: "COVER" }}
        />
      </Drawer>
    </Fragment>
  );
};

export default PreviewCover;
