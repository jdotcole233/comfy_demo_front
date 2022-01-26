/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/client";
import { Input, Modal, ModalHeader, ModalBody } from "../../../components";
import {
  CREATE_USER_ROLE,
  UPDATE_USER_ROLE,
} from "../../../graphql/mutattions/settings";
import { USER_ROLES } from "../../../graphql/queries/settings";
import React, { Fragment, useEffect, useState } from "react";
import swal from "sweetalert";

const AddRole = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => setShowModal(true)}
        className="btn  btn-primary btn-sm w-md mr-1"
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

export const AddRoleForm = ({ setShow, role }) => {
  const [createRole] = useMutation(CREATE_USER_ROLE, {
    refetchQueries: [{ query: USER_ROLES }],
  });
  const [updateRole] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: USER_ROLES }],
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (role) {
      setTitle(role.position);
    }
  }, [role]);

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

  const update = () => {
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
        return updateRole({
          variables: {
            position: title,
            privileges: role.privileges,
            user_role_id: role.user_role_id,
          },
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
      <button
        onClick={role ? update : create}
        className="btn btn-primary btn-sm w-md"
      >
        {role ? "Update" : "Create"}
      </button>
    </ModalBody>
  );
};
