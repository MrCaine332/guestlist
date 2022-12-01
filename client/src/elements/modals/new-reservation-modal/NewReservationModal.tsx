import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import ReservationReady from "../../../components/guests/reservation-content/reservation-ready/ReservationReady";
import Form from "../../form/Form";
import Loader from "../../loader/Loader";
import {FormInput} from "../../../app/types";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";
import {appActions} from "../../../app/redux/slices/app-slice";

const inputs: FormInput[] = [
	{ field: 'reserveeName', type: 'text', placeholder: 'Name Surname', required: true },
	{ field: 'numberOfPlaces', type: 'text', placeholder: 'Number of places', required: true },
	{ field: 'instagramAccount', type: 'text', placeholder: 'Instagram Account', required: true },
	{ field: 'comment', type: 'textarea', placeholder: 'Comment (Optional)', required: false },
]

const NewReservationModal = () => {
	const dispatch = useAppDispatch()

	const isFetching = useAppSelector(state => state.app.isFetching)
	const newReservation = useAppSelector(state => state.app.newReservation)
	const user = useAppSelector(state => state.auth.user)

	const [credentials, setCredentials] = useState({
		reserveeName: '',
		numberOfPlaces: '',
		instagramAccount: '',
		comment: '',
		prAgentId: user._id
	})

	useEffect(() => {
		return () => {
			dispatch(appActions.setNewReservation({}))
		}
	}, [])

	const [error, setError] = useState('')

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const err: any = await dispatch(reservationThunks.createReservation(credentials))
		if (err) {
			setError(err.response.data.message)
		} else {
			setError('')
		}
	}

	const onFormInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}

	return (
		<>
			{ newReservation.reservationCode &&
				<ReservationReady withBackBtn={false} reservation={newReservation} /> }
			{ !newReservation.reservationCode &&
                <Form inputs={inputs}
                      inputsState={credentials}
                      onSubmit={onFormSubmit}
                      onInputChange={onFormInputChange}
                      title={'Reservation'}
                      submitBtnText={'Reservation'}
                      withBackBtn={false}
                      error={error}
                />
			}
			{ isFetching && <Loader /> }
		</>
	);
};

export default NewReservationModal;