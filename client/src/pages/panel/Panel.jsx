import React, {useEffect, useRef} from 'react';
import './Panel.scss'
import PanelUserInfo from "../../components/panel/user-info/PanelUserInfo";
import PanelNavbar from "../../components/panel/navbar/PanelNavbar";
import PanelSignOut from "../../components/panel/logout/PanelSignOut";
import {Outlet} from "react-router-dom";

const Panel = () => {
    const checkboxRef = useRef(null)

    return (
        <div className="panel">
            <input ref={checkboxRef} type="checkbox" id="nav-checkbox" hidden />
            <label htmlFor="nav-checkbox" className="menu">
                <div className="a">X</div>
                <div className="b">-{'>'}</div>
            </label>
            <div className="panel__sidebar">
                <PanelUserInfo />
                <PanelNavbar checkboxRef={checkboxRef} />
                <PanelSignOut />
            </div>
            <div className="panel__main">
                <Outlet />
            </div>
        </div>
    );
};

export default Panel;