import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Reservation from "../pages/reservation/Reservation";
import ReservationCheck from "../pages/reservation-check/ReservationCheck";
import ReservationScan from "../pages/reservation-scan/ReservationScan";
import {NavigateWithParam} from "./Router";

const PublicRoutes = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={'/home'} element={<Home />} />
			<Route path={'/login'} element={<Login />} />
			<Route path={'/reservation'} element={<Reservation />} />
			{/*<Route path={'/reservation/ref/:id'} element={<Reservation />} />*/}
			<Route path={'/reservation/check'} element={<ReservationCheck />} />
			<Route path={'/reservation/scan/:id'} element={<ReservationScan />} />
			<Route path={'/scan/:id'}
			       element={<NavigateWithParam to={'/reservation/scan'} param={'id'} />} />
			<Route path={'*'} element={<Navigate to={'/home'} replace/>} />
		</Routes>
	);
};

export default PublicRoutes;