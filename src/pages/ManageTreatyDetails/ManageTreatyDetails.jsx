import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import { Loader } from "../../components";
import ErrorPage from "../../components/ErrorPage";
import { BASE_URL_LOCAL } from "../../graphql";
import { TREATY } from "../../graphql/queries/treaty";
import TreatyDetailsEditor from "./components/TreatyDetailsEditor";

const ManageTreatyDetails = () => {
  const { payload } = useParams();
  const url = `${BASE_URL_LOCAL}/treaty_placing_cover_note/${payload}`;
  const parsedPayload = JSON.parse(Buffer(payload, "base64").toString("ascii"));
  const [loader, setLoader] = useState(true);

  return (
    <div className="page-content">
      <div className="container-fluid">
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
