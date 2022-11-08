import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {},
    isChecked: false,
    error: null,
    isFetching: false
}

const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setIsChecked(state, action) {
            state.isChecked = action.payload
        },
        setError(state, action) {
            state.isChecked = action.payload
        },
        setIsFetching(state, action) {
            state.isFetching = action.payload
        }
    }
})

const { actions, reducer } = authReducer

export const authActions = actions

export default reducer