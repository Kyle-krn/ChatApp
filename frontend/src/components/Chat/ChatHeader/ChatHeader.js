import React from "react";
import styles from './ChatHeader.module.css'
import { LogoutComponent } from "../../Logout/Logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";


export const ChatHeader = () => {
    const {chatTitle, usersOnlineCount} = useSelector(state => state.chat.chat)
    useEffect(() => {
        if (!!chatTitle) { 
            document.title = chatTitle
        }
    }, [chatTitle]);
    return (
        <header className={styles.chatPage_header}>
            <div className={styles.header_text}>
                <span>{chatTitle}</span>
                <span>{usersOnlineCount} участника</span>
            </div>
            <LogoutComponent />
        </header>
    )
}