import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatHeader } from "../components/Chat/ChatHeader/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput/ChatInput";
import { ChatBody } from "../components/Chat/ChatBody/ChatBody";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
    appendMessage,
    initChatData,
    appendSendMessage,
    setIsLoading,
    delFromSendMessage,
    appendJoinOrLeaveMessagesArray,
    appendOldMessages
} from "../redux/chat/chatReducers";
import { useDispatch, useSelector } from "react-redux";
import { wsTypes } from "../api/wsTypes";

export const ChatPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, checkAuth, userId } = useSelector(state => state.authData.login);
    useEffect(() => {
        if (!isAuthenticated && checkAuth) {
            navigate('/login')
        }
    }, [isAuthenticated, checkAuth])

    const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.WS}/ws/room/` + id + '/', {
        shouldReconnect: (closeEvent) => true,
    });


    useEffect(() => {
        if (lastMessage !== null) {
            let data = JSON.parse(lastMessage.data)
            switch (data.type) {
                case wsTypes.CHAT.GET.JOIN_IN_ROOM:
                case wsTypes.CHAT.GET.LEAVE_IN_ROOM:
                    data.user.user_id !== userId && dispatch(appendJoinOrLeaveMessagesArray(data))
                    break;
                case wsTypes.CHAT.GET.CONNECTED_TO_CHAT:
                    dispatch(initChatData(data))
                    break
                case wsTypes.CHAT.GET.CHAT_NOT_FOUND:
                    navigate('/')
                    break
                case wsTypes.CHAT.GET.NEW_MESSAGE:
                    dispatch(delFromSendMessage(data))
                    dispatch(appendMessage(data))
                    break
                case wsTypes.CHAT.GET.OLD_MESSAGES:
                    dispatch(appendOldMessages(data))
                    break

            }
        }
    }, [lastMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        dispatch(setIsLoading(connectionStatus !== 'Open'))
    }, [connectionStatus])

    const handleSendMessage = useCallback((id, message) => {
        sendMessage(JSON.stringify({
            "type": wsTypes.CHAT.POST.NEW_MESSAGE,
            id,
            message
        }))
        dispatch(appendSendMessage({
            type: 'sendMessage',
            message: {
                id,
                message,
                user_id: userId,
                username: '',
                created_at: new Date().valueOf()
            }
        }))

    }
        , [userId]);

    const handleGetOldMessage = useCallback((lastCreatedAd) => {
        connectionStatus === 'Open' &&

            sendMessage(JSON.stringify({
                "type": wsTypes.CHAT.POST.GET_OLD_MESSAGE,
                lastCreatedAd
            }))
    }, [connectionStatus])

    return (
        <div className="chatPage">
            <ChatHeader />
            <ChatBody handleGetOldMessage={handleGetOldMessage} />
            <ChatInput handleSendMessage={handleSendMessage} />
        </div>
    )
}

