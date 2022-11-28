import React, {useEffect} from 'react';
import './Dashboard.scss'
import AppButton from "../../../elements/app-button/AppButton";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";

const Dashboard = () => {

	const dispatch = useAppDispatch()

	const dashboardData = useAppSelector(state => state.app.dashboardData)
	const role = useAppSelector(state => state.auth.user.role)
	const isReservationOpened = useAppSelector(state => state.app.isReservationOpened)
	const isFetching = useAppSelector(state => state.app.isFetching)
	// const date = useMemo(() => {
	// 	return new Date(dashboardData.nextEvent || Date.now())
	// }, [dashboardData.nextEvent])

	useEffect(() => {
		const controller = new AbortController
		dispatch(reservationThunks.getDashboardData(controller.signal))
		return () => controller?.abort()
	}, [])

	const toggleReservation = () => {
		dispatch(reservationThunks.openCloseReservations())
	}

	return (
		<div className="dashboard">
			<div className="dashboard__content">
				<div className="dashboard__group">
					<div className="b">
						<h2>{ dashboardData.reservationsNum }</h2>
						<p>Reservations</p>
					</div>
					<div className="b">
						<h2>{ dashboardData.totalPlaces }</h2>
						<p>Places reserved</p>
					</div>
				</div>
				<div className="dashboard__group">
					{/*<div className="c">*/}
					{/*	<div>*/}
					{/*		<p>Next event:</p>*/}
					{/*		<h2>{ `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate() }/` +*/}
					{/*			`${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1 }/` +*/}
					{/*			`${date.getFullYear()}  ` +*/}
					{/*			`${date.getHours() < 10 ? '0' + date.getHours() : date.getHours() }:` +*/}
					{/*			`${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() }` }</h2>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className="c test_c">
						<p>Reservation is { isReservationOpened ? 'OPENED' : 'CLOSED' }</p>
						{ role === 'ADMIN' &&
                            <AppButton onClick={toggleReservation} className={'test'} disabled={isFetching}>
	                            { isReservationOpened ? 'Close reservations' : 'Open reservations' }
                            </AppButton>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;