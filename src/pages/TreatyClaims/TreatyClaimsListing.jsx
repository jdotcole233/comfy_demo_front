import React from "react";
import { Datatable } from "../../components";
import { columns } from "./columns";
import { useTreatyClaimsProps } from "./Providers/TreatyClaimsProvider";

function TreatyClaimsListing() {
  const { claims } = useTreatyClaimsProps();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h3>Nonproportional Treaties List</h3>
          </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
          ></div>
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-body">
            <div
              id="datatable-buttons_wrapper"
              className="dataTables_wrapper dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-sm-12">
                  <Datatable entries={5} columns={columns} data={claims} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TreatyClaimsListing;
