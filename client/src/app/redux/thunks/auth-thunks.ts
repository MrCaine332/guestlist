import {authActions} from "../slices/auth-slice";
import {AppDispatch} from "../store";
import $api from "../../http";
import {appActions} from "../slices/app-slice";

const login = (body: any) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsFetching(true))
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
    return async (dispatch: AppDispatch) => {
        $api.post('logout')
        localStorage.removeItem('USER_TOKEN')
        dispatch(authActions.setUser({}))
        dispatch(authActions.setIsAuthenticated(false))
        dispatch(appActions.setDefault())
    }
}

const checkAuth = (signal: AbortSignal) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsFetching(true))
            const { data } = await $api.get('refresh', { withCredentials: true, signal: signal })
            if (data) {
                await dispatch(authActions.setUser(data.user))
                await dispatch(authActions.setIsAuthenticated(true))
            } else {
                localStorage.removeItem('USER_TOKEN')
            }
        } catch (e) {

        } finally {
            dispatch(authActions.setIsFetching(false))
            dispatch(authActions.setIsChecked(true))
        }
    }
}

const authThunks = {
    login,
    logout,
    checkAuth
}

export default authThunks