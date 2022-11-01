import React, {useEffect, useCallback, useRef} from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "../components/Chat/ChatHeader/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput/ChatInput";
import { ChatBody } from "../components/Chat/ChatBody/ChatBody";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { appendMessage, initChatData } from "../redux/chat/chatReducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ChatPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, checkAuth} = useSelector(state => state.authData.login)
    // const scrollDiv = useRef(null);
    // const scrollDownRef = useRef(null);

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
                    // const scrolldown = scrollDiv.current.scrollTop+793 === scrollDiv.current.scrollHeight
                    // console.log("clientHeight>>",scrollDiv.current.scrollTop, " || ", scrollDiv.current.scrollTop+793)
                    // console.log("scrollHeight>>",scrollDiv.current.scrollHeight)
                    // console.log("scrollHeight===clientHeight>>",)
                    dispatch(appendMessage(data))
                    break
            }
        }
    }, [lastMessage])

    const handleSendMessage = useCallback((message) => sendMessage(JSON.stringify({
        "type": "newMessage",
        message
    })), []);


    return (
        <div className="chatPage">
            <ChatHeader />
            <ChatBody/>
            <ChatInput handleSendMessage={handleSendMessage}/>
        </div>
    )
}

