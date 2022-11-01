import { createSlice } from "@reduxjs/toolkit";


const chatRoomSlice = createSlice({
    name: "chat",
    initialState: {
        isLoading: false,
        error: null,
        usersOnlineCount: 0,
        messagesArray: [],
        chatTitle: ''
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setChatTitle(state, action){
            state.chatTitle = action.payload
        },
        setUsersOnlineCount(state, action) {
            state.usersOnlineCount = action.payload
        },
        setMessagesArray(state, action) {
            state.messagesArray = action.payload
        },
        appendMessage(state, action){
            state.messagesArray.push(action.push)
        }
    }
    
})

export default chatRoomSlice.reducer;
export const { setIsLoading ,setError ,setChatTitle ,setUsersOnlineCount ,setMessagesArray ,appendMessage } = chatRoomSlice.actions;