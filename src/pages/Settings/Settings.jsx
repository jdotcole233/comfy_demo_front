/* eslint-disable jsx-a11y/anchor-is-valid */
import { Loader } from "components";
import { USER_ROLES } from "graphql/queries/settings";
import React from "react";
import { useQuery } from "react-apollo";
import AddRole from "./components/AddRole";
import PagePermissionItem from "./components/PagePermissionItem";
import PagePermissionsHead from "./components/PagePermissionsHead";
// import TestSms from "./components/TestSms";
// import UpdateCurrencyCharges from "./components/UpdateCurrencyCharges";

const Settings = () => {
  const { data: roles, loading } = useQuery(USER_ROLES);

  if (loading)
    return (
      <div className="page-content">
        <Loader />
      </div>
    );

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">Settings</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Settings</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Content Begins here */}
        {/* <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-6"></div>
            <div
              className="col-md-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <TestSms />
              <UpdateCurrencyCharges />
            </div>
          </div>
        </div> */}

        {/* <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Time to send mails">Time to send Mails</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Time to send mails">
                    Duration to remind of unpaid Offers
                  </label>
                  <input type="time" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-6">
              <h3>Roles</h3>
            </div>
            <div
              className="col-md-6 d-flex align-items-center"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <AddRole />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="project-list-table table-nowrap table-centered table-borderless table">
              <PagePermissionsHead />
              <tbody>
                {roles?.user_roles?.map((role, key) => (
                  <PagePermissionItem
                    key={key}
                    name={role.position}
                    role={role}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
