import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    usersOnlineCounter: 0,
    messagesArray: [],
    sendMessagesArray: [],
    chatTitle: ''
}

const chatRoomSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        initChatData(state, action) {
            state.chatTitle = action.payload.title_room
            state.usersOnlineCounter = action.payload.count_online
            if (state.messagesArray.length === 0) {
                state.messagesArray = action.payload.messages
            }
        },
        appendMessage(state, action){
            state.messagesArray.push(action.payload)
        },
        appendSendMessage(state, action){
            state.sendMessagesArray.push(action.payload)
        },
        delFromSendMessage(state, action) {
            let index = state.sendMessagesArray.findIndex(el => el.message.id === action.payload.message.id)
            state.sendMessagesArray.splice(index, 1)
        },
        resetChatState:  () => initialState

    }
    
})

export default chatRoomSlice.reducer;
export const { setIsLoading ,setError ,initChatData ,appendMessage, resetChatState, appendSendMessage, delFromSendMessage } = chatRoomSlice.actions;