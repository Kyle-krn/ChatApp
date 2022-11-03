import { combineReducers } from "@reduxjs/toolkit";
import loginReducers from "./loginReducer";
import profileReducer from "./profileReducer";

const authReducers = combineReducers({
    login: loginReducers,
    profile: profileReducer 
})

export default authReducers;