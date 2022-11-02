import { createSlice } from "@reduxjs/toolkit";


const roomSlice = createSlice({
    name: "room",
    initialState: {
        isLoading: false,
        error: null,
        roomsArray: []
    },
    reducers: {
        setError(state, action) {
            state.error = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setRooms(state, action) {
            state.roomsArray = action.payload
        },
        appendRoom(state, action){
            state.roomsArray.unshift(action.payload)
        }
    }
    
})

export default roomSlice.reducer;
export const { setError, setLoading, setRooms, appendRoom } = roomSlice.actions;