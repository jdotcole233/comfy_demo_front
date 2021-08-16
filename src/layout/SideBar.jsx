import React, { useContext } from "react";
import {
  dashboard,
  offers,
  clients,
  others,
  Offers_Access,
  clients_Access,
  others_Access,
} from "./adminRoutes";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SideBar = () => {
  const { state } = useContext(AuthContext);
  const { pathname } = useLocation();
  const showSideBarLinks = (routes, badge) => {
    return routes.map((el, key) =>
      el.roles.includes(state?.user?.position) ? (
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
              <span class="badge badge-pill badge-success float-right">
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
    <div style={{ backgroundColor: "#273B97" }} className="vertical-menu">
      <div data-simplebar className="h-100 ">
        <div style={{ backgroundColor: "#273B97" }} id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {showSideBarLinks(dashboard)}
            {Offers_Access.includes(state?.user?.position) && (
              <li className="menu-title">Offers</li>
            )}
            {showSideBarLinks(offers)}
            {clients_Access.includes(state?.user?.position) && (
              <li className="menu-title">Clients</li>
            )}
            {showSideBarLinks(clients)}
            {others_Access.includes(state?.user?.position) && (
              <li className="menu-title">others</li>
            )}
            {showSideBarLinks(others)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
