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
        initChatData(state, action) {
            state.chatTitle = action.payload.title_room
            state.usersOnlineCount = action.payload.count_online
            state.messagesArray = action.payload.messages
        },
        appendMessage(state, action){
            state.messagesArray.push(action.payload)
        },

    }
    
})

export default chatRoomSlice.reducer;
export const { setIsLoading ,setError ,initChatData ,appendMessage } = chatRoomSlice.actions;