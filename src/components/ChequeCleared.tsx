import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  color:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

const ChequeCleared = ({ color = "primary" }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={`btn btn-sm btn-${color} w-md mt-1 mr-1`}
      >
        Cheque Cleared
      </button>

      <Modal
        enforceFocus
        centered
        size="lg"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cheque Cleared</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Clearance Status</label>
                <select name="clearance_status" id="" className="form-control">
                  <option value="">Select</option>
                  <option value="CLEARED">Cleared</option>
                  <option value="UNCLEARED">Not Cleared</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Date Cheque cleared</label>
                <input type="date" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Reason</label>
                <textarea
                  placeholder="Reason check was not cleared"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-primary">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChequeCleared;
