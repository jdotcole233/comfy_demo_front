/* eslint-disable no-throw-literal */
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DrawerContext } from "../../components/Drawer";
import { useMutation, useQuery } from "react-apollo";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../graphql/mutattions/employees";
import swal from "sweetalert";
import { EMPLOYEES } from "../../graphql/queries/employees";
import { USER_ROLES } from "graphql/queries/settings";

const getRoleId = (roles, role) =>
  roles.find((r) => r.position === role).user_role_id || "";

function AddEmployee({ editing, employee, toggle }) {
  const { register, handleSubmit, errors, setValue, reset } = useForm();
  const { closed } = useContext(DrawerContext);
  const { data: userRoles } = useQuery(USER_ROLES);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: EMPLOYEES }],
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: EMPLOYEES }],
  });

  useEffect(() => {
    if (employee) {
      setValue("employee_first_name", employee.employee_first_name);
      setValue("employee_last_name", employee.employee_last_name);
      setValue("employee_phonenumber", employee.employee_phonenumber);
      setValue("employee_email", employee.employee_email);
      setValue("employee_position", employee.user.position);
    }
  }, [employee, setValue]);

  const handleAddEmployee = (values) => {
    swal({
      icon: "warning",
      title: "Create employee ?",
      text: "This action will add employee to the system",
      buttons: ["No", { text: "Yes", closeModal: false }],
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((input) => {
      if (!input) throw {};
      createEmployee({
        variables: {
          employee: {
            ...values,
            user_role_id: getRoleId(
              userRoles.user_roles,
              values.employee_position
            ),
          },
        },
      })
        .then((res) => {
          swal("Success", "Employee account created successfully", "success");
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
            // console.log(err)
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };
  const handleUpdateEmployee = (values) => {
    swal({
      icon: "warning",
      title: "Update employee ?",
      text: `This action will update ${employee.employee_first_name}'s details in the system`,
      buttons: ["No", { text: "Yes", closeModal: false }],
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((input) => {
      if (!input) throw {};
      updateEmployee({
        variables: {
          employee: {
            ...values,
            user_role_id: getRoleId(
              userRoles.user_roles,
              values.employee_position
            ),
          },
          employee_id: employee.employee_id,
        },
      })
        .then((res) => {
          swal("Success", "Employee account updated successfully", "success");
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
            // console.log(err)
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  useEffect(() => {
    if (closed) {
      reset();
    }
  }, [closed, reset]);

  return (
    <div>
      <div className="row">
        <div className="form-group">
          <h3 className="modal-title">{editing ? "View" : "Add"} Employee</h3>
        </div>
        <form
          onSubmit={handleSubmit(
            editing ? handleUpdateEmployee : handleAddEmployee
          )}
          className="row"
        >
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">First name</label>
              <input
                type="text"
                name="employee_first_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="First name"
              />
              {errors.employee_first_name && (
                <p className="text-danger">
                  {errors.employee_first_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                name="employee_last_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Last name"
              />
              {errors.employee_last_name && (
                <p className="text-danger">
                  {errors.employee_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="employee_email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                className="form-control"
                placeholder="Email"
              />
              {errors.employee_email && (
                <p className="text-danger">{errors.employee_email.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Primary phone number</label>
              <input
                type="tel"
                name="employee_phonenumber"
                ref={register({
                  required: "Required",
                  minLength: 9,
                  maxLength: 10,
                })}
                className="form-control"
                placeholder="Primary phone number"
              />
              {errors.employee_phonenumber && (
                <p className="text-danger">
                  {errors.employee_phonenumber.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Position</label>
              <select
                name="employee_position"
                ref={register({ required: "Required" })}
                className="form-control"
                id=""
              >
                <option value="">Select position</option>
                {userRoles?.user_roles?.map((role, key) => (
                  <option key={key} value={role.position}>
                    {role.position}
                  </option>
                ))}
                {/* <option value="CEO">CEO</option>
                <option value="General Manager">General Manager</option>
                <option value="Senior Broking Officer">
                  Senior Broking Officer
                </option>
                <option value="Finance Executive">Finance Executive</option>
                <option value="System Administrator">
                  System Administrator
                </option> */}
              </select>
              {errors.employee_position && (
                <p className="text-danger">
                  {errors.employee_position.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group d-flex justify-content-end">
              <button type="submit" className="btn btn-sm btn-primary w-md">
                {editing ? "Update" : "Add"} Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
