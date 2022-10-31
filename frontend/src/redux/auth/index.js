import { combineReducers } from "@reduxjs/toolkit";
import loginReducers from "./loginReducer";

const authReducers = combineReducers({
    login: loginReducers 
})

export default authReducers;