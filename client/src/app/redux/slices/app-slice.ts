import {createSlice} from "@reduxjs/toolkit";
import {AppSlice} from "../../types";

const initialState: AppSlice = {
    accounts: [],
    reservations: [],
    newReservation: {
        _id: '',
        reservationCode: '',
        prAgentId: '',
        reserveeName: '',
        numberOfPlaces: 0,
        instagramAccount: '',
        comment: '',
        createdAt: '',
        reservationUsed: false
    },
    checkedReservation: {
        _id: '',
        reservationCode: '',
        prAgentId: '',
        reserveeName: '',
        numberOfPlaces: 0,
        instagramAccount: '',
        comment: '',
        createdAt: '',
        reservationUsed: false
    },
    isFetching: false,
}

const appReducer = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        /** Reservations reducers */
        setReservations(state, action) {
            state.reservations = action.payload
        },
        setNewReservation(state, action) {
            state.newReservation = action.payload
        },
        setCheckedReservation(state, action) {
            state.checkedReservation = action.payload
        },
        addNewReservationToAll(state) {
            state.reservations = [...state.reservations, state.newReservation]
        },
        updateReservation(state, action) {
            state.reservations = state.reservations.map(reservation =>
                reservation._id === action.payload.id
                    ? {...reservation, ...action.payload.data}
                    : reservation
            )
        },
        deleteReservation(state, action) {
            state.reservations = state.reservations.filter(reservation =>
                reservation._id !== action.payload)
        },

        /** Accounts reducers */
        setAccounts(state, action) {
            state.accounts = action.payload
        },
        addNewAccountToAll(state, action) {
            state.accounts = [...state.accounts, action.payload]
        },
        updateAccount(state, action) {
            state.accounts = state.accounts.map(account =>
                account._id === action.payload.id
                    ? {...account, ...action.payload.data}
                    : account
            )
        },
        deleteAccount(state, action) {
            state.accounts = state.accounts.filter(account =>
                account._id !== action.payload)
        },
        deleteAllAccounts(state) {
            state.accounts = state.accounts.filter(account =>
                account.role === 'ADMIN')
        },

        /** Util reducers */
        setIsFetching(state, action) {
            state.isFetching = action.payload
        },
        setDefault(state) {
            state.accounts = initialState.accounts
            state.reservations = initialState.reservations
            state.newReservation = initialState.newReservation
            state.checkedReservation = initialState.checkedReservation
        },
    }
})

const { actions, reducer } = appReducer

export const appActions = actions

export default reducer