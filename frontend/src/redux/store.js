import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth/index';
import chatReducers from './chat/index';


let store = configureStore({
    reducer: {
        authData: authReducers,
        chat: chatReducers 
        
    }
});


export default store;