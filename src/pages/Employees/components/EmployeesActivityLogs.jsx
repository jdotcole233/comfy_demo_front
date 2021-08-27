import React, { useMemo, useState } from "react";
import { Datatable, Modal } from "../../../components";
import { columns } from "../columns";
import _ from "lodash";

const EmployeesActivityLogs = ({ employees = [] }) => {
  const [showModal, setShowModal] = useState(false);

  // const mixedEmployees = () => {};

  const logs = useMemo(() => {
    if (employees) {
      return [
        ...employees.map((employee) => ({
          log_activities: employee.log_activities,
          employee_last_name: employee.employee_last_name,
          employee_first_name: employee.employee_first_name,
        })),
      ].map((log, logIndex) => {
        const ips = log.log_activities.map(
          (el) => _.pick(el, ["device_ip"]).device_ip
        );
        const mostFrequest = ips
          .sort(
            (a, b) =>
              ips.filter((v) => v === a).length -
              ips.filter((v) => v === b).length
          )
          .pop();
        return {
          ...log,
          employee: `${log.employee_first_name} ${log.employee_last_name}`,
          device_ip: (
            <span
              className={`${
                logIndex + 1 < log.log_activities.length &&
                mostFrequest === log.device_ip
                  ? "bg-success"
                  : "bg-danger"
              } text-white p-2`}
            >
              {log.device_ip}
            </span>
          ),
          created_at: (
            <span
              className={`${
                logIndex + 1 < log.log_activities.length &&
                mostFrequest === log.device_ip
                  ? "bg-success"
                  : "bg-danger"
              } text-white p-2`}
            >
              {new Date(log.created_at).toLocaleString()}
            </span>
          ),
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
          <Datatable columns={columns} data={logs} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeesActivityLogs;
