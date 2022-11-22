import {AppDispatch} from "../store";
import $api from "../../http";
import {appActions} from "../slices/app-slice";

interface ICreateAccountData {
	username: string
	password: string
	name: string
	surname?: string
	role: string
}
const createAccount = (account: ICreateAccountData) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.post('/account', account)
			await dispatch(appActions.addNewAccountToAll(data))
		} catch (e) {
			return e
		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const updateAccount = (body: any) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.post(`/account/${body._id}`, body)
			dispatch(appActions.updateAccount({ id: data._id, data: data }))
		} catch (e) {
			console.log(e)
		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const getAccounts = (signal: AbortSignal) => {
	return async (dispatch: AppDispatch) => {
		try {
			const { data } = await $api.get('/accounts', { signal })
			dispatch(appActions.setAccounts(data))
		} catch (e) {

		}
	}
}

const deleteAccount = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await $api.delete(`/account/${id}`)
			dispatch(appActions.deleteAccount(id))
		} catch (e) {

		}
	}
}

const deleteAllAccounts = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await $api.delete(`/accounts`)
			dispatch(appActions.deleteAllAccounts())
		} catch (e) {

		}
	}
}

const accountThunks = {
	createAccount,
	updateAccount,
	getAccounts,
	deleteAccount,
	deleteAllAccounts,
}

export default accountThunks