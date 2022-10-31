import { combineReducers } from "@reduxjs/toolkit";
import loginReducers from "./loginReducers";

const authReducers = combineReducers({
    login: loginReducers 
})

export default authReducers;