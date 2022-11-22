import './App.scss';
import Router from "./router/Router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import authThunks from "./app/redux/thunks/auth-thunks";
import {authActions} from "./app/redux/slices/auth-slice";

const App = () => {
    const dispatch = useAppDispatch()

    const isChecked = useAppSelector(state => state.auth.isChecked)

    useEffect(() => {
        const controller = new AbortController
        if (localStorage.getItem('USER_TOKEN')) {
            dispatch(authThunks.checkAuth(controller.signal))
        } else {
            dispatch(authActions.setIsChecked(true))
        }
        return () => controller?.abort()
    }, [])

    return (
        <div className="App">
            { isChecked ? <Router /> : <></>}
        </div>
    )
}

export default App;
