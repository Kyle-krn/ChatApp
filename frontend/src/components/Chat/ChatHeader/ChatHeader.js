import React from "react";
import styles from './ChatHeader.module.css'
// import logoutSVG from './../../static/img/logout.svg'
import { LogoutComponent } from "../../Logout/Logout";
export const ChatHeader = () => {
    return (
        <header className={styles.chatPage_header}>
            <div className={styles.header_text}>
                <span>Первая комната</span>
                <span>2 участника</span>
            </div>
            <LogoutComponent />
        </header>
    )
}