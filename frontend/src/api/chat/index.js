import Endpoints from "./endpoints";
import { axiosInstance } from "../instance";


export const createRoom = (body) => axiosInstance.post(Endpoints.CHAT.ROOM, body);
export const getArrayRooms = () => axiosInstance.get(Endpoints.CHAT.ROOM)
