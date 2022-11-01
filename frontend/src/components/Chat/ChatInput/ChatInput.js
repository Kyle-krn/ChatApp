import React, {useState} from "react";
import airplaneSVG from './../../../../static/img/paper-airplane.svg'
import styles from './ChatInput.module.css';


export const ChatInput = () => {
    const [message, setMessage] = useState("")
    return (
        <div className={styles.chatInput + " inputWithBtn"}>
            <input className={styles.chat_input} 
                   placeholder="Сообщение..."
                   value={message}
                   onChange={(e)=> setMessage(e.target.value)}
            />
            <button><img className={styles.airplaneImg} src={airplaneSVG}></img></button> 
        </div>
    )
}