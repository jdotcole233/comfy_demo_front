import React, { useState } from "react";
import {
  dashboard,
  offers,
  clients,
  others,
  Offers_Access,
  clients_Access,
  others_Access,
  treaty_Access,
  treaty,
} from "./adminRoutes";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { version } from "../../package.json";
import { Modal } from "../components";
import VersionBox from "../components/VersionBox";
// el.roles.includes(user?.position)
//privileges.includes(el.name)
const SideBar = () => {
  const { user, privileges } = useAuth();
  const { granted } = useSelector((state) => state.app);
  const [showVersion, setShowVersion] = useState(false);
  const { pathname } = useLocation();
  const showSideBarLinks = (routes, badge) => {
    return routes.map((el, key) =>
      privileges.includes(el.name) ? (
        <li key={key}>
          <Link
            to={el.link}
            className={`waves-effect ${
              pathname === el.link ||
              (pathname === "/admin/view-offer" && el.name === "Create Slip")
                ? "bg-danger text-white"
                : ""
            }`}
          >
            <i className={`${el.icon} text-white`}></i>
            {badge && (
              <span className="badge badge-pill badge-success float-right">
                New
              </span>
            )}
            <span>{el.name}</span>
          </Link>
        </li>
      ) : null
    );
  };

  return (
    <Fragment>
      <div style={{ backgroundColor: "#273B97" }} className="vertical-menu">
        <div data-simplebar className="h-100 ">
          <div
            style={{ backgroundColor: "#273B97" }}
            className="d-flex flex-column h-100 justify-content-between"
            id="sidebar-menu"
          >
            <ul className="metismenu list-unstyled" id="side-menu">
              {showSideBarLinks(dashboard)}
              {Offers_Access.includes(user?.position) && (
                <li className="menu-title">Offers</li>
              )}
              {showSideBarLinks(offers)}
              {clients_Access.includes(user?.position) && (
                <li className="menu-title">Clients</li>
              )}
              {showSideBarLinks(clients)}
              {others_Access.includes(user?.position) && (
                <li className="menu-title">others</li>
              )}
              {showSideBarLinks(others)}

              {granted && treaty_Access.includes(user?.position) && (
                <Fragment>
                  <li className="menu-title">treaty</li>
                  {showSideBarLinks(treaty)}
                </Fragment>
              )}
            </ul>
          </div>
          <div
            onClick={() => setShowVersion(true)}
            style={{
              position: "absolute",
              bottom: 0,
              padding: 20,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Version: {version}
          </div>
        </div>
      </div>

      <Modal
        // size="lg"
        centered
        onHide={() => setShowVersion(false)}
        show={showVersion}
      >
        <VersionBox />
      </Modal>
    </Fragment>
  );
};

export default SideBar;
