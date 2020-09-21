import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import NotifcIcon from "./NotifcIcon";


export const Navbar = () => {
    const { state, signOut } = useContext(AuthContext);
    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div style={{ backgroundColor: "#273B97" }} className="navbar-brand-box">
                        <Link to="/admin/" className="logo logo-light">
                            <span className="logo-sm">
                                <img
                                    src={require("../assets/visal-sm-logo.JPG")}
                                    alt=""
                                    height="40"
                                    width="40"
                                />
                            </span>
                            <span className="logo-lg">
                                <img
                                    src={require("../assets/visal-logo-big.png")}
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
                    <div className="dropdown d-none d-lg-inline-block ml-1">
                        <button
                            type="button"
                            className="btn header-item noti-icon waves-effect"
                            data-toggle="fullscreen"
                        >
                            <i className="bx bx-fullscreen"></i>
                        </button>
                    </div>

                    <NotifcIcon state={state} />

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
                            <span className="rounded-circle header-profile-user d-flex justify-content-center align-items-center  rounded-circle bg-soft-primary text-primary font-size-12">
                                {state.user?.employee?.emp_abbrv}
                            </span>
                            <span className="d-none d-xl-inline-block ml-1">
                                {state.user?.employee?.employee_first_name}
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
                            {/* <Link
                                to={{ pathname: "/admin/settings" }}
                                className="dropdown-item"
                            >
                                <i className="bx bx-cog font-size-16 align-middle mr-1"></i>
                                Settings
                            </Link> */}

                            <div className="dropdown-divider"></div>
                            <button
                                onClick={signOut}
                                className="dropdown-item text-danger"
                            >
                                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                    Logout
                  </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
