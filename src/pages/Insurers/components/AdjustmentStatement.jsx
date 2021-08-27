/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-throw-literal */
import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { money } from "../../../utils";
import { Prompt } from "../../../components";
import DeleteAdjustmentStatement from "./DeleteAdjustmentStatement";
import AdjustmentStatementForm from "./AdjustmentStatementForm";

const AdjustmentStatement = ({ treaty_np_detail, currency, treaty_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [showremovePrompt, setShowremovePrompt] = useState(false);

  const created = treaty_np_detail?.adjustment_created;

  return (
    <Fragment>
      <div className="col-md-6">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              {created ? (
                <div className="media-body">
                  <div className="row">
                    <div className="col-md-4 h-full d-flex align-items-center justify-content-center">
                      <i style={{ fontSize: 34 }} className="bx bx-file"></i>
                    </div>
                    <div className="col-md-8">
                      <span>
                        Adjustment Statement created for{" "}
                        <b className="text-success">
                          {currency}{" "}
                          {money(parseFloat(treaty_np_detail?.egrnpi))}{" "}
                        </b>
                        as Retained Premium Income{" "}
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowModal(true)}
                          className="btn btn-sm text-white btn-primary ml-2"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => setShowremovePrompt(true)}
                          style={{ cursor: "pointer" }}
                          className="text-danger ml-2"
                        >
                          remove
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="media-body">
                  {/* {JSON.stringify(treaty_np_detail)} */}
                  <p className="text-muted mb-2">
                    Create Adjustment statement for{" "}
                    <b className="text-success">
                      {currency} {money(parseFloat(treaty_np_detail?.egrnpi))}{" "}
                    </b>
                  </p>
                  <button
                    disabled={created}
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary btn-sm w-md"
                  >
                    Create Adjustment statement
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {!created ? "Create" : "Edit"} Adjustment Statement
        </Modal.Header>
        <AdjustmentStatementForm
          treaty_id={treaty_id}
          treaty_np_detail={treaty_np_detail}
          created={created}
          setShowModal={setShowModal}
        />
      </Modal>
      <Prompt
        isvisible={showremovePrompt}
        toggle={() => setShowremovePrompt(false)}
      >
        <DeleteAdjustmentStatement
          treaty_id={treaty_id}
          treaty_np_detail_id={treaty_np_detail?.treaty_np_id}
          onClose={() => setShowremovePrompt(false)}
        />
      </Prompt>
    </Fragment>
  );
};

export default AdjustmentStatement;
