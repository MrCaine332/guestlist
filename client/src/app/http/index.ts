import axios, {AxiosRequestConfig} from 'axios';
import store from "../redux/store";
import authThunks from "../redux/thunks/auth-thunks";

export const API_URL = `http://localhost:5000/api`
// export const API_URL = `https://nearkheg.ru/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('USER_TOKEN')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('USER_TOKEN', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            store.dispatch(authThunks.logout())
            // console.log('NOT AUTHORIZED')
        }
    }
    throw error;
})

export default $api;
