import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth/index'

let store = configureStore({
    reducer: {
        authData: authReducers,
        
    }
});


export default store;