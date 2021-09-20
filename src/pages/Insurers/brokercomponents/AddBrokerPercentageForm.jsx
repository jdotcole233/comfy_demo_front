import React from "react";
import { Fragment, useState } from "react";
import { useMutation } from "react-apollo";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { ADD_PERCENTAGE_TO_BROKER } from "../../../graphql/mutattions/brokers";
import { TREATY } from "../../../graphql/queries/treaty";

const AddBrokerPercentageForm = ({
  edit,
  treaty,
  re_broker_treaties_participation_id,
  setShow,
  _x_admin_percentage,
}) => {
  const [share_percentage, setPercentage] = useState(edit ? edit : "");
  const [admin_percentage, setAdmin_percentage] = useState(
    _x_admin_percentage ? _x_admin_percentage : ""
  );
  const [assign] = useMutation(ADD_PERCENTAGE_TO_BROKER, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });

  const treaty_type = treaty?.treaty_program?.treaty_type;

  const assignPercentage = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Assign percentage ?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      assign({
        variables: {
          broker_participation: {
            treaty_id: treaty?.treaty_id,
            re_broker_treaties_participation_id,
            share_percentage,
            admin_percentage,
            treaty_type,
          },
        },
      })
        .then((res) => {
          swal("Success", "Broker removed successfully", "success");
          setShow(edit ? "" : false);
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  return (
    <Fragment>
      <Modal.Header>
        <Modal.Title>{edit ? "Edit" : "Add"} percentge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <div className="form-group">
            <label htmlFor="percentage">Share percentage</label>
            <input
              value={share_percentage}
              onChange={(e) => setPercentage(e.target.value)}
              defaultValue={edit}
              className="form-control"
              type="number"
              step="any"
            />
          </div>
          <div className="form-group">
            <label htmlFor="percentage">Admin percentage</label>
            <input
              value={admin_percentage}
              onChange={(e) => setAdmin_percentage(e.target.value)}
              defaultValue={_x_admin_percentage}
              className="form-control"
              type="number"
              step="any"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={!share_percentage}
          onClick={assignPercentage}
          className="btn btn-success"
        >
          {edit ? "Update" : "Add"}
        </button>
      </Modal.Footer>
    </Fragment>
  );
};

export default AddBrokerPercentageForm;
