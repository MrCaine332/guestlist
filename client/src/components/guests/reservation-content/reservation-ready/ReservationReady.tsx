import React from 'react';
import './ReservationReady.scss'
import {useAppDispatch} from "../../../../app/hooks";
import {Reservation} from "../../../../app/types";
import {appActions} from "../../../../app/redux/slices/app-slice";
import AppLink from "../../../../elements/app-link/AppLink";
import Icon from "../../../../elements/icon/Icon";
// @ts-ignore
import checkIcon from '../../../../resources/icons/check.png'


const ReservationReady: React.FC<{ reservation: Reservation, withBackBtn?: boolean }>
    = ({ reservation, withBackBtn = true }) => {
    const dispatch = useAppDispatch()

    const onGoBack = () => {
        dispatch(appActions.setNewReservation({}))
    }

    return (
        <div className="reservation__ready">
            <div className="ready__header">
                { withBackBtn &&
                    <AppLink to={'/'} onClick={onGoBack}>
                        <Icon name="arrow-left" size={20}/>
                        <span>Back</span>
                    </AppLink>
                }
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
            </div>
        </div>
    );
};

export default ReservationReady;