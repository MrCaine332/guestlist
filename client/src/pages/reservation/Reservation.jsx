import React, {useEffect, useState} from 'react';
import './Reservation.scss'
import Card from "../../elements/card/Card";
import {useSelector} from "react-redux";
import Loader from "../../elements/loader/Loader";
import ReservationReady from "../../components/reservation-ready/ReservationReady";
import Form from "../../components/form/Form";

const Reservation = () => {
    const isFetching = useSelector(state => state.app.isFetching)
    const newReservation = useSelector(state => state.app.newReservation)

    return (
        <div className="reservation">
            <Card>
                { newReservation.reservationCode && <ReservationReady reservation={newReservation} /> }
                { !newReservation.reservationCode &&
                    <Form type={'reservation'}
                          title={'Reservation'}
                          submitBtnText={'Make a reservation'} />
                }
                { isFetching && <Loader /> }
            </Card>
        </div>
    );
};

export default Reservation;