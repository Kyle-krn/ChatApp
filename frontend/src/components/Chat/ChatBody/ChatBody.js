import React from "react";
import { DateItem } from "./DateItem/DateItem";
import { UserJoinItem } from "./UserJoinItem/UserJoinItem";
import { MessageItem } from "./MessageItem/MessageItem";
import styles from './ChatBody.module.css';

export const ChatBody = () => {
    return (
        <div className={styles.chatBody + " scroll"}>
            <DateItem />
            <UserJoinItem />
            <MessageItem myMess={true}/>
            <MessageItem myMess={false}/>
        </div>
    )
}