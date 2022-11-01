import React, { useEffect } from "react";
import styles from './MessageItem.module.css';
import checkSVG from './../../../../../static/img/messageCheck.svg'
import myBubbleSVG from './../../../../../static/img/Mybubbletip.png'
import otherBubblSVG from './../../../../../static/img/otherBubbletip.png'


export const MessageItem = ({myMess, username, message, created_at, isMyMessageUp}) => {
    useEffect(()=>{
        console.log(message, "   ", isMyMessageUp)
    },[])
    return (
        <div className={`${styles.messageItem} ${myMess? styles.myMessage: styles.otherMessage}`}>
            <span className={styles.username}>{username}</span>
            <span className={styles.messageText}>{message}</span>
            <div className={styles.messageStatus}>
                <span className={styles.messageTime}>11:35</span>
                <span className={styles.messageCheck}> 
                    <img src={checkSVG}></img> 
                    <img src={checkSVG}></img> 
                </span>
            </div>
        {myMess && isMyMessageUp? null: <img className={styles.bubbleImg} src={myMess?myBubbleSVG: otherBubblSVG}></img>}
        </div>
    )
}

