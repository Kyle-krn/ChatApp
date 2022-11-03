import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const APIGetProfile = createAsyncThunk(
    'profileSlice/APIGetProfile',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            const res = await api.profile.getProfile();
            dispatch(setProfile(res.data))
        } catch (error) {
            
        }
    }
);

export const APIToggleIsNotificationMessage = createAsyncThunk (
    'profileSlice/APIToggleIsNotificationMessage',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            const res = await api.profile.toggleNotification()
            // console.log(res.data)
            dispatch(setIsNotificationMessage(res.data.isNotificationMessage));
        } catch (error) {
            
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        isNotificationMessage: null
    },
    reducers: {
        setProfile (state, action) {
            state.isNotificationMessage = action.payload.isNotificationMessage
        },
        setIsNotificationMessage(state, action) {
            console.log(action)
            state.isNotificationMessage = action.payload
        }
    }
})

export default profileSlice.reducer;
export const { setProfile, setIsNotificationMessage } = profileSlice.actions;