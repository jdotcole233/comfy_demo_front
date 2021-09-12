import { useAuth } from "../../../context/AuthContext";
import { REMOVE_BROKER_FROM_TREATY } from "../../../graphql/mutattions/brokers";
import { TREATY } from "../../../graphql/queries/treaty";
import { editAccessRoles } from "../../../layout/adminRoutes";
import React from "react";
import { Fragment, useState } from "react";
import { useMutation } from "react-apollo";
import { Modal, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import swal from "sweetalert";

// handleAddPercentage(participant)
//handleEditPercentage(participant)

const BrokerButtons = ({
  share_percentage,
  re_broker_treaties_participation_id,
  treaty,
  ...participant
}) => {
  const { user } = useAuth();
  const [showPercentageModal, setShowPercentageModal] = useState(false);
  const [removeReinsurer] = useMutation(REMOVE_BROKER_FROM_TREATY, {
    refetchQueries: [{ query: TREATY, variables: { id: treaty?.treaty_id } }],
  });

  const handleRemoveReinsurer = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to remove ${participant?.re_broker?.re_broker_name} ?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeReinsurer({
        variables: {
          id: re_broker_treaties_participation_id,
          //   ids,
        },
      })
        .then((res) => {
          swal("Success", "Broker removed successfully", "success");
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

  const handleAddPercentage = () => {};

  return (
    <Fragment>
      <DropdownButton
        className="mr-1 mb-1"
        variant="primary"
        size="sm"
        as={ButtonGroup}
        id="dropdown-basic-button"
        title="Percentage"
      >
        {share_percentage ? (
          <Dropdown.Item
            onClick={() => {}}
            disabled={!editAccessRoles.includes(user?.position)}
          >
            Edit
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => setShowPercentageModal(true)}>
            Add
          </Dropdown.Item>
        )}
      </DropdownButton>
      <button
        onClick={() => handleRemoveReinsurer(participant)}
        className="btn mb-1"
      >
        <i className="bx bx-trash text-danger"></i>
      </button>

      <Modal
        centered
        show={showPercentageModal}
        onHide={() => setShowPercentageModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Add percentge</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default BrokerButtons;
