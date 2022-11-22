import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

export const NavigateWithParam: React.FC<{to: string, param: string}> = ({ to, param }) => {
    const params = useParams()
    return (
        <Navigate to={`${to}/${params[param]}`} />
    );
};

const Router = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    return (
        <>
            { !isAuthenticated &&
                <div className="container background">
                    <PublicRoutes />
                </div>
            }
            { isAuthenticated &&
                <div className="container">
                    <ProtectedRoutes />
                </div>
            }
        </>
    );
};

export default Router;