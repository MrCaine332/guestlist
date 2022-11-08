import React, {useEffect, useState} from 'react';
import './Reservations.scss'
import AppButton from "../../elements/app-button/AppButton";
import PanelCard from "../../elements/panel-card/PanelCard";
import {useDispatch, useSelector} from "react-redux";
import appThunks from "../../redux/thunks/app-thunks";
import DeleteButton from "../../elements/delete-button/DeleteButton";
import Modal from "../../elements/modal/Modal";
import {Portal} from "react-portal";

const Reservations = () => {

    const dispatch = useDispatch()
    const reservations = useSelector(state => state.app.reservations)

    const [newModalOpened, setNewModalOpened] = useState(false)

    useEffect(() => {
        dispatch(appThunks.getReservations())
    }, [])

    return (
        <div className="reservations" id="reservations">
            <header className="reservations__header">
                <div className="reservations__header-info">
                    <div className="reservations__header-number">
                        <h1>{ reservations.length }</h1>
                    </div>
                    <div className="reservations__header-desc">
                        <h2>Reservations</h2>
                    </div>
                </div>
                <div className="reservations__header-buttons">
                    <AppButton is={'button'} onClick={() => setNewModalOpened(true)}>
                        Make a reservation
                    </AppButton>
                    <DeleteButton />
                </div>
            </header>
            <div className="reservations__body">
                { reservations.map(reservation =>
                    <PanelCard reservation={reservation} type={'reservation'} />) }
            </div>
            { newModalOpened &&
            <Portal node={document && document.getElementById('reservations')}>
                <Modal onClose={() => setNewModalOpened(false)}></Modal>
            </Portal> }


            {/*<div className="area reservations__total">*/}
            {/*    <div className="reservations__total-number">*/}
            {/*        <h1>{ reservations.length }</h1>*/}
            {/*    </div>*/}
            {/*    <div className="reservations__total-info">*/}
            {/*        <h2>Reservations</h2>*/}
            {/*        /!*<h3>for last 30 days</h3>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="area box-2">*/}
            {/*    <AppButton is={'button'} className={'panel-button'}>*/}
            {/*        Make a reservation*/}
            {/*    </AppButton>*/}
            {/*</div>*/}
            {/*/!*<div className="area box-3">*!/*/}
            {/*/!*    <AppButton type={'button'} className={'panel-button delete-button'}>*!/*/}
            {/*/!*        Delete all reservations*!/*/}
            {/*/!*    </AppButton>*!/*/}
            {/*/!*</div>*!/*/}
            {/*<div className="area box-4">*/}
            {/*    <AppButton is={'button'} className={'panel-button delete-button'}>*/}
            {/*        Delete all reservations*/}
            {/*    </AppButton>*/}
            {/*</div>*/}
            {/*<div className="area box-5">*/}
            {/*    { reservations.map((reservation) =>*/}
            {/*        <PanelCard type={'reservation'} key={reservation._id} reservation={reservation} />)}*/}
            {/*    <AppButton is={'button'} className={'panel-button delete-button'}>*/}
            {/*        Delete all reservations*/}
            {/*    </AppButton>*/}
            {/*</div>*/}
        </div>
    );
};

export default Reservations;