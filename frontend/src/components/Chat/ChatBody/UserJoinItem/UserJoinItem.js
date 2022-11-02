import React from "react";
import styles from './UserJoinItem.module.css';


export const UserJoinItem = ({id, username, type},) => {
    return (
        <div message_id={id} className={styles.userJoin}>
            {username} {type === 'join_in_room'? "вошел в чат": "вышел из чата"}
        </div>
    )
}