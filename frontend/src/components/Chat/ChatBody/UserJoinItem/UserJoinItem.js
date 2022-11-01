import React from "react";
import styles from './UserJoinItem.module.css';


export const UserJoinItem = ({username, type},) => {
    return (
        <div className={styles.userJoin}>
            {username} {type === 'join_in_room'? "вошел в чат": "вышел из чата"}
        </div>
    )
}