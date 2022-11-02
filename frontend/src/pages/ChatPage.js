import React, {useEffect, useCallback, useRef} from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "../components/Chat/ChatHeader/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput/ChatInput";
import { ChatBody } from "../components/Chat/ChatBody/ChatBody";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { appendMessage, initChatData, appendSendMessage, setIsLoading, delFromSendMessage } from "../redux/chat/chatReducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ChatPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, checkAuth, userId} = useSelector(state => state.authData.login)
    useEffect(()=>{
        if (!isAuthenticated && checkAuth){
            navigate('/login')
        }
    }, [isAuthenticated, checkAuth])

    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8000/ws/room/" + id + '/', {
        shouldReconnect: (closeEvent) => true,
    });
    

    useEffect(()=>{
        if (lastMessage !== null) {
            let data = JSON.parse(lastMessage.data)
            // console.log(data)
            switch (data.type) {
                case 'join_in_room':
                case 'leave_in_room':
                    dispatch(appendMessage(data))
                    break;
                case 'connected_to_chat':
                    dispatch(initChatData(data))
                    break
                case 'chat_not_found':
                    navigate('/')
                    break
                case 'new_message':
                    dispatch(delFromSendMessage(data))
                    dispatch(appendMessage(data))
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

    useEffect(()=>{
        dispatch(setIsLoading(connectionStatus!=='Open'))
    },[connectionStatus])

    const handleSendMessage = useCallback((id, message) => {
        sendMessage(JSON.stringify({
            "type": "newMessage",
            id,
            message
        }))
        dispatch(appendSendMessage({ type:'sendMessage', 
                               message: { 
                                    id, 
                                    message, 
                                    user_id: userId,
                                    created_at: new Date().valueOf() 
                                }
                            }))

    }
    , [userId]);


    return (
        <div className="chatPage">
            <ChatHeader />
            <ChatBody/>
            <ChatInput handleSendMessage={handleSendMessage}/>
        </div>
    )
}

