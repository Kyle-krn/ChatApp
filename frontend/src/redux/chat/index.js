import { combineReducers } from "@reduxjs/toolkit";
import roomReducers from "./roomReducers";

const chatReducers = combineReducers({
    room: roomReducers 
})

export default chatReducers;