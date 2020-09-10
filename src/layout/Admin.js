/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createContext, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SideBar from "./SideBar";
import { Navbar } from "./Navbar";
import AdminContent from "./AdminContent";

export const AdminContext = createContext();

export default React.memo(() => {
  const { state } = useContext(AuthContext);
  const { pathname } = useLocation();

  return !state?.user ? (
    <Redirect to={{ pathname: "/auth", state: { pathname } }} />
  ) : (
    <AdminContext.Provider>
      <div id="layout-wrapper">
        <Navbar />
        <SideBar />
        <AdminContent />
      </div>
    </AdminContext.Provider>
  );
});
