import { useAuth } from "../../../context/AuthContext";
import { REMOVE_BROKER_FROM_TREATY } from "../../../graphql/mutattions/brokers";
import { TREATY } from "../../../graphql/queries/treaty";
import { editAccessRoles } from "../../../layout/adminRoutes";
import React from "react";
import { Fragment, useState } from "react";
import { useMutation } from "react-apollo";
import { Modal, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import AddBrokerPercentageForm from "./AddBrokerPercentageForm";

// handleAddPercentage(participant)
//handleEditPercentage(participant)

const BrokerButtons = ({
  share_percentage,
  admin_percentage,
  re_broker_treaties_participation_id,
  treaty,
  ...participant
}) => {
  const { user } = useAuth();
  const [showPercentageModal, setShowPercentageModal] = useState(false);
  const [setEdit, setSetEdit] = useState("");
  const [removeBroker] = useMutation(REMOVE_BROKER_FROM_TREATY, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });

  const handleRemoveBroker = () => {
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
      removeBroker({
        variables: {
          id: re_broker_treaties_participation_id,
          treaty_id: treaty?.treaty_id,
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
            onClick={() => setSetEdit(share_percentage)}
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
      <button className="btn btn-success btn-sm">Preview closing</button>
      <button onClick={() => handleRemoveBroker()} className="btn mb-1">
        <i className="bx bx-trash text-danger"></i>
      </button>

      <Modal
        centered
        show={showPercentageModal}
        onHide={() => setShowPercentageModal(false)}
      >
        <AddBrokerPercentageForm
          {...{
            re_broker_treaties_participation_id,
            treaty,
            setShow: setShowPercentageModal,
            _x_admin_percentage: admin_percentage,
          }}
        />
      </Modal>
      <Modal
        centered
        show={setEdit ? true : false}
        onHide={() => setSetEdit("")}
      >
        <AddBrokerPercentageForm
          {...{
            re_broker_treaties_participation_id,
            treaty,
            edit: share_percentage,
            setShow: setSetEdit,
            _x_admin_percentage: admin_percentage,
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default BrokerButtons;
