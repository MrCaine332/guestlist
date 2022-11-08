import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import appReducer from "./slices/app-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer
    }
})

window.store = store

export default store