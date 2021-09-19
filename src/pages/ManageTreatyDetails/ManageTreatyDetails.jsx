import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BASE_URL_LOCAL } from "../../graphql";
import TreatyDetailsEditor from "./components/TreatyDetailsEditor";

const ManageTreatyDetails = () => {
  const { payload } = useParams();
  const url = `${BASE_URL_LOCAL}/treaty_placing_cover_note/${payload}`;
  const parsedPayload = JSON.parse(Buffer(payload, "base64").toString("ascii"));
  const [loader, setLoader] = useState(true);
  const history = useHistory();

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">
                Reference Number: {parsedPayload?.treaty_reference} - Program
                Type:{" "}
                <span
                  style={{ letterSpacing: 5 }}
                  className={`badge w-md badge-soft-${
                    parsedPayload?.treaty_type === "PROPORTIONAL"
                      ? "success"
                      : "warning"
                  } p-1 font-size-11`}
                >
                  {parsedPayload?.treaty_type}
                </span>
              </h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li
                    onClick={() => history.goBack()}
                    className="breadcrumb-item link-hover"
                  >
                    <a>View Treaty</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Manage Treaty Details
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Editor here */}
            <TreatyDetailsEditor
              {...{
                parsedPayload,
                setLoader,
              }}
            />
          </div>
          <div className="col-md-6">
            {/* Preview Here */}

            <div className="card">
              <div className="card-header">
                <div className="card-title">Document preview</div>
              </div>
              <div
                className="card-body"
                // style={{ height: window.innerHeight - 100 }}
              >
                <iframe
                  src={loader ? url : ""}
                  width="100%"
                  height={window.innerHeight - 100}
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTreatyDetails;
