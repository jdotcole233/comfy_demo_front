import { Drawer } from "../../../components";
import React, { useState } from "react";
import { Fragment } from "react";
import AddBrokerForm from "./AddBrokerForm";

const BrokersHeader = () => {
  const [addBroker, setAddBroker] = useState(false);
  
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h3>Brokers List</h3>
          </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              onClick={() => setAddBroker(true)}
              className="btn btn-rounded btn-primary"
            >
              Add Broker
            </button>
          </div>
        </div>
      </div>

      {/* Add Broker drawer */}
      <Drawer
        width="40%"
        isvisible={addBroker}
        toggle={() => setAddBroker(false)}
        setShow={setAddBroker}
      >
        <AddBrokerForm  />
      </Drawer>
    </Fragment>
  );
};

export default BrokersHeader;
