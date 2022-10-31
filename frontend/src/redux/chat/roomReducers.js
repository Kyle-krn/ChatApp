import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const APICreateRoom = createAsyncThunk(
    'room/APICreateRoom',
    async function({title}, {rejectWithValue, dispatch}){
        try {
            await api.chat.createRoom({title});
            dispatch(unsetLoading())
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue({server: ["Server error"]})
            }
        }
    }
)

export const APIGetRooms = createAsyncThunk(
    'room/APIGetRooms',
    async function(_, {rejectWithValue, dispatch, getState}) {
        try {
            const {roomsArray} = getState().chat.room
            const res = await api.chat.getArrayRooms();
            if (roomsArray.length !== res.data.length) {
                dispatch(setRooms(res.data));
            }
        } catch (error) {
            
        }
    }
)


const roomSlice = createSlice({
    name: "room",
    initialState: {
        isLoading: false,
        error: null,
        roomsArray: []
    },
    reducers: {
        unsetError(state) {
            state.error = null
        },
        unsetLoading(state) {
            state.isLoading = false
        },
        setRooms(state, action) {
            state.roomsArray = action.payload
        }
    },
    extraReducers: {
        [APICreateRoom.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [APICreateRoom.rejected]: (state, action) => {
            state.isLoading = false;
            // state.errors = action.payload;
            console.log(action)
            state.error = action.payload[Object.keys(action.payload)[0]][0];
        },
    }
    
})

export default roomSlice.reducer;
export const { unsetError, unsetLoading } = roomSlice.actions;