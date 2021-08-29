/* eslint-disable array-callback-return */
import React, { useMemo, useState } from "react";
import { Datatable, Modal } from "../../../components";
import { columns } from "../columns";
// import _ from "lodash";

const formArray = (arr = []) => {
  const newArr = [];
  for (let index = 0; index < arr.length; index++) {
    let element = arr[index];
    newArr.push({
      employee: element.employee_first_name + " " + element.employee_last_name,
      log_activities: element.log_activities.map((res) => ({
        ...res,
        employee:
          element.employee_first_name + " " + element.employee_last_name,
      })),
    });
  }
  const newB = [];
  newArr.map((res) => {
    res.log_activities.map((r) => {
      newB.push(r);
    });
  });
  return newB;
};

const EmployeesActivityLogs = ({ employees = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const logs = useMemo(() => {
    if (employees) {
      // const __ = employees.map((employee) => {
      //   employee.log_activities.map((activityLog) => ({
      //     employee_first_name: employee.employee_first_name,
      //     employee_last_name: employee.employee_first_name,
      //     ...activityLog,
      //   }));
      // });
      // console.log(__);
      // return __.map((log) => {
      //   return {
      //     ...log,
      //     employee: `${log.employee_first_name} ${log.employee_last_name}`,
      //     created_at: new Date(log.created_at).toLocaleString(),
      //   };
      // });
      return formArray(employees);
    }
    return [];
  }, [employees]);

  // console.log(logs);

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
