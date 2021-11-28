/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import { Drawer } from "../../components";
import AddQuarterForm from "./AddQuarterForm";

const AddQuarter = ({
  treaty_id,
  remainingPercentage,
  notes = [],
  isProp,
  surpluses = [],
  treaty,
}) => {
  const [showModal, setShowModal] = useState(false);

  return !isProp ? null : (
    <>
      <div className="col-md-6">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              <div className="media-body">
                <p className="text-muted mb-2">File Quarterly Statement</p>
                {/* Disable button with this disabled={!associates.length} */}
                <button
                  disabled={remainingPercentage || notes.length >= 4}
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary btn-sm w-md"
                >
                  Add Quarter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isvisible={showModal}
        toggle={() => setShowModal(!showModal)}
        width="40%"
      >
        {showModal && (
          <AddQuarterForm
            {...{
              treaty_id,
              remainingPercentage,
              notes,
              isProp,
              surpluses,
              treaty,
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default AddQuarter;
