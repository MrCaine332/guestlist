import {AppDispatch, RootState} from "../store";
import {appActions} from "../slices/app-slice";
import $api from "../../http";

interface ICreateReservationData {
	reserveeName: string
	numberOfPlaces: string
	instagramAccount: string
	comment?: string
	prAgentId?: string
}

const createReservation = (reservation: ICreateReservationData) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.post('/reservation', reservation)
			await dispatch(appActions.setNewReservation({...data.reservation, qrCode: data.qrCode}))
			await dispatch(appActions.addNewReservationToAll())
		} catch (e) {

		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const updateReservation = (body: any) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.post(`/reservation/${body._id}`, body)
			dispatch(appActions.updateReservation({ id: data.reservation._id, data: data.reservation }))
		} catch (e) {

		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const getReservation = (id: string, signal: AbortSignal) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.get(`/reservation/${id}`, { signal })
			dispatch(appActions.setCheckedReservation({...data.reservation, qrCode: data.qrCode}))
		} catch (e) {

		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const getReservationByCode = (code: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(appActions.setIsFetching(true))
			const { data } = await $api.get(`/reservation/code/${code}`)
			dispatch(appActions.setCheckedReservation({...data.reservation, qrCode: data.qrCode}))
		} catch (e) {

		} finally {
			dispatch(appActions.setIsFetching(false))
		}
	}
}

const getReservations = (signal: AbortSignal) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		try {
			const user = getState().auth.user
			let response = { data: {}}
			if (user.role === 'ADMIN')
				response = await $api.get('/reservations', { signal })
			if (user.role === 'PR_AGENT')
				response = await $api.get(`/reservations/pr/${user._id}`, { signal })

			dispatch(appActions.setReservations(response.data))
		} catch (e) {

		}
	}
}

const downloadCSVReservations = () => {
	return async () => {
		try {
			await $api.get('/reservations/download', {
				responseType: 'blob',
				headers: {
					'Content-Type': 'text/csv',
				}
			})
				.then((response) => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'file.csv');
					document.body.appendChild(link);
					link.click();
					link.remove()
				})
		} catch (e) {

		}
	}
}

const deleteReservation = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await $api.delete(`/reservation/${id}`)
			dispatch(appActions.deleteReservation(id))
		} catch (e) {

		}
	}
}

const deleteAllReservations = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await $api.delete(`/reservations`)
			dispatch(appActions.setReservations([]))
		} catch (e) {

		}
	}
}

const reservationThunks = {
	createReservation,
	updateReservation,
	getReservation,
	getReservationByCode,
	getReservations,
	downloadCSVReservations,
	deleteReservation,
	deleteAllReservations,
}

export default reservationThunks