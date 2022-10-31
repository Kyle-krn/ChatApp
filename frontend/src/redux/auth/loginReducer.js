import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        error: null,
        userId: null
    },
    reducers: {
        loginUser(state, action) {
            state.isLoading = false
            state.error = null
        },
        logoutUser(state) {
            state.accessToken = null
            state.isLoading = false
            state.error = null
        }
    },
    
})

export default loginSlice.reducer;
export const { loginUser, logoutUser } = loginSlice.actions;