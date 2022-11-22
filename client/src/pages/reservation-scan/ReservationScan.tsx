import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Card from "../../elements/card/Card";
import Loader from "../../elements/loader/Loader";
import './ReservationScan.scss'
import ReservationScanInfo from "../../components/guests/reservation-scan-info/ReservationScanInfo";
import reservationThunks from "../../app/redux/thunks/reservation-thunks";
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import {appActions} from "../../app/redux/slices/app-slice";

const ReservationScan = () => {
	const id = useParams().id
	const dispatch = useAppDispatch()

	const checkedReservation = useAppSelector(state => state.app.checkedReservation)
	const isFetching = useAppSelector(state => state.app.isFetching)

	useEffect(() => {
		const controller = new AbortController
		if (id)
			dispatch(reservationThunks.getReservation(id, controller.signal))

		return () => controller?.abort();
	},[id])

	useEffect(() => {
		return () => {
			dispatch(appActions.setCheckedReservation({}))
		}
	}, [])

	return (
		<Card className="card_reservation-scan">
			{ !checkedReservation.reservationCode &&
				<div className="back__wrap">
                    <AppLink to={'/'}>
                        <Icon name="arrow-left" size={20} />
                        <span>Back</span>
                    </AppLink>
					<div>Reservation not found</div>
				</div>
			}
			{ checkedReservation.reservationCode &&
                <ReservationScanInfo reservation={checkedReservation} />
			}
			{ isFetching && <Loader /> }
		</Card>
	);
};

export default ReservationScan;