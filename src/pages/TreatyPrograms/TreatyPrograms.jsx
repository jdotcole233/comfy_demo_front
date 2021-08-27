import React from "react";
import { Loader, PageHeader } from "../../components";
import { useTreatyPrograms } from "../../context/TreatyProgramsProvider";
import CreateTreatyPrgrams from "./CreateTreatyPrgrams";
import TreatyListing from "./TreatyListing";
import TreatyProgramsOverview from "./TreatyProgramsOverview";

const TreatyPrograms = () => {
  const { loading } = useTreatyPrograms();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <PageHeader name="Treaty Programs" />
      <TreatyProgramsOverview />

      <div className="container-fluid">
        <div className="row mx-1">
          <div className="col-md-6">
            <h3>Treaty Programs</h3>
          </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CreateTreatyPrgrams />
          </div>
        </div>

        <TreatyListing />
      </div>
    </div>
  );
};

export default TreatyPrograms;
