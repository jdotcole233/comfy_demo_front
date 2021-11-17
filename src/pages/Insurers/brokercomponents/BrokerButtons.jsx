import { useAuth } from "../../../context/AuthContext";
import { REMOVE_BROKER_FROM_TREATY } from "../../../graphql/mutattions/brokers";
import { TREATY } from "../../../graphql/queries/treaty";
import { editAccessRoles } from "../../../layout/adminRoutes";
import { Drawer } from "../../../components";
import React from "react";
import { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import AddBrokerPercentageForm from "./AddBrokerPercentageForm";
import PreviewClosing from "./PreviewClosing";
import SendTreatyClosing from "./SendTreatyClosing";

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
  const [previewClosing, setPreviewClosing] = useState(false);
  const [sendClosing, setSendClosing] = useState(false);
  const [setEdit, setSetEdit] = useState("");
  const [removeBroker] = useMutation(REMOVE_BROKER_FROM_TREATY, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });

  const isProp = treaty?.treaty_program?.treaty_type === "PROPORTIONAL";

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
      // eslint-disable-next-line
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

  // const handleAddPercentage = () => { };

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
            disabled={!editAccessRoles.includes(user?.user_role?.position)}
          >
            Edit
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => setShowPercentageModal(true)}>
            Add
          </Dropdown.Item>
        )}
      </DropdownButton>

      {isProp && treaty?.treaty_accounts?.length > 0 && (
        <DropdownButton
          className="mr-1 mb-1"
          variant="success"
          size="sm"
          as={ButtonGroup}
          id="dropdown-basic-button"
          title="Closing Slip"
        >
          <Dropdown.Item onClick={() => setPreviewClosing(true)}>
            Preview
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSendClosing(true)}>
            Send
          </Dropdown.Item>
        </DropdownButton>
      )}
      {!isProp && (
        <DropdownButton
          className="mr-1 mb-1"
          variant="success"
          size="sm"
          as={ButtonGroup}
          id="dropdown-basic-button"
          title="Closing Slip"
        >
          <Dropdown.Item onClick={() => setPreviewClosing(true)}>
            Preview
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSendClosing(true)}>
            Send
          </Dropdown.Item>
        </DropdownButton>
      )}

      <button onClick={() => handleRemoveBroker()} className="btn mb-1">
        <i className="bx bx-trash text-danger"></i>
      </button>

      <Drawer
        isvisible={previewClosing}
        toggle={() => setPreviewClosing(false)}
        width="50%"
      >
        <PreviewClosing {...{ treaty, re_broker_treaties_participation_id }} />
      </Drawer>

      <Drawer
        isvisible={sendClosing}
        toggle={() => setSendClosing(false)}
        width="50%"
      >
        <SendTreatyClosing
          {...{ treaty, re_broker_treaties_participation_id }}
        />
      </Drawer>

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
