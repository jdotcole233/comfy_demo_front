import React, { useMemo, useState } from "react";
import { Datatable, Modal } from "../../../components";
import { columns } from "../columns";
import _ from "lodash";

const EmployeesActivityLogs = ({ employees = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const logs = useMemo(() => {
    if (employees) {
      const __ = employees.map((employee) => {
        return employee.log_activities.map((activityLog) => ({
          ...employee,
          ...activityLog,
        }));
      });
      return __.map((log) => {
        return {
          ...log,
          employee: `${log.employee_first_name} ${log.employee_last_name}`,
          created_at: new Date(log.created_at).toLocaleString(),
        };
      });
    }
    return [];
  }, [employees]);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-rounded btn-sm w-md btn-primary"
      >
        All employee access logs
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
          <Datatable columns={columns} data={logs} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeesActivityLogs;
