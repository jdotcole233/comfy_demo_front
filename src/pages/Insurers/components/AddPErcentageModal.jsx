import React from "react";
import { Fragment } from "react";
import { Modal } from "../../../components";

const AddPErcentageModal = ({
  percentageErrorEntry,
  percentage,
  handleChangePercentageValue,
  isEdit,
  AddPercentage,
}) => {
  return (
    <Fragment>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="">Percentage</label>
          <input
            type="number"
            value={percentage}
            onChange={handleChangePercentageValue}
            className="form-control"
            placeholder="Percentage"
          />
          {percentageErrorEntry && (
            <p className="text-danger">
              You have provided a value more than available
            </p>
          )}
        </div>
        <div className="form-group">
          <input
            onClick={AddPercentage}
            className="form-control btn btn-primary"
            type="submit"
            value={`${!isEdit ? "Add" : "Edit"} percentage`}
          />
        </div>
      </Modal.Body>
    </Fragment>
  );
};

export default AddPErcentageModal;
