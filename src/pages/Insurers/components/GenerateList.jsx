import { Drawer } from "components";
import React from "react";
import { Fragment, useState } from "react";
import CreateTreatyBroadCastList from "./CreateTreatyBroadCastList";

const GenerateList = ({ isProp, allowAdjustment, treaty }) => {
  const [showCreateList, setShowCreateList] = useState(false);
  return (
    <Fragment>
      <div className={`col-md-${isProp && !allowAdjustment ? "12" : "6"}`}>
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              <div className="media-body">
                <p className="text-muted mb-2">
                  Create Reinsurers/Brokers list
                </p>
                <button
                  onClick={() => setShowCreateList(true)}
                  className="btn btn-primary btn-sm w-md"
                >
                  Create List
                </button>
                <button
                  onClick={() => setShowCreateList(true)}
                  className="btn btn-primary ml-3 btn-sm w-md"
                >
                  Create List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        width="40%"
        toggle={() => setShowCreateList(!showCreateList)}
        isvisible={showCreateList}
      >
        <CreateTreatyBroadCastList
          treaty={treaty}
          treaty_id={treaty?.treaty_id}
          setShow={setShowCreateList}
          toggle={() => setShowCreateList(!showCreateList)}
        />
      </Drawer>
    </Fragment>
  );
};

export default GenerateList;
