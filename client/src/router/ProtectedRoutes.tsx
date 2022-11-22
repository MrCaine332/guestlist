import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Panel from "../pages/panel/Panel";
import {useAppSelector} from "../app/hooks";
import Reservations from "../components/panel/reservations/Reservations";
import Dashboard from "../components/panel/dashboard/Dashboard";
import Accounts from "../components/panel/accounts/Accounts";
import Scan from "../components/scan/Scan";

const ProtectedRoutes = () => {
	const role = useAppSelector(state => state.auth.user.role)

	return (
		<Routes>
			{ (role === 'ADMIN' || role === 'PR_AGENT') && <>
                <Route path={'/panel'} element={<Panel />}>
                    <Route index element={<Navigate to={'dashboard'} replace />} />
                    <Route path={'dashboard'} element={<Dashboard />} />
                    <Route path={'reservations'} element={<Reservations />} />
	                { role === 'ADMIN' && <Route path={'accounts'} element={<Accounts />} /> }
                    <Route path={'*'} element={<Navigate to={'dashboard'} replace />} />
                </Route>
                <Route path={'*'} element={<Navigate to={'/panel'} replace/>} />
			</> }
			{ (role === 'CHECKER' || role === 'ADMIN') && <>
                <Route path={'/scan/'} element={<Scan />} />
                <Route path={'/scan/:id'} element={<Scan />} />
                <Route path={'*'} element={<Navigate to={'/scan/'} replace />} />
            </> }
		</Routes>
	);
};

export default ProtectedRoutes;