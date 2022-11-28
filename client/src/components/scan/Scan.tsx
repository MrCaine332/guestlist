import React, {useEffect, useState} from 'react';
import './Scan.scss'
import AppButton from "../../elements/app-button/AppButton";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import authThunks from "../../app/redux/thunks/auth-thunks";
import Card from "../../elements/card/Card";
import AppLink from "../../elements/app-link/AppLink";
import {useParams} from "react-router-dom";
import reservationThunks from "../../app/redux/thunks/reservation-thunks";
import {appActions} from "../../app/redux/slices/app-slice";
import AppInput from "../../elements/app-input/AppInput";

const Scan = () => {
	const id = useParams().id
	const dispatch = useAppDispatch()

	const [attendeesNumber, setAttendeesNumber] = useState<string>('')

	const [submitted, setSubmitted] = useState<boolean>(false)

	const checkedReservation = useAppSelector(state => state.app.checkedReservation)

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

	const submitReservation = () => {
		if (attendeesNumber) {
			dispatch(reservationThunks.updateReservation({
				_id: id,
				reservationUsed: true,
				peopleAttended: Number(attendeesNumber)
			}))
			setSubmitted(true)
		} else {
			alert('Enter attendees number')
		}
	}

	return (
		<div className="scan__wrap">
			<Card className="scan">
				{ checkedReservation.reservationCode && !submitted &&
                    <div className="scan__content">
                        <div className="scan__details">
                            <h2>{checkedReservation.reservationCode}</h2>
                            <p>Instagram: {checkedReservation.instagramAccount}</p>
                            <p>Reservee name: {checkedReservation.reserveeName}</p>
                            <h1>{checkedReservation.numberOfPlaces}</h1>
                            <p>Places</p>
                        </div>
                        <AppInput value={attendeesNumber}
                                  type={'number'}
                                  onChange={(e) => setAttendeesNumber(e.target.value)}
                                  required={true}
                                  placeholder={'Number of attendees'}/>
                        <AppButton onClick={submitReservation}>Submit</AppButton>
                        <AppLink onClick={() => dispatch(authThunks.logout())}>Logout</AppLink>
                    </div> }
				{ !checkedReservation.reservationCode && !submitted &&
					<div>
						Please, scan reservation with your camera
                        <AppLink onClick={() => dispatch(authThunks.logout())}>Logout</AppLink>
					</div> }
				{ submitted &&
                    <div className="submitted">
                        {/*<AppLink to={'/'} >*/}
                        {/*    <Icon name="arrow-left" size={20} />*/}
                        {/*    <span>Back</span>*/}
                        {/*</AppLink>*/}
						<h1>Submitted!</h1>
                        <AppLink onClick={() => dispatch(authThunks.logout())}>Logout</AppLink>
                    </div>}
			</Card>
		</div>
	);
};

export default Scan;