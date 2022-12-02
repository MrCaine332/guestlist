import React from 'react';
import './Navbar.scss'
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../../app/hooks";
import Icon from "../../../../elements/icon/Icon";

const Navbar = () => {
    const role = useAppSelector(state => state.auth.user.role)

    const onNavLinkClick = () => {
        const checkbox = document.getElementById('sidebar-checkbox') as HTMLInputElement
        checkbox.checked = false
    }

    return (
        <nav className="sidebar__navbar">
            { role === 'ADMIN' &&
                <NavLink to={'/panel/dashboard'}
                         className={({isActive}) =>
                             (`navbar__item ${isActive && 'navbar__item_active'}`)}
                         onClick={onNavLinkClick}>
                    <Icon name={'home'} size={24} color={'white'}/> Dashboard
                </NavLink>}
            <NavLink to={'/panel/reservations'}
                     className={({ isActive }) =>
                         (`navbar__item ${isActive && 'navbar__item_active'}`)}
                     onClick={onNavLinkClick}>
                <Icon name={'reservations'} size={24} color={'white'} /> Reservations
            </NavLink>
            { role === 'ADMIN' &&
                <NavLink to={'/panel/accounts'}
                         className={({ isActive }) =>
                             (`navbar__item ${isActive && 'navbar__item_active'}`)}
                         onClick={onNavLinkClick}>
                    <Icon name={'users'} size={24} color={'white'} /> Accounts
                </NavLink> }
        </nav>
    );
};

export default Navbar;