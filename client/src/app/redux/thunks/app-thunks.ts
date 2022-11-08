import {authActions} from "../slices/auth-slice";
import {appActions} from "../slices/app-slice";
import {AppDispatch, RootState} from "../store";
import $api from "../../http";

const createReservation = (reservation: any) => {
    return async (dispatch: AppDispatch) => {
        dispatch(appActions.setIsFetching(true))
        try {
            const { data } = await $api.post('/reservation', reservation)
            dispatch(appActions.setNewReservation({...data.reservation, qrCode: data.qrCode}))
        } catch (e) {
            return e
        } finally {
            dispatch(appActions.setIsFetching(false))
        }
    }
}

const getReservation = (reservationCode: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(appActions.setIsFetching(true))
        try {
            const { data } = await $api.get(`/reservation/${reservationCode}`)
            dispatch(appActions.setCheckedReservation({...data.reservation, qrCode: data.qrCode}))
        } catch (e) {
            return e
        } finally {
            dispatch(appActions.setIsFetching(false))
        }
    }
}

const getReservations = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await $api.get('/reservations')
            dispatch(appActions.setReservations(data))
        } catch (e) {

        }
    }
}

const updateReservation = (body: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(appActions.setIsFetching(true))
        try {
            const reservation = getState().app.checkedReservation
            const { data } = await $api.post(`/reservation/${reservation.reservationCode}`, body)
            dispatch(appActions.setCheckedReservation({...data.reservation, qrCode: data.qrCode}))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(appActions.setIsFetching(false))
        }
    }
}

const getAccounts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await $api.get('/users')
            dispatch(appActions.setAccounts(data))
        } catch (e) {

        }
    }
}



const appThunks = {
    createReservation,
    getReservation,
    getReservations,
    updateReservation,
    getAccounts,
}

export default appThunks