import React from "react";
import { Link } from "react-router-dom";
import { TagSection } from "../components/VersionBox";
import { useAuth } from "../context/AuthContext";
import NotifcIcon from "./NotifcIcon";

export const Navbar = () => {
  // const { state, signOut } = useContext(AuthContext);
  const { user, signOut } = useAuth();
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div
            style={{ backgroundColor: "#343434" }}
            className="navbar-brand-box"
          >
            <Link to="/admin/" className="logo logo-light pt-2">
              <span className="logo-sm">
                <img
                  src={"https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"}
                  alt=""
                  height="40"
                  width="40"
                />
              </span>
              <span className="logo logo-lg pt-2">
                <img
                  src={require("../assets/visal-sm-logo.png")}
                  alt=""
                  width="200"
                  height="60"
                />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars"></i>
          </button>
        </div>

        <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
            <TagSection>Premium</TagSection>
          </div>

          <div className="dropdown d-none d-lg-inline-block ml-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              data-toggle="fullscreen"
            >
              <i className="bx bx-fullscreen"></i>
            </button>
          </div>

          <NotifcIcon />

          <div className="dropdown d-inline-block dropright">
            <button
              type="button"
              className="btn header-item waves-effect"
              id="page-header-user-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span className=" header-profile-user d-flex justify-content-center align-items-center   bg-soft-success text-success font-size-12">
                {user?.employee?.emp_abbrv}
              </span>
              <span className="d-none d-xl-inline-block ml-1">
                {user?.employee?.employee_first_name}
              </span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-left">
              <Link
                to={{ pathname: "/admin/profile" }}
                className="dropdown-item"
              >
                <i className="bx bx-user font-size-16 align-middle mr-1"></i>
                Profile
              </Link>
              {user?.user_role?.position === "System Administrator" ? (
                <Link
                  to={{ pathname: "/admin/settings" }}
                  className="dropdown-item"
                >
                  <i className="bx bx-cog font-size-16 align-middle mr-1"></i>
                  Settings
                </Link>
              ) : null}
              <div className="dropdown-divider"></div>
              <button onClick={signOut} className="dropdown-item text-danger">
                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
