import React, { Fragment, useState } from "react";
import { Drawer, Modal, ModalHeader } from "../../../components";
import AllocateSettings from "../AllocateSettings";
// import AddRole from "./AddRole";
import { AddRoleForm } from "./AddRole";

const PagePermissionItem = ({ name, role }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showEditModal, setShowEditModal] = useState(undefined);
  const handleToggleDrawer = () => setShowDrawer((prev) => !prev);

  return (
    <Fragment>
      <tr>
        <td>
          <h5 className="text-truncate font-size-14">
            <a className="text-dark" href="/projects-list">
              {name}
            </a>
          </h5>
          <p className="text-muted mb-0">It will be as simple as Occidental</p>
        </td>

        <td>
          <div className="dropdown">
            <button
              onClick={() => setShowEditModal(role)}
              aria-haspopup="true"
              className="card-drop btn"
              aria-expanded="false"
              title="Edit role title"
            >
              <i className="bx bx-edit font-size-18"></i>
            </button>
            <button
              onClick={handleToggleDrawer}
              aria-haspopup="true"
              className="card-drop btn"
              aria-expanded="false"
              title="Configure role"
            >
              <i className="mdi mdi-account-cog-outline font-size-18"></i>
            </button>
            {/* <button
              onClick={null}
              aria-haspopup="true"
              className="card-drop btn"
              aria-expanded="false"
            >
              <i className="bx bx-trash text-danger font-size-18"></i>
            </button> */}
          </div>
        </td>
      </tr>

      <Modal
        centered
        show={showEditModal}
        onHide={() => setShowEditModal(undefined)}
      >
        <ModalHeader closeButton>Update Role</ModalHeader>
        <AddRoleForm role={role} setShow={setShowEditModal} />
      </Modal>

      <Drawer isvisible={showDrawer} toggle={handleToggleDrawer} width="40%">
        <AllocateSettings role={role} setShow={setShowDrawer} />
      </Drawer>
    </Fragment>
  );
};

export default PagePermissionItem;
