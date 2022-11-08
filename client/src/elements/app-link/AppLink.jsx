import React from 'react';
import {Link} from "react-router-dom";
import './AppLink.scss'

const AppLink = ({ to, children, withUnderline = false, onClick}) => {
    return (
        <>
            { to &&
                <Link to={to} className={`app-link ${withUnderline && 'underlined'}`} onClick={onClick}>
                    { children }
                </Link>
            }
            { !to &&
                <div className={`app-link ${withUnderline && 'underlined'}`} onClick={onClick}>
                    { children }
                </div>
            }
        </>
    );
};

export default AppLink;