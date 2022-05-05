/* eslint-disable array-callback-return */
import { useAuth } from "../../../context/AuthContext";
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
  const { user } = useAuth();

  const logs = useMemo(() => {
    if (employees) {
      return formArray(employees);
    }
    return [];
  }, [employees]);

  const hasViewPrivilege = useMemo(() => {
    if (user) {
      return (
        user.user_role?.position === "System Administrator" ||
        user.user_role?.position === "CEO" ||
        user.user_role?.position === "General Manager"
      );
    }
    return false;
  }, [user]);

  if (!hasViewPrivilege) return null;

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn  btn-sm w-md btn-success"
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
