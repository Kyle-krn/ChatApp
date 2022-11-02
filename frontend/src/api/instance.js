import axios from 'axios';
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
    baseURL: process.env.HOST,
    // baseURL: 'https://b96d-178-155-4-226.ngrok.io',
})

axiosInstance.interceptors.request.use(async (config) => {
    if (config.method === 'post') {
        config.headers = {
            ...config.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    return config;
});