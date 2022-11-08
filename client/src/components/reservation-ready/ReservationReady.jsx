import React, {useEffect, useMemo} from 'react';
import './ReservationReady.scss'
import checkIcon from '../../resources/icons/check.png'
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import {useDispatch} from "react-redux";
import {appActions} from "../../app/redux/slices/app-slice";

const ReservationReady = ({ reservation }) => {
    const dispatch = useDispatch()

    const date = useMemo(() => new Date(reservation.createdAt), [reservation])

    const onGoBack = () => {
        dispatch(appActions.setNewReservation({}))
    }

    return (
        <div className="reservation__ready">
            <div className="ready__header">
                <AppLink to={'/'} onClick={onGoBack}>
                    <Icon name="arrow-left" size={20} />
                    <span>Back</span>
                </AppLink>
                <img src={checkIcon} alt=""/>
                <p>Your reservation has been successfully registered.</p>
            </div>
            <hr className="separation__line"/>
            <div className="ready__info">
                <div className="ready__details-top">
                    <p>Your reservation code:</p>
                    <h2>{ reservation.reservationCode }</h2>
                </div>
                <div>
                    <img src={reservation.qrCode} alt=""/>
                </div>
                {/*<div className="ready__details">*/}
                {/*    <div className="ready__details-top">*/}
                {/*        <p>Your reservation code:</p>*/}
                {/*        <h2>{ reservation.reservationCode }</h2>*/}
                {/*    </div>*/}
                {/*    <hr className="ready__details-line"/>*/}
                {/*    <div className="ready__details-bottom">*/}
                {/*        <p>*/}
                {/*            <b>{ reservation.numberOfPlaces }</b>*/}
                {/*            { Number(reservation.numberOfPlaces) === 1 ? ' place' : ' places'}*/}
                {/*        </p>*/}
                {/*        <p>*/}
                {/*            Instagram: <b>{ reservation.instagramAccount}</b>*/}
                {/*        </p>*/}
                {/*        <div className="ready__details-datetime">*/}
                {/*            <p>Reservation date and time:</p>*/}
                {/*            <p>*/}
                {/*                <b>*/}
                {/*                    { `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`*/}
                {/*                        + `${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/`*/}
                {/*                        + `${date.getFullYear()}` }*/}
                {/*                </b>&nbsp;&nbsp;*/}
                {/*                <b>*/}
                {/*                    { `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:`*/}
                {/*                        + `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}*/}
                {/*                </b>*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ReservationReady;