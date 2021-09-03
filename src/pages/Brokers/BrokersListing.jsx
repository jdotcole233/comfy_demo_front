import React from "react";
import { Fragment } from "react";
import Broker from "./components/Broker";

const BrokersListing = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end mt-2">
          <div className="col-md-4 mb-2 d-flex justify-content-end">
            <input
              type="text"
              //   value={search}
              //   onChange={handleSearch}
              placeholder="search"
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row m-2">
        <Broker />
      </div>
    </Fragment>
  );
};

export default BrokersListing;
