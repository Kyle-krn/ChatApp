import React from "react";
import styles from './ChatHeader.module.css'
import { LogoutComponent } from "../../Logout/Logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NotificationComponent } from "../Notification/Notification";

export const ChatHeader = () => {
    const {chatTitle, usersOnlineCounter, isLoading} = useSelector(state => state.chat.chat)
    useEffect(() => {
        if (!!chatTitle) { 
            document.title = chatTitle
        }
    }, [chatTitle]);
    
    return (
        <header className={styles.chatPage_header}>
            <NotificationComponent />
            <div className={styles.header_text}>
                <span>{chatTitle}</span>
                
                <span>{isLoading? "Подключение...": usersOnlineCounter + " участника"}</span>
            </div>
            <LogoutComponent isChat={true}/>
        </header>
    )
}