import React from "react";
import { Datatable } from "../../../components";
import { surplusColumns } from "../../TreatyPrograms/columns";

const SurplusListing = ({ data, surpluses }) => {
  return data?.treaty?.treaty_program?.treaty_type === "PROPORTIONAL" ? (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          {/* {JSON.stringify(data?.treaty?.layer_limit)} */}
          <div className="card-body">
            <h4 className="card-title mb-4">Surpluses</h4>
            <div className="mt-4">
              <Datatable columns={surplusColumns} data={surpluses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SurplusListing;
