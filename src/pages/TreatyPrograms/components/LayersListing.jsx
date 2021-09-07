import React from "react";
import { Datatable } from "../../../components";
import { layerColumn } from "../columns";

const LayersListing = ({ data, layers }) => {
  // console.log("Listing", layers)
  return data?.treaty?.treaty_program?.treaty_type !== "PROPORTIONAL" ? (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Limit Layers</h4>
            <div className="mt-4">
              <Datatable columns={layerColumn} data={layers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LayersListing;
