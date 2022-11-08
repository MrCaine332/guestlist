import './App.scss';
import Router from "./router/Router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import authThunks from "./redux/thunks/auth-thunks";

const App = () => {
    const dispatch = useDispatch()

    const isChecked = useSelector(state => state.auth.isChecked)

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
