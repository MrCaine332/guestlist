import React from 'react';
import './PanelUserInfo.scss'
import {useSelector} from "react-redux";

const PanelUserInfo = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="panel__user-info">
            <h2>
                { user.role === 'ADMIN' ? 'ADMIN' : 'PR'} PANEL
            </h2>
            <div className="panel__avatar">
            </div>
            <h3 className="panel__name">{ `${user.name} ${user.surname ? user.surname : ''}` }</h3>
            <span>{ user.username }</span>
        </div>
    );
};

export default PanelUserInfo;