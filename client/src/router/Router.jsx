import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Reservation from "../pages/reservation/Reservation";
import Login from "../pages/login/Login";
import Panel from "../pages/panel/Panel";
import {useSelector} from "react-redux";
import Reservations from "../components/reservations/Reservations";
import Accounts from "../components/accounts/Accounts";
import Test from "../pages/test/Test";
import Test2 from "../pages/test2/Test2";
import ReservationCheck from "../pages/reservation-check/ReservationCheck";

const Router = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const role = useSelector(state => state.auth.user.role)

    return (
        <Routes>
            { !isAuthenticated && <>
                <Route index element={<Home />} />
                <Route path={'/home'} element={<Home />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/reservation'} element={<Reservation />} />
                <Route path={'/reservation/check'} element={<ReservationCheck />} />
                <Route path={'/reservation/ref/:id'} element={<Reservation />} />
                <Route path={'/reservation/:id'} element={<Test2 />} />
                <Route path={'*'} element={<Navigate to={'/home'} replace/>} />
            </> }
            { isAuthenticated && <>
                <Route path={'/panel'} element={<Panel />}>
                    <Route index element={<Navigate to={role === 'ADMIN' ? 'admin-panel' : 'pr'} replace/>} />
                    { role === 'ADMIN' &&
                        <Route path={'admin-panel'} >
                            <Route index element={<Navigate to={'reservations'} replace/>} />
                            <Route path={'reservations'} element={<Reservations />} />
                            <Route path={'accounts'} element={<Accounts />} />
                            <Route path={'*'} element={<Navigate to={'reservations'} replace/>} />
                        </Route> }
                    { role === 'PR_AGENT' &&
                        <Route path={'pr/'} >
                            <Route index element={<Navigate to={'reservations'} replace/>} />
                            <Route path={'reservations'} element={<>rdf</>} />
                            <Route path={'*'} element={<Navigate to={'reservations'} replace/>} />
                        </Route> }
                    <Route path={'*'} element={<Navigate to={role === 'ADMIN' ? 'admin-panel' : 'pr'} replace/>} />
                </Route>
                <Route path={'*'} element={<Navigate to={'/panel'} replace/>} />
            </> }
        </Routes>
    );
};

export default Router;