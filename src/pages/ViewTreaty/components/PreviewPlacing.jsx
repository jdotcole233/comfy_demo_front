import React from "react";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "../../../components";
import PlacingSlipAndCoverDocument from "./PlacingSlipAndCoverDocument";

const PreviewPlacing = ({ treaty }) => {
  const [showPreview, setShowPreview] = useState(false);
  const { pathname } = useLocation();
  const manageUrl = `${pathname}/manage/${Buffer.from(
    JSON.stringify({ treaty_id: treaty.treaty_id, doc_type: "PLACING" })
  ).toString("base64")}`;
  return (
    <Fragment>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span className="card-title">Placing slip</span>
          <Link
            to={manageUrl}
            className="btn btn-primary btn-sm d-flex align-items-center"
          >
            Manage
            <i className="bx bx-edit ml-3"></i>
          </Link>
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
