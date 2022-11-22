import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, useWindowSize} from "../../../app/hooks";
import {DataGrid} from "@mui/x-data-grid";
import {Account} from "../../../app/types";
import {Portal} from "@mui/material";
import AppButton from "../../../elements/app-button/AppButton";
import Modal from "../../../elements/modals/Modal";
import Icon from "../../../elements/icon/Icon";
import DeleteAllModal from "../../../elements/modals/delete-all-modal/DeleteAllModal";
import NewAccountModal from "../../../elements/modals/new-account-modal/NewAccountModal";
import AccountInfoModal from "../../../elements/modals/account-info-modal/AccountInfoModal";
import accountThunks from "../../../app/redux/thunks/account-thunks";

const Accounts = () => {

	const role = useAppSelector(state => state.auth.user.role)
	const isFetching = useAppSelector(state => state.app.isFetching)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const controller = new AbortController
		dispatch(accountThunks.getAccounts(controller.signal))
		return () => controller?.abort()
	}, [])

	const accounts = useAppSelector(state => state.app.accounts)

	const [openModal, setOpenModal] = useState<boolean>(false)
	const [modalType, setModalType] =
		useState<'delete' | 'new' | 'info' | null>(null)
	const [modalAccountId, setModalAccountId] = useState<string | null>(null)

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

	const columns = [
		{ field: 'username', headerName: 'USERNAME', flex: 1 },
		{ field: 'name', headerName: 'NAME', flex: 1, },
		{ field: 'surname', headerName: 'SURNAME', flex: 1, },
		{ field: 'lastLogin', headerName: 'LAST LOGIN', flex: 1,
			renderCell: renderDate, hide: size.windowWidth < 600 },
		{ field: 'createdAt', headerName: 'CREATED AT', flex: 1,
			renderCell: renderDate, hide: size.windowWidth < 1200 },
	]

	const closeModal = () => {
		setOpenModal(false)
		setModalType(null)
		setModalAccountId(null)
	}

	const onRowClick = (args: any) => {
		setOpenModal(true)
		setModalAccountId(args.id)
		setModalType('info')
	}

	return (
		<div className="reservations">
			<div className="reservations__header">
				<div className="reservations__total">
					<div className="total__item">
						<h2>{ accounts.length }</h2>
						<p>accounts</p>
					</div>
				</div>
				<div className="reservations__buttons">
					<AppButton onClick={() => {setOpenModal(true);setModalType('new')}}>
						{ size.windowWidth > 450 ? 'Create account' : 'Make new'}
					</AppButton>
					{ role === 'ADMIN' &&
                        <AppButton onClick={() => {setOpenModal(true);setModalType('delete')}}
                                   className="delete__btn">
                            <Icon name={'delete'} color={'red'} size={30} />
                        </AppButton> }
				</div>
			</div>
			<div className="reservations__table_wrap">
				<DataGrid rows={accounts}
				          loading={isFetching}
				          columns={columns}
				          getRowId={(account: Account) => account._id}
				          onRowClick={onRowClick}
				          hideFooter={true}
				          getCellClassName={() => 'cell'}
				/>
			</div>
			{ openModal &&
                <Portal container={document && document.getElementById('main')} >
                    <Modal onClose={closeModal}>
						{ modalType === 'delete' && <DeleteAllModal type={'accounts'} onClose={closeModal} /> }
						{ modalType === 'new' && <NewAccountModal /> }
						{ modalType === 'info' && modalAccountId
							&& <AccountInfoModal
                                accountId={modalAccountId}
                                onClose={closeModal} /> }
                    </Modal>
                </Portal>
			}
		</div>
	);
};

export default Accounts;