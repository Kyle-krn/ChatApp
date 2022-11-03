import React from "react";
import styles from './MessageItem.module.css';
import checkSVG from './../../../../../static/img/messageCheck.svg'
import myBubbleSVG from './../../../../../static/img/Mybubbletip.png'
import otherBubblSVG from './../../../../../static/img/otherBubbletip.png'
import Moment from 'react-moment';

export const MessageItem = React.memo(({myMess,id, username, message, created_at, isMyMessageUp, type}) => {
    let userTime = new Date(created_at.replace(' ', 'T')).valueOf() - ((new Date).getTimezoneOffset() * 60000)
    userTime = new Date(userTime)
    return (
        <div message_id={id} className={`${styles.messageItem} ${myMess? styles.myMessage: styles.otherMessage}`}>
            <span className={styles.username}>{username}</span>
            <span className={styles.messageText}>{message}</span>
            <div className={styles.messageStatus}>
                <span className={styles.messageTime}>
                    {/* <Moment date={userTime} format="h:mm"/> */}
                    {`${userTime.getHours()}:${userTime.getMinutes()}`}
                </span>
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
