import Endpoints from "./endpoints";
import { axiosInstance } from "../instance";


export const getCSRFToken = () => axiosInstance.get(Endpoints.AUTH.CSRF_TOKEN);
export const login = (data) => axiosInstance.post(Endpoints.AUTH.LOGIN, data);
export const logout = () => axiosInstance.post(Endpoints.AUTH.LOGOUT)
export const checkAuthenticated = () => axiosInstance.get(Endpoints.AUTH.CHECK_AUTH);
