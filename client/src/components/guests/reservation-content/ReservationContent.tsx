import React, {ChangeEvent, FormEvent, useState} from 'react';
import Form from "../../../elements/form/Form";
import Loader from "../../../elements/loader/Loader";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {FormInput} from "../../../app/types";
import ReservationReady from "./reservation-ready/ReservationReady";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";

const inputs: FormInput[] = [
	{ field: 'reserveeName', type: 'text', placeholder: 'Name Surname', required: true },
	{ field: 'numberOfPlaces', type: 'text', placeholder: 'Number of places', required: true },
	{ field: 'instagramAccount', type: 'text', placeholder: 'Instagram Account', required: true },
	{ field: 'comment', type: 'textarea', placeholder: 'Comment (Optional)', required: false },
]

interface IReservationState {
	reserveeName: string
	numberOfPlaces: string
	instagramAccount: string
	comment?: string
	prAgentId?: string
}

const ReservationContent: React.FC<{ prAgentId?: string }> = ({ prAgentId }) => {
	const dispatch = useAppDispatch()

	const isFetching = useAppSelector(state => state.app.isFetching)
	const newReservation = useAppSelector(state => state.app.newReservation)

	const [credentials, setCredentials] = useState<IReservationState>(
			{reserveeName: '',
				numberOfPlaces: '',
				instagramAccount: '',
				comment: '',
				prAgentId: prAgentId })

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
			{ newReservation.reservationCode && <ReservationReady reservation={newReservation} /> }
			{ !newReservation.reservationCode &&
                <Form inputs={inputs}
                      inputsState={credentials}
                      onSubmit={onFormSubmit}
                      onInputChange={onFormInputChange}
                      title={'Reservation'}
                      submitBtnText={'Reservation'}
                      backLink={'/home'}
                      error={error}
                />
			}
			{ isFetching && <Loader /> }
		</>
	);
};

export default ReservationContent;