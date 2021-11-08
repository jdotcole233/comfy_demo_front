/* eslint-disable no-throw-literal */

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useState, useRef } from "react";
import { Datatable, Modal } from "../../components";
import columns from "./columns";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { EMPLOYEE, CHANGE_PASSWORD } from "../../graphql/mutattions/auth";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const Profile = () => {
  const { state, signOut } = useContext(AuthContext);
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");
  const { data: employee } = useQuery(EMPLOYEE, {
    variables: { id: state.user.employee.employee_id },
    fetchPolicy: "network-only",
  });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      signOut();
    },
  });

  const handleChangePassword = (values) => {
    swal({
      icon: "warning",
      title: "Change password ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      changePassword({
        variables: {
          id: state.user.employee.employee_id,
          password: values.password,
        },
      }).then((res) => {
        swal.close();
      });
    });
  };

  return (
    <Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Profile</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a>User</a>
                    </li>
                    <li className="breadcrumb-item active">Profile</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>KEK-Re Dashboard</p>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img
                        src="/assets/images/profile-img.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="avatar-lg mr-3 mx-lg-auto mb-4 profile-user-wid">
                        <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                          {state.user?.employee?.emp_abbrv}
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-8">
                      <div className="pt-4">
                        <div className="">
                          <button
                            onClick={() =>
                              setShowChangePasswordModal(
                                !showChangePasswordModal
                              )
                            }
                            className="btn btn-primary waves-effect waves-light btn-sm"
                          >
                            Change password
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <h5 className="font-size-15 text-truncate">
                        {state.user?.employee?.employee_first_name}{" "}
                        {state.user?.employee?.employee_last_name}
                      </h5>
                      <p className="text-muted mb-0 text-truncate">
                        {state.user?.user_role?.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="mb-4 card-title">Personal Information</div>
                  <div className="table-responsive">
                    <table className="table-nowrap mb-0 table">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name :</th>
                          <td>
                            {state.user?.employee?.employee_first_name}{" "}
                            {state.user?.employee?.employee_last_name}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile :</th>
                          <td>{state.user?.employee?.employee_phonenumber}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail :</th>
                          <td>{state.user?.employee?.employee_email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body">
                          <p className="text-muted font-weight-medium">
                            Total Offers
                          </p>
                          <h4 className="mb-0">
                            {employee
                              ? employee.employee.total_offers.length
                              : 0}
                          </h4>
                        </div>

                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className="bx bx-copy-alt font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body">
                          <p className="text-muted font-weight-medium">
                            Last login
                          </p>
                          <h4 className="mb-0">
                            {employee?.employee?.log_activities.length > 1
                              ? employee.employee.log_activities[1].created_at
                              : new Date().toDateString()}
                          </h4>
                        </div>

                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i className="bx bx-timer font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="mb-4 card-title">Log Activities</div>
                      <Datatable
                        entries={4}
                        columns={columns}
                        data={employee ? employee.employee.log_activities : []}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(!showChangePasswordModal)}
      >
        <Modal.Header closeButton>Change password</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleChangePassword)} className="form">
            <div className="form-group">
              <label htmlFor="old-password">New password</label>
              <input
                type="password"
                name="password"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                className="form-control"
                placeholder="New password"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="old-password">Confirm new password</label>
              <input
                type="password"
                name="password_repeat"
                ref={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                className="form-control"
                placeholder="Confirm new password"
              />
              {errors.password_repeat && (
                <p className="text-danger">{errors.password_repeat.message}</p>
              )}
            </div>
            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-primary w-md " type="submit">
                Change password
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Profile;
