import React, {ChangeEvent, useState} from 'react';
import './ReservationInfoModal.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Reservation} from "../../../app/types";
import InfoEditable from "../../info-editable/InfoEditable";
import AppButton from "../../app-button/AppButton";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";

const ReservationInfoModal: React.FC<{ reservationId: string, onClose: () => any }>
	= ({ reservationId, onClose }) => {
	const dispatch = useAppDispatch()
	const isFetching = useAppSelector(state => state.app.isFetching)

	const reservation = useAppSelector(state =>
		state.app.reservations.find(reservation => reservation._id === reservationId))

	const [updatedReservation, setUpdatedReservation] = useState<Reservation>(reservation!)
	const [deleteMode, setDeleteMode] = useState(false)

	const onFieldChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
		if (reservation)
			setUpdatedReservation(prevState => ({...prevState, [field]: event.target.value}))
	}

	const onUpdate = () => {
		dispatch(reservationThunks.updateReservation(updatedReservation))
	}

	const onDelete = () => {
		if (reservation) {
			dispatch(reservationThunks.deleteReservation(reservation._id))
		}
		onClose()
	}

	return (
		<div className="modal__reservation-info">
			{ reservation && deleteMode && <>
				<div className="modal__caution">Are you sure you want to delete this reservation?</div>
                <div className="modal__info-buttons">
                    <AppButton className="btn_delete"
                               onClick={onDelete}
                               disabled={isFetching}>
                        Delete
                    </AppButton>
                    <AppButton onClick={() => setDeleteMode(false)} disabled={isFetching}>
                        Cancel
                    </AppButton>
                </div>
			</> }
			{ updatedReservation && !deleteMode && <>
                <h2>{reservation?.reservationCode}</h2>
                <div className="modal__info-details">
                    <div className="details__item">
                        <InfoEditable value={updatedReservation.reserveeName}
                                      onChange={onFieldChange}
                                      field={'reserveeName'}
                                      title={'Reservee name:'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={String(updatedReservation.numberOfPlaces)}
                                      onChange={onFieldChange}
                                      field={'numberOfPlaces'}
                                      title={'Number of places:'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedReservation.instagramAccount}
                                      onChange={onFieldChange}
                                      field={'instagramAccount'}
                                      title={'Instagram account:'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedReservation.comment}
                                      onChange={onFieldChange}
                                      field={'comment'}
                                      title={'Comment:'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedReservation.reservationUsed
	                        ? `Yes, ${updatedReservation.peopleAttended}` : 'No'}
                                      onChange={onFieldChange}
                                      field={'reservationUsed'}
                                      title={'Reservation used:'}
                                      editable={false}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedReservation.prAgentId
			                ? `${updatedReservation.prAgentId.name} ${updatedReservation.prAgentId.surname}`
	                        : 'None'}
                                      onChange={onFieldChange}
                                      field={'prAgentId'}
                                      title={'PrAgent:'}
                                      editable={false}
                        />
                    </div>
                </div>
				<div className="modal__info-buttons">
					<AppButton className="btn_delete"
					           onClick={() => setDeleteMode(true)}
                               disabled={isFetching}>
						Delete
					</AppButton>
					<AppButton onClick={onUpdate} disabled={isFetching}>
						Update
					</AppButton>
				</div>
            </>}

		</div>
	);
};

export default ReservationInfoModal;