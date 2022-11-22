import React from 'react';
import Card from "../../elements/card/Card";
import './ReservationCheck.scss'
import Loader from "../../elements/loader/Loader";
import {useAppSelector} from "../../app/hooks";
import ReservationFind from "../../components/guests/reservation-check-content/reservation-find/ReservationFind";
import ReservationInfo from "../../components/guests/reservation-check-content/reservation-info/ReservationInfo";

const ReservationCheck = () => {

    const checkedReservation = useAppSelector(state => state.app.checkedReservation)
    const isFetching = useAppSelector(state => state.app.isFetching)

    // const [edit, setEdit] = useState(false)

    return (
        <Card className="card_reservation-check">
            { !checkedReservation.reservationCode && <ReservationFind /> }
            { checkedReservation.reservationCode &&
                <ReservationInfo reservation={checkedReservation} />
            }
            {/*{ checkedReservation.reservationCode && edit &&*/}
            {/*    // <EditForm setEdit={setEdit} />*/}
            {/*}*/}
            { isFetching && <Loader /> }
        </Card>
    );
};

export default ReservationCheck;