import React from "react";
import { Fragment, useState } from "react";
import { Drawer } from "../../../components";
import PlacingSlipAndCoverDocument from "./PlacingSlipAndCoverDocument";
import SendCoverNote from "./SendCoverNote";

const PreviewCover = ({ treaty }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMailbox, setShowMailbox] = useState(false);
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Cover note</span>
        </div>
        <div className="card-body row">
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-sm w-md mr-2 btn-primary"
          >
            Preview cover note
          </button>
          <button
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
