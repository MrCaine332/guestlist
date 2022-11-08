import $api from "../../http";
import {authActions} from "../slices/auth-slice";

const login = (body) => {
    return async (dispatch) => {
        dispatch(authActions.setIsFetching(true))
        try {
            const { data } = await $api.post('login', body)
            localStorage.setItem('USER_TOKEN', data.accessToken)
            dispatch(authActions.setUser(data.user))
            dispatch(authActions.setIsAuthenticated(true))
        } catch (e) {
            return e
        } finally {
            dispatch(authActions.setIsFetching(false))
        }
    }
}

const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem('USER_TOKEN')
        dispatch(authActions.setUser({}))
        dispatch(authActions.setIsAuthenticated(false))
    }
}

const checkAuth = () => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem('USER_TOKEN')
        if (accessToken) {
            const { data } = await $api.post('check', { accessToken })
            if (data) {
                dispatch(authActions.setUser(data))
                dispatch(authActions.setIsAuthenticated(true))
            } else {
                localStorage.removeItem('USER_TOKEN')
            }
        }
        dispatch(authActions.setIsChecked(true))
    }
}

const authThunks = {
    login,
    logout,
    checkAuth
}

export default authThunks