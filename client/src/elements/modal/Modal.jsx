import React from 'react';
import './Modal.scss'
import MakeReservation from "../../components/reservations/make-reservation-modal/MakeReservation";

const Modal = ({ children, onClose }) => {

    const test = () => {
        console.log('test')
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <MakeReservation onBackClick={onClose} />
            </div>
        </div>
    );
};

export default Modal;