import React, {ChangeEvent, useState} from 'react';
import './AccountInfoModal.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Account} from "../../../app/types";
import InfoEditable from "../../info-editable/InfoEditable";
import AppButton from "../../app-button/AppButton";
import accountThunks from "../../../app/redux/thunks/account-thunks";

const AccountInfoModal: React.FC<{ accountId: string, onClose: () => any }>
	= ({ accountId, onClose }) => {
	const dispatch = useAppDispatch()
	const isFetching = useAppSelector(state => state.app.isFetching)

	const account = useAppSelector(state =>
		state.app.accounts.find(account => account._id === accountId ))

	const [updatedAccount, setUpdatedAccount] = useState<Account>(account!)
	const [deleteMode, setDeleteMode] = useState(false)

	const onFieldChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
		if (account)
			setUpdatedAccount(prevState => ({...prevState, [field]: event.target.value}))
	}

	const onUpdate = () => {
		dispatch(accountThunks.updateAccount(updatedAccount))
	}

	const [password, setPassword] = useState('')
	const onChangePassword = () => {
		dispatch(accountThunks.updatePassword({ _id: updatedAccount._id, password}))
	}

	const onDelete = () => {
		if (account) {
			dispatch(accountThunks.deleteAccount(account._id))
		}
		onClose()
	}

	return (
		<div className="modal__reservation-info">
			{ account && deleteMode && <>
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
			{ updatedAccount && !deleteMode && <>
                <div className="modal__info-details">
                    <div className="details__item">
                        <InfoEditable value={updatedAccount.username}
                                      onChange={onFieldChange}
                                      field={'username'}
                                      title={'Username:'}
                                      editable={updatedAccount.role !== 'ADMIN'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedAccount.name}
                                      onChange={onFieldChange}
                                      field={'name'}
                                      title={'Name:'}
                                      editable={updatedAccount.role !== 'ADMIN'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedAccount.surname}
                                      onChange={onFieldChange}
                                      field={'surname'}
                                      title={'Surname:'}
                                      editable={updatedAccount.role !== 'ADMIN'}
                        />
                    </div>
                    <div className="details__item">
                        <InfoEditable value={updatedAccount.role}
                                      onChange={onFieldChange}
                                      field={'role'}
                                      title={'Role:'}
                                      editable={updatedAccount.role !== 'ADMIN'}
                        />
                    </div>
	                { updatedAccount.role !== 'ADMIN' &&
                        <div className="new-password">
	                        <h4>New password:</h4>
                            <input type="text" value={password}
                                   onChange={(e) => setPassword(e.target.value)} />
	                        <button onClick={onChangePassword}>Change</button>
                        </div>
	                }
                </div>
				{updatedAccount.role !== 'ADMIN' &&
                    <div className="modal__info-buttons">
                        <AppButton className="btn_delete"
                                   onClick={() => setDeleteMode(true)}
                                   disabled={isFetching}>
                            Delete
                        </AppButton>

                        <AppButton onClick={onUpdate} disabled={isFetching}>
                            Update
                        </AppButton>
                    </div>}
            </>}
		</div>
	);
};

export default AccountInfoModal;