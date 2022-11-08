import React, {useMemo} from 'react';
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import {useDispatch} from "react-redux";
import {appActions} from "../../redux/slices/app-slice";
import AppInput from "../../elements/app-input/AppInput";
import AppButton from "../../elements/app-button/AppButton";
import './ReservationInfo.scss'

const ReservationInfo = ({ reservation, setEdit }) => {
    const dispatch = useDispatch()

    const date = useMemo(() => new Date(reservation.createdAt), [reservation])

    const onGoBack = () => {
        dispatch(appActions.setCheckedReservation({}))
    }

    const onOpenEdit = () => {
        setEdit(true)
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
                    <h2>{ reservation.reservationCode }</h2>
                </div>
                <div>
                    <img src={reservation.qrCode} alt=""/>
                </div>
                <div className="reservation-info__details">
                    <span>Name: <b>{ reservation.reserveeName }</b></span>
                    <span>Instagram: <b>{ reservation.instagramAccount }</b></span>
                    <span>Places: <b>{ reservation.numberOfPlaces }</b></span><br/>
                    <span>Reservation date: <br/>
                        { `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`
                            + `${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/`
                            + `${date.getFullYear()}` }
                        &nbsp;
                        { `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:`
                            + `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
                        </span>
                </div>

                <AppButton is={'button'} onClick={onOpenEdit}>
                    Edit reservation
                </AppButton>
            </div>
        </div>
    );
};

export default ReservationInfo;