import React, {useState} from 'react';
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import AppInput from "../../elements/app-input/AppInput";
import AppButton from "../../elements/app-button/AppButton";
import {useDispatch, useSelector} from "react-redux";
import appThunks from "../../redux/thunks/app-thunks";
import './ReservationFind.scss'

const ReservationFind = () => {
    const dispatch = useDispatch()
    const checkedReservation = useSelector(state => state.app.checkedReservation)

    const [reservationCode, setReservationCode] = useState('')

    const [error, setError] = useState('')

    const onFindReservation = async () => {
        if (reservationCode) {
            const error = await dispatch(appThunks.getReservation(reservationCode))
            if (error) {
                setError(error.response.data.message)
            } else {
                setError('')
            }
        } else {
            setError('Please, enter reservation code')
        }
    }

    return (
        <div className="reservation-find__wrap">
            <div className="reservation-find__header">
                <AppLink to={'/'}>
                    <Icon name="arrow-left" size={20} />
                    <span>Back</span>
                </AppLink>
                <h1>Check Reservation</h1>
            </div>
            <div className="reservation-find__body">
                <div className="reservation-find__input">
                    <AppInput placeholder="Reservation code"
                              value={reservationCode}
                              onChange={(e) => setReservationCode(e.target.value)} />
                    <p className="form__error">{ error }</p>
                </div>
                <AppButton is={'button'} onClick={onFindReservation}>
                    Find reservation
                </AppButton>
            </div>
        </div>
    );
};

export default ReservationFind;