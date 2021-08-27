/* eslint-disable no-throw-literal */
import { useMutation } from "react-apollo";
import { Input, Modal, ModalHeader, ModalBody } from "components";
import { CREATE_USER_ROLE } from "graphql/mutattions/settings";
import { USER_ROLES } from "graphql/queries/settings";
import React, { Fragment, useState } from "react";
import swal from "sweetalert";

const AddRole = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-rounded btn-primary btn-sm w-md mr-1"
      >
        Create Role
      </button>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <ModalHeader closeButton>Create new role</ModalHeader>
        <AddRoleForm setShow={setShowModal} />
      </Modal>
    </Fragment>
  );
};

export default AddRole;

const AddRoleForm = ({ setShow }) => {
  const [createRole] = useMutation(CREATE_USER_ROLE, {
    refetchQueries: [{ query: USER_ROLES }],
  });
  const [title, setTitle] = useState("");

  const create = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to create" + title + " as a role?",
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    })
      .then((btn) => {
        if (!btn) throw null;
        return createRole({
          variables: { position: title, privileges: "[]" },
        });
      })
      .then((json) => {
        setShow(false);
        setTitle("");
        swal("Sucess", "User role added successfully", "success");
      })
      .catch((err) => {
        if (err) {
          swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  return (
    <ModalBody className="form p-4">
      <Input
        label="Role Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={create} className="btn btn-primary btn-sm w-md">
        Create
      </button>
    </ModalBody>
  );
};
