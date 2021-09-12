import { Drawer } from "../../../components";
import React from "react";
import { Fragment, useState } from "react";
import CreateTreatyBroadCastList from "./CreateTreatyBroadCastList";
import CreateTreatyBrokersList from "../brokercomponents/CreateTreatyBrokersList";

const GenerateList = ({ treaty }) => {
  const [showCreateList, setShowCreateList] = useState(false);
  const [showBrokerList, setShowBrokerList] = useState(false);
  return (
    <Fragment>
      <div className={`col-md-6`}>
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              <div className="media-body">
                <p className="text-muted mb-2">
                  Create Reinsurers list
                </p>
                <button
                  onClick={() => setShowCreateList(true)}
                  className="btn btn-primary btn-sm w-md"
                >
                  Create Reinsurers List
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-md-6`}>
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              <div className="media-body">
                <p className="text-muted mb-2">
                  Create Brokers list
                </p>

                <button
                  onClick={() => setShowBrokerList(true)}
                  className="btn btn-primary btn-sm w-md"
                >
                  Create Brokers List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        width="40%"
        toggle={() => setShowCreateList(false)}
        isvisible={showCreateList}
      >
        <CreateTreatyBroadCastList
          treaty={treaty}
          treaty_id={treaty?.treaty_id}
          setShow={setShowCreateList}
          toggle={() => setShowCreateList(false)}
        />
      </Drawer>


      <Drawer
        width="40%"
        toggle={() => setShowBrokerList(false)}
        isvisible={showBrokerList}
      >
        <CreateTreatyBrokersList
          treaty={treaty}
          treaty_id={treaty?.treaty_id}
          setShow={setShowBrokerList}
          // toggle={() => setShowBrokerList(false)}
        />
      </Drawer>
    </Fragment>
  );
};

export default GenerateList;
