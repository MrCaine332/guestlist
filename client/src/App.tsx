import './App.scss';
import Router from "./router/Router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import authThunks from "./app/redux/thunks/auth-thunks";

const App = () => {
    const dispatch = useAppDispatch()

    const isChecked = useAppSelector(state => state.auth.isChecked)

    useEffect(() => {
        dispatch(authThunks.checkAuth())
    }, [])

    if (!isChecked)
        return <></>

    return (
        <div className="App">
            <Router />
        </div>
    )
}

export default App;
