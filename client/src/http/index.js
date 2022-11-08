import axios from 'axios';
import {authActions} from "../redux/slices/auth-slice";
import store from "../redux/store";

export const API_URL = `http://192.168.1.102:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('USER_TOKEN')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    console.log(error)
    throw error
    // const originalRequest = error.config;
    // if (error.response.status === 401 && error.config && !error.config._isRetry) {
    //     originalRequest._isRetry = true;
    //     try {
    //         const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
    //         localStorage.setItem('USER_TOKEN', response.data.accessToken);
    //         return $api.request(originalRequest);
    //     } catch (e) {
    //         console.log('NOT AUTHORIZED')
    //     }
    // }
    // throw error;
})

export default $api;
