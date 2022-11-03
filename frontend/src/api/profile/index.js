import Endpoints from "./endpoints";
import { axiosInstance } from "../instance";


export const getProfile = () => axiosInstance.get(Endpoints.PROFILE.GET_PROFILE);
export const toggleNotification = (data) => axiosInstance.get(Endpoints.PROFILE.TOGGLE_NOTIFICATION);