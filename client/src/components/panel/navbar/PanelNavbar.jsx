import React from 'react';
import './PanelNavbar.scss'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const PanelNavbar = ({ checkboxRef }) => {
    const role = useSelector(state => state.auth.user.role)

    const onNavLinkClick = () => {
        if (checkboxRef.current.checked) {
            checkboxRef.current.checked = false
        }
    }

    return (
        <nav className="panel__navbar">
            <NavLink to={`${role === 'ADMIN' ? 'admin-panel' : 'pr'}/reservations`}
                     className={({ isActive }) =>
                         (isActive ? 'panel__navbar-item panel__navbar-item_active' : 'panel__navbar-item')}
                     onClick={onNavLinkClick}>
                Reservations
            </NavLink>
            { role === 'ADMIN' &&
                <NavLink to={`admin-panel/accounts`}
                         className={({ isActive }) =>
                             (isActive ? 'panel__navbar-item panel__navbar-item_active' : 'panel__navbar-item')}
                         onClick={onNavLinkClick}>
                    Accounts
                </NavLink>
            }
        </nav>
    );
};

export default PanelNavbar;