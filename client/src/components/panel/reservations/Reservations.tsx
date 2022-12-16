import React, {useEffect, useMemo, useState} from 'react';
import './Reservations.scss'
import {useAppDispatch, useAppSelector, useWindowSize} from "../../../app/hooks";
import {DataGrid} from "@mui/x-data-grid";
import {Reservation} from "../../../app/types";
import {Portal} from "@mui/material";
import AppButton from "../../../elements/app-button/AppButton";
import Modal from "../../../elements/modals/Modal";
import Icon from "../../../elements/icon/Icon";
import NewReservationModal from "../../../elements/modals/new-reservation-modal/NewReservationModal";
import ReservationInfoModal from "../../../elements/modals/reservation-info-modal/ReservationInfoModal";
import DeleteAllModal from "../../../elements/modals/delete-all-modal/DeleteAllModal";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";

const Reservations = () => {

    const role = useAppSelector(state => state.auth.user.role)
    const isFetching = useAppSelector(state => state.app.isFetching)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const controller = new AbortController
        dispatch(reservationThunks.getReservations(controller.signal))
        return () => controller?.abort()
    }, [])

    const reservations = useAppSelector(state => state.app.reservations)
    const totalPlaces = useMemo(() => {
        let places = 0
        reservations.map(reservation => { places += Number(reservation.numberOfPlaces) })
        return places
    }, [reservations])

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalType, setModalType] =
        useState<'delete' | 'new' | 'info' | null>(null)
    const [modalReservationId, setModalReservationId] = useState<string | null>(null)

    const size = useWindowSize()

    const renderDate = (args: any) => {
        const date = new Date(args.value)
        const string = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate() }/` +
            `${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1 }/` +
            `${date.getFullYear()}  ` +
            `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours() }:` +
            `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() }`
        return string
    }

    const renderUsed = (args: any) => {
        if (args.row.reservationUsed)
            return `Yes, ${args.row.peopleAttended} people`
        if (!args.row.reservationUsed)
            return `No${args.row.peopleAttended !== 0 ? `, ${args.row.peopleAttended} people` : ''}`
        return ''
    }

    const renderAgent = (args: any) => {
        if (!args.value)
            return 'None'
        return args.value.name + ' ' + args.value.surname
    }

    const columns = [
        { field: 'reservationCode', headerName: 'CODE', flex: 1 },
        { field: 'numberOfPlaces', headerName: 'PLACES', type: 'number', flex: 1, },
        { field: 'reserveeName', headerName: 'RESERVEE NAME', flex: 1, hide: size.windowWidth < 500 },
        { field: 'instagramAccount', headerName: 'INSTAGRAM', flex: 1 },
        { field: 'createdAt', headerName: 'RESERVATION DATE', flex: 1, renderCell: renderDate, hide: size.windowWidth < 1200 },
        { field: 'reservationUsed', headerName: 'ATTENDED', renderCell: renderUsed, flex: 1},
        { field: 'prAgentId', headerName: 'PR AGENT', renderCell: renderAgent, flex: 1, hide: size.windowWidth < 1200}
    ]

    const closeModal = () => {
        setOpenModal(false)
        setModalType(null)
        setModalReservationId(null)
    }

    const onRowClick = (args: any) => {
        setOpenModal(true)
        setModalReservationId(args.id)
        setModalType('info')
    }

    const onDownload = () => {
        dispatch(reservationThunks.downloadCSVReservations())
    }

    return (
        <div className="reservations">
            <div className="reservations__header">
                <div className="reservations__total">
                    <div className="total__item">
                        <h2>{ reservations.length }</h2>
                        <p>Reservations</p>
                    </div>
                    <hr/>
                    <div className="total__item">
                        <h2>{ totalPlaces }</h2>
                        <p>places total</p>
                    </div>
                </div>
                <div className="reservations__buttons">
                    <AppButton onClick={() => {setOpenModal(true);setModalType('new')}}>
                        { size.windowWidth > 450 ? 'Make a reservation' : 'Make new'}
                    </AppButton>
                    { role === 'ADMIN' &&
                        <AppButton className="download__btn" onClick={onDownload}>
                        <Icon name={'download'} size={30} color={'gray'} />
                    </AppButton> }
                    { role === 'ADMIN' &&
                    <AppButton onClick={() => {setOpenModal(true);setModalType('delete')}}
                        className="delete__btn">
                        <Icon name={'delete'} color={'red'} size={30} />
                    </AppButton> }
                </div>
            </div>
            <div className="reservations__table_wrap">
                <DataGrid rows={reservations}
                          loading={isFetching}
                          columns={columns}
                          getRowId={(reservation: Reservation) => reservation._id}
                          onRowDoubleClick={onRowClick}
                          hideFooter={true}
                          getCellClassName={() => 'cell'}
                />
            </div>
            { openModal &&
                <Portal container={document && document.getElementById('main')} >
                    <Modal onClose={closeModal}>
                        { modalType === 'delete' && <DeleteAllModal type={'reservations'} onClose={closeModal} /> }
                        { modalType === 'new' && <NewReservationModal /> }
                        { modalType === 'info' && modalReservationId
                            && <ReservationInfoModal
                                reservationId={modalReservationId}
                                onClose={closeModal} /> }
                    </Modal>
                </Portal>
            }
        </div>
    );
};

export default Reservations;