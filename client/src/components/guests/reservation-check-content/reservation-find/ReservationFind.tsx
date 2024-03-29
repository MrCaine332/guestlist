import React, {ChangeEvent, FormEvent, useState} from 'react';
import './ReservationFind.scss'
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {FormInput} from "../../../../app/types";
import Form from "../../../../elements/form/Form";
import Loader from "../../../../elements/loader/Loader";
import reservationThunks from "../../../../app/redux/thunks/reservation-thunks";

const inputs: FormInput[] = [
    { field: 'reservationCode', type: 'text', placeholder: 'Reservation Code', required: true },
]

const ReservationFind = () => {
    const dispatch = useAppDispatch()

    const isFetching = useAppSelector(state => state.app.isFetching)

    const [credentials, setCredentials]
        = useState<{reservationCode: string}>({ reservationCode: '' })

    const [error, setError] = useState('')

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const err: any = await dispatch(reservationThunks.getReservationByCode(credentials.reservationCode))
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
            <Form inputs={inputs}
                  inputsState={credentials}
                  onSubmit={onFormSubmit}
                  onInputChange={onFormInputChange}
                  title={'Check'}
                  submitBtnText={'Check reservation'}
                  backLink={'/home'}
                  error={error}
            />
            { isFetching && <Loader /> }
        </>
    );
};

export default ReservationFind;