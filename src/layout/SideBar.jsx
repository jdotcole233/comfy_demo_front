import React, { useContext } from 'react'
import { dashboard, offers, clients, others } from "./adminRoutes";
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const SideBar = () => {
    const { state } = useContext(AuthContext)
    const { pathname } = useLocation()
    const showSideBarLinks = (routes) => {
        return routes.map((el, key) => el.roles.includes(state?.user?.position) ? (
            <li key={key}>
                <Link
                    to={el.link}
                    className={`waves-effect ${pathname === el.link ? "active" : ""}`}
                >
                    <i className={el.icon}></i>
                    <span>{el.name}</span>
                </Link>
            </li>
        ) : null);
    };

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100 ">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        {showSideBarLinks(dashboard)}
                        <li className="menu-title">Offers</li>
                        {showSideBarLinks(offers)}
                        <li className="menu-title">Clients</li>
                        {showSideBarLinks(clients)}
                        <li className="menu-title">others</li>
                        {showSideBarLinks(others)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
