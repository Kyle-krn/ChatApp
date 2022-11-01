import React, {useRef, useState} from "react";
import airplaneSVG from './../../../../static/img/paper-airplane.svg'
import styles from './ChatInput.module.css';


export const ChatInput = ({handleSendMessage}) => {
    const textareaRef = useRef();
    const [message, setMessage] = useState("")
    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }
    const handleClick = () => {
        !!message && handleSendMessage(message)
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
            <button onClick={handleClick}><img className={styles.airplaneImg} src={airplaneSVG}></img></button> 
        </div>
    )
}