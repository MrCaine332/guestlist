import React from 'react';
import './Panel.scss'
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/panel/sidebar/Sidebar";

const Panel = () => {

    return (
        <div className="panel">
            <Sidebar />
            <main className="panel__main" id="main">
                <Outlet />
            </main>
        </div>
    );
};

export default Panel;