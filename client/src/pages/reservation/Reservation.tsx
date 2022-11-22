import React from 'react';
import './Reservation.scss'
import Card from "../../elements/card/Card";
import ReservationContent from "../../components/guests/reservation-content/ReservationContent";
import {useParams} from "react-router-dom";

const Reservation: React.FC = () => {
    const id = useParams().id

    return (
        <Card className="card_reservation">
            <ReservationContent prAgentId={id} />
        </Card>
    );
};

export default Reservation;