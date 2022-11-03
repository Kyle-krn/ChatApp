import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { APIGetProfile } from "./profileReducer";

export const APILogin = createAsyncThunk(
    'auth/APILogin',
    async function ({username, password}, {rejectWithValue, dispatch}) {
        try {
            const res = await api.auth.login({username, password})
            
            dispatch(loginUser(res.data.user_id))
            dispatch(APIGetProfile())
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("Неверный логин или пароль")
            } else {
                return rejectWithValue("Server error")
            }
        }
    }
)

export const APILogout = createAsyncThunk(
    'auth/APILogout', 
    async function(_,{rejectWithValue, dispatch}) {
        try {
            await api.auth.logout()
            dispatch(resetLoginState())
        } catch (error) {
            return rejectWithValue()
        }
    }
)

export const APICheckAuth = createAsyncThunk(
    'auth/APICheckAuth',
    async function(_, {rejectWithValue, dispatch}){
        try {
            const res = await api.auth.checkAuthenticated();
            console.log(res)
            dispatch(loginUser(res.data.user_id))
            dispatch(APIGetProfile())
        } catch (error) {
            return rejectWithValue()
        }
    }
)

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    userId: null,
    checkAuth: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        loginUser(state, action) {
            state.isLoading = false
            state.error = null
            state.isAuthenticated = true
            state.userId = action.payload
            state.checkAuth = true
        },
        logoutUser(state) {
            state.accessToken = null
            state.isLoading = false
            state.error = null
        },
        unsetError(state) {
            state.error = null
        },
        resetLoginState: () => initialState
    },
    extraReducers: {
        [APILogin.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [APILogin.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [APICheckAuth.rejected]: (state) => {
            state.checkAuth = true
        }
    }
    
})

export default loginSlice.reducer;
export const { loginUser, logoutUser, unsetError, resetLoginState } = loginSlice.actions;