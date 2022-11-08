import React from 'react';
import './PanelSignOut.scss'
import {useDispatch} from "react-redux";
import authThunks from "../../../redux/thunks/auth-thunks";

const PanelSignOut = () => {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(authThunks.logout())
    }

    return (
        <div className="panel__logout-wrap">
            <div role={'button'} className="panel__logout" onClick={onLogout}>
                <h1>Sign Out</h1>
            </div>
        </div>
    );
};

export default PanelSignOut;