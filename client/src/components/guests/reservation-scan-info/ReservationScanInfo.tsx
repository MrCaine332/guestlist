import React, {useMemo} from 'react';
import AppLink from "../../../elements/app-link/AppLink";
import Icon from "../../../elements/icon/Icon";
import {Reservation} from "../../../app/types";
import {useAppDispatch} from "../../../app/hooks";
import {appActions} from "../../../app/redux/slices/app-slice";

const ReservationScanInfo: React.FC<{ reservation: Reservation }> = ({ reservation }) => {

	const dispatch = useAppDispatch()

	const date = useMemo(() => new Date(reservation.createdAt), [reservation])

	const onGoBack = () => {
		dispatch(appActions.setCheckedReservation({}))
	}

	return (
		<div className="reservation-info__wrap">
			<div className="reservation-info__header">
				<AppLink to={'/'} onClick={onGoBack}>
					<Icon name="arrow-left" size={20} />
					<span>Back</span>
				</AppLink>
			</div>
			<div className="reservation-info__body">
				<div>
					<p>Reservation code:</p>
					<h2>{ reservation.reservationCode.substring(0,3) }*******</h2>
				</div>
				<div className="reservation-info__details">
					<span>Name: <b>{ reservation.reserveeName }</b></span>
					<span>Instagram: <b>{ reservation.instagramAccount }</b></span>
					<span>Places: <b>{ reservation.numberOfPlaces }</b></span><br/>
					<span>Reservation date: <br/>
						{ `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`
							+ `${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}/`
							+ `${date.getFullYear()}` }
						&nbsp;
						{ `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:`
							+ `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
                        </span>
				</div>

				{/*<AppButton>*/}
				{/*    Edit reservation*/}
				{/*</AppButton>*/}
			</div>
		</div>
	);
};

export default ReservationScanInfo;