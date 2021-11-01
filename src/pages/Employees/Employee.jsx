/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useMemo } from "react";
// import swall from "sweetalert2";
import { useMutation } from "@apollo/client";
import {
  REMOVE_EMPLOYEE,
  RESET_CREDENTIALS,
} from "../../graphql/mutattions/employees";
import { EMPLOYEES } from "../../graphql/queries/employees";
import swal from "sweetalert";
import { useState } from "react";
import { Datatable, Modal } from "../../components";
import columns from "./columns";
import _ from "lodash";
import { useAuth } from "../../context/AuthContext";

export default function Employees({ data, openViewEmployee }) {
  const { user } = useAuth();
  const [showLOgs, setShowLOgs] = useState(false);
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE, {
    variables: { employee_id: data.employee_id },
    refetchQueries: [{ query: EMPLOYEES }],
  });

  const [resetEmployeePassword] = useMutation(RESET_CREDENTIALS, {
    variables: { employee_id: data.employee_id },
  });

  const handleResetEmployeeCredentials = () => {
    swal({
      icon: "warning",
      title: "Reset Employee Password",
      text: `This action will reset the employee's password`,
      buttons: ["No", { text: "Yes", closeModal: false }],
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((input) => {
      if (!input) throw {};
      resetEmployeePassword()
        .then((res) =>
          swal("Success", "Employee credentials reset successful", "success")
        )
        .catch((err) => {
          if (err) {
            swal("Whoops!!", "Somehing went wrong", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleRemoveEmployee = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Delete Employee",
      text: `This action will completely remove employee details from system`,
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      removeEmployee()
        .then((res) => {
          swal(
            "Success",
            "Employee deleted successfully",
            "success",
            "success"
          );
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const ips = data.log_activities.map(
    (el) => _.pick(el, ["device_ip"]).device_ip
  );
  const mostFrequest = ips
    .sort(
      (a, b) =>
        ips.filter((v) => v === a).length - ips.filter((v) => v === b).length
    )
    .pop();

  const logs = useMemo(() => {
    if (data) {
      return data.log_activities?.map((log, logIndex) => {
        return {
          ...log,
          device_ip: (
            <span
              className={`${
                logIndex + 1 < data.log_activities.length &&
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
                logIndex + 1 < data.log_activities.length &&
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
  }, [data, mostFrequest]);

  const groupedIps = _.groupBy(data.log_activities, "device_ip");

  const hasViewPrivilege = useMemo(() => {
    if (user) {
      return (
        user.position === "System Administrator" ||
        user.position === "CEO" ||
        user.position === "General Manager"
      );
    }
    return false;
  }, [user]);

  return (
    <Fragment>
      <div className="col-xl-4 col-sm-6">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="text-lg-center">
                  <div className="avatar-lg mr-3 mx-lg-auto mb-4 float-left float-lg-none">
                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                      {data.emp_abbrv}
                    </span>
                  </div>
                  {/* <h5 className="mb-1 font-size-15 text-truncate">Marion Burton</h5>
                                <a href="#" className="text-muted">@Skote</a> */}
                </div>
              </div>

              <div className="col-lg-8">
                <div>
                  {/* <a href="invoices-detail.html" className="d-block text-primary mb-2">Invoice #14251</a> */}
                  <h5 className="text-truncate">
                    {data.employee_first_name} {data.employee_last_name}
                  </h5>
                  <p className="text-muted">{data.user.position}</p>
                  <h5
                    className="font-size-14 text-truncate"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Amount"
                  >
                    <i className="bx bx-envelope mr-1 text-primary"></i>{" "}
                    {data.employee_email}
                  </h5>
                  <h5
                    className="font-size-14"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Due Date"
                  >
                    <i className="bx bx-calendar mr-1 text-primary"></i>{" "}
                    {data.employee_phonenumber}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* {JSON.stringify(Object.keys(groupedIps))} */}
          <div className="card-footer bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div
                onClick={() => openViewEmployee(data)}
                className="flex-fill d-flex  p-1 justify-content-center link-hover"
                data-toggle="tooltip"
                data-placement="top"
                title="View"
              >
                <i className="bx bx-show-alt"></i>
              </div>
              <div
                onClick={handleResetEmployeeCredentials}
                className="flex-fill d-flex justify-content-center p-1 link-hover"
                data-toggle="tooltip"
                data-placement="top"
                title="Reset Credentials"
              >
                <i className="bx bx-reset"></i>
              </div>
              <div
                onClick={handleRemoveEmployee}
                className="flex-fill d-flex justify-content-center p-1 link-hover"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <i className="bx bx-trash-alt"></i>
              </div>
              {hasViewPrivilege ? (
                <div
                  onClick={() => setShowLOgs(true)}
                  className="flex-fill d-flex justify-content-center p-1 link-hover"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Activity Logs"
                >
                  {/* <i className="bx bx-layer"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        centered
        show={showLOgs}
        onHide={() => setShowLOgs(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Access Logs for {data.employee_first_name} {data.employee_last_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-4">
            <div className="col-md-12">
              <span className="p-2 badge-success text-white badge badge-pill">
                Frequently Logged location{" "}
                {groupedIps[mostFrequest]?.length ?? 0}
              </span>
              <span className="p-2 badge-danger text-white ml-2 badge badge-pill">
                Less Frequent logged Location{" "}
                {Object.keys(groupedIps).reduce(
                  (a, b) => a + groupedIps[b].length,
                  0
                )
                  ? Object.keys(groupedIps).reduce(
                      (a, b) => a + groupedIps[b].length,
                      0
                    ) - groupedIps[mostFrequest]?.length
                  : 0}
              </span>
            </div>
            <div className="col-md-12 p-3">
              <span>Total Logs: {data.log_activities?.length}</span>
            </div>
            {/* {Object.keys(groupedIps).map((el) => (
              <div className="col-md-12">
                <span>
                  {el}: {groupedIps[el].length}
                </span>
              </div>
            ))} */}
          </div>
          <Datatable entries={5} columns={columns} data={logs} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
