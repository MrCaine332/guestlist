import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accounts: [],
    reservations: [],
    newReservation: {},
    checkedReservation: {},
    isFetching: false,
}

const appReducer = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setReservations(state, action) {
            state.reservations = action.payload
        },
        setAccounts(state, action) {
            state.accounts = action.payload
        },
        setNewReservation(state, action) {
            state.newReservation = action.payload
        },
        setIsFetching(state, action) {
            state.isFetching = action.payload
        },
        setCheckedReservation(state, action) {
            state.checkedReservation = action.payload
        }
    }
})

const { actions, reducer } = appReducer

export const appActions = actions

export default reducer