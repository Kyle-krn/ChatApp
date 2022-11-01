import { combineReducers } from "@reduxjs/toolkit";
import roomReducers from "./roomReducers";
import chatRoomSlice from "./chatReducers";

const chatReducers = combineReducers({
    room: roomReducers,
    chat: chatRoomSlice 
})

export default chatReducers;