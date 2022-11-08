import React, {useEffect, useState} from 'react';
import Card from "../../elements/card/Card";
import './ReservationCheck.scss'
import ReservationFind from "../../components/reservation-find/ReservationFind";
import {useSelector} from "react-redux";
import Loader from "../../elements/loader/Loader";
import ReservationInfo from "../../components/reservation-info/ReservationInfo";
import EditForm from "../../components/edit-form/EditForm";

const ReservationCheck = () => {

    const checkedReservation = useSelector(state => state.app.checkedReservation)
    const isFetching = useSelector(state => state.app.isFetching)

    const [edit, setEdit] = useState(false)

    return (
        <div className="reservation-check">
            <Card>
                { !checkedReservation.reservationCode && <ReservationFind /> }
                { checkedReservation.reservationCode && !edit &&
                    <ReservationInfo reservation={checkedReservation}
                                     setEdit={setEdit}/>
                }
                { checkedReservation.reservationCode && edit &&
                    <EditForm setEdit={setEdit} />
                }
                { isFetching && <Loader /> }
            </Card>
        </div>
    );
};

export default ReservationCheck;