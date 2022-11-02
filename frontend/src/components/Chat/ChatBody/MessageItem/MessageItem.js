import React, { useEffect } from "react";
import styles from './MessageItem.module.css';

// const checkSVG = React.lazy(() => import('./../../../../../static/img/messageCheck.svg'))
// const myBubbleSVG = React.lazy(() => import('./../../../../../static/img/Mybubbletip.svg'))
// const otherBubblSVG = React.lazy(() => import('./../../../../../static/img/otherBubbletip.svg'))

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
                    <img src={checkSVG} loading="lazy"></img> 
                    {type==='new_message'?<img src={checkSVG} loading="lazy"></img>: null}  
                </span>
            </div>
        {myMess && isMyMessageUp? null: <img className={styles.bubbleImg} src={myMess?myBubbleSVG: otherBubblSVG} loading="lazy"></img>}
        </div>
    )
}
)
