import React from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "../components/Chat/ChatHeader/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput/ChatInput";
import { ChatBody } from "../components/Chat/ChatBody/ChatBody";
import useWebSocket, { ReadyState } from 'react-use-websocket';


export const ChatPage = () => {
    let {id} = useParams()
    return (
        <div className="chatPage">
            <ChatHeader />
            <ChatBody />
            <ChatInput />
        </div>
    )
}