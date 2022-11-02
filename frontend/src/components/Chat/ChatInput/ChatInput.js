import React, {useRef, useState} from "react";
import airplaneSVG from './../../../../static/img/paper-airplane.svg'
import styles from './ChatInput.module.css';
import { v4 as uuidv4 } from 'uuid';


export const ChatInput = ({handleSendMessage}) => {
    const textareaRef = useRef();
    const [message, setMessage] = useState("")
    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }
    const handleClick = () => {
        !!message && handleSendMessage(uuidv4(), message)
        setMessage('')
    }

    const onKeyDown = e => {
        e.code === 'Enter' && handleClick();
    }

    return (
        <div className={styles.chatInputBlock + " inputWithBtn"}>
            <input onKeyDown={onKeyDown}
                   className={styles.chat_input} 
                   placeholder="Сообщение..."
                   value={message}
                   ref={textareaRef}
                   onChange={handleOnChange}
            />
            <button disabled={!message} onClick={handleClick}><img className={styles.airplaneImg} src={airplaneSVG}></img></button> 
        </div>
    )
}