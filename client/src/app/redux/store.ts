import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import appReducer from "./slices/app-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer
    }
})

// @ts-ignore
window.store = store

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch