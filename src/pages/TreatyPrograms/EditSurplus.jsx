/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { Input } from "../../components";
import { TREATY, UPDATE_LIMIT_LAYER } from "../../graphql/queries/treaty";

const EditSurplus = ({ surplus, index, surpluses, treaty }) => {
  const [showModal, setShowModal] = useState(false);
  const [commission, setCommission] = useState("");

  const [updaeLayer] = useMutation(UPDATE_LIMIT_LAYER, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });

  function updateLayer(e) {
    const _ = surpluses;
    const old = {
      surpulus_uuid: _[index - 1].surpulus_uuid,
      commission,
    };
    _[index - 1] = old;

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update this layer ?`,
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      updaeLayer({
        variables: {
          limit: {
            limit: JSON.stringify(_),
            treaty_id: treaty?.treaty_id,
          },
        },
      })
        .then(() => {
          setShowModal(false);
          swal(
            "Hurray!!",
            "layer " + index + "updated successfully",
            "success"
          );
        })
        .catch((err) => {
          swal(
            "Whhoops!!",
            "layer " + index + "not updated successfully",
            "error"
          );
        });
    });
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-info btn-sm  mr-2"
      >
        Edit
      </button>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Edit Surplus {index}</Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <span>Current commission: {surplus.commission}</span>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <Input
                  label="New Commission"
                  value={commission}
                  name="commission"
                  onChange={(e) => setCommission(e.target.value)}
                  type="number"
                  placeholder="Commission"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={updateLayer} className="btn btn-sm btn-success w-md">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditSurplus;
