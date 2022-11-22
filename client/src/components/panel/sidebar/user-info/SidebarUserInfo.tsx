import React from 'react';
import './SidebarUserInfo.scss'
import {useAppSelector} from "../../../../app/hooks";

const SidebarUserInfo = () => {
    const user = useAppSelector(state => state.auth.user)

    return (
        <div className="sidebar__user-info">
            <h2>
                { user.role === 'ADMIN' ? 'ADMIN' : 'PR'} PANEL
            </h2>
            <div className="sidebar__avatar">
            </div>
            <div className="sidebar__names">
                <h3>{ user.name } { user.surname }</h3>
                <p>{ user.username }</p>
            </div>
        </div>
    );
};

export default SidebarUserInfo;