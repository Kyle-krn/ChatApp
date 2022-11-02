import React, { useEffect } from "react";
import styles from './MessageItem.module.css';
import checkSVG from './../../../../../static/img/messageCheck.svg'
import myBubbleSVG from './../../../../../static/img/Mybubbletip.png'
import otherBubblSVG from './../../../../../static/img/otherBubbletip.png'


export const MessageItem = React.memo(({myMess,id, username, message, created_at, isMyMessageUp, type}) => {
    const dateWithTZ = new Date(created_at).valueOf() - ((new Date).getTimezoneOffset() * 60000)
    return (
        <div message_id={id} className={`${styles.messageItem} ${myMess? styles.myMessage: styles.otherMessage}`}>
            <span className={styles.username}>{username}</span>
            <span className={styles.messageText}>{message}</span>
            <div className={styles.messageStatus}>
                <span className={styles.messageTime}>{new Date(dateWithTZ).toLocaleString("ru-RU", {hour: "numeric", minute:"numeric"})}</span>
                <span className={styles.messageCheck}> 
                    <img src={checkSVG}></img> 
                    {type==='new_message'?<img src={checkSVG}></img>: null}  
                </span>
            </div>
        {myMess && isMyMessageUp? null: <img className={styles.bubbleImg} src={myMess?myBubbleSVG: otherBubblSVG}></img>}
        </div>
    )
}
)
