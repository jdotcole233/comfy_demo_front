import React, { useState } from "react";
import { Datatable, Modal } from "../../../components";
import { columns } from "../columns";

const EmployeesActivityLogs = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-rounded btn-sm w-md btn-primary"
      >
        Add Employee
      </button>

      <Modal
        size="xl"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Activity Logs for All Employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Datatable columns={columns} data={[]} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeesActivityLogs;
