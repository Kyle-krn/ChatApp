import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const APILogin = createAsyncThunk(
    'auth/APILogin',
    async function ({username, password}, {rejectWithValue, dispatch}) {
        try {
            await api.auth.login({username, password})
            dispatch(loginUser())
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("Неверный логин или пароль")
            } else {
                return rejectWithValue("Server error")
            }
        }
    }
)

export const APICheckAuth = createAsyncThunk(
    'auth/APICheckAuth',
    async function(_, {rejectWithValue, dispatch}){
        try {
            const res = await api.auth.checkAuthenticated();
            dispatch(loginUser())
        } catch (error) {
            
        }
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false,
        isLoading: false,
        error: null,
        userId: null,
    },
    reducers: {
        loginUser(state, action) {
            state.isLoading = false
            state.error = null
            state.isAuthenticated = true
        },
        logoutUser(state) {
            state.accessToken = null
            state.isLoading = false
            state.error = null
        }
    },
    extraReducers: {
        [APILogin.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [APILogin.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
    
})

export default loginSlice.reducer;
export const { loginUser, logoutUser } = loginSlice.actions;