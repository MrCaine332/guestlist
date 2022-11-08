import {authActions} from "../slices/auth-slice";
import $api from "../../http";
import {appActions} from "../slices/app-slice";

const createReservation = (body) => {
    return async (dispatch) => {
        dispatch(appActions.setIsFetching(true))
        try {
            const { data } = await $api.post('/reservation', body)
            dispatch(appActions.setNewReservation({...data.reservation, qrCode: data.qrCode}))
        } catch (e) {
            return e
        } finally {
            dispatch(appActions.setIsFetching(false))
        }
    }
}

const getReservation = (reservation) => {
    return async (dispatch) => {
        dispatch(appActions.setIsFetching(true))
        try {
            const { data } = await $api.get(`/reservation/${reservation}`)
            dispatch(appActions.setCheckedReservation({...data.reservation, qrCode: data.qrCode}))
        } catch (e) {
            return e
        } finally {
            dispatch(appActions.setIsFetching(false))
        }
    }
}

const getReservations = () => {
    return async (dispatch) => {
        try {
            const { data } = await $api.get('/reservations')
            dispatch(appActions.setReservations(data))
        } catch (e) {

        }
    }
}

const updateReservation = (body) => {
    return async (dispatch, getState) => {
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
    return async (dispatch) => {
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