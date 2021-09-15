import React from "react";
import { Fragment, useState } from "react";
import { Drawer } from "../../../components";
import PlacingSlipAndCoverDocument from "./PlacingSlipAndCoverDocument";

const PreviewPlacing = ({ treaty }) => {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Placing slip</span>
        </div>
        <div className="card-body row">
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-sm w-md mr-2 btn-primary"
          >
            Preview placing slip
          </button>
          <button className="btn btn-sm w-md btn-success">
            Send placing slip
          </button>
        </div>
      </div>

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
