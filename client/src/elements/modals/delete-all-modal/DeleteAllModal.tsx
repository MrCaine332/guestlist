import React, {useState} from 'react';
import './DeleteAllModal.scss'
import AppButton from "../../app-button/AppButton";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import accountThunks from "../../../app/redux/thunks/account-thunks";
import reservationThunks from "../../../app/redux/thunks/reservation-thunks";

const DeleteAllModal: React.FC<{ type: string, onClose: () => any }> = ({ type, onClose }) => {
	const dispatch = useAppDispatch()
	const [confirmMode, setConfirmMode] = useState(false)
	const isFetching = useAppSelector(state => state.app.isFetching)

	const onConfirm = () => {
		if (type === 'accounts') {
			dispatch(accountThunks.deleteAllAccounts())
		}
		if (type === 'reservations') {
			dispatch(reservationThunks.deleteAllReservations())
		}
		onClose()
	}

	return (
		<div className="delete-all">
			<h3>Delete all {type === 'accounts' ? 'non-admin accounts' : 'reservations'}</h3>
			<p className="delete-all__caution">
				Attention, this action is irreversible.
				Make sure you save and/or download records so you don't lose any information.
			</p>
			{ !confirmMode &&
			<div className="delete-all__buttons">
				<AppButton className="btn_delete"
				           onClick={() => setConfirmMode(true)}
				           disabled={isFetching}>
					Delete
				</AppButton>
				<AppButton onClick={onClose} disabled={isFetching}>
					Cancel
				</AppButton>
			</div> }
			{ confirmMode && <>
                <h3>Are you sure you want to do this?</h3>
                <div className="delete-all__buttons">
                    <AppButton className="btn_delete"
                               onClick={onConfirm}
                               disabled={isFetching}>
                        Delete
                    </AppButton>
                    <AppButton onClick={() => setConfirmMode(false)} disabled={isFetching}>
                        Cancel
                    </AppButton>
                </div>
			</> }
		</div>
	);
};

export default DeleteAllModal;