import axios from 'axios';
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
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