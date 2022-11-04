import React, {useRef, useState, useMemo, useLayoutEffect} from "react";
import styles from './ChatHeader.module.css'
import { LogoutComponent } from "../../Logout/Logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NotificationComponent } from "../Notification/Notification";
import styled , {keyframes} from 'styled-components';


const moveVertically = (startPos, endPos) => keyframes`
    0% { left: ${startPos}px; }
    100% { left: ${endPos}px; }
`;

const TitleTextStyled = styled.span`
    color: #2C2C2E;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 18px;
    position: relative;
    animation: ${props => moveVertically(props.animationPos.startPos, props.animationPos.endPos)} 10s infinite linear;
    
`

// 

export const ChatHeader = () => {
    const titleRef = useRef(null);
    const wrapperRef = useRef(null);

    const {chatTitle, usersOnlineCounter, isLoading} = useSelector(state => state.chat.chat)
    const [animationPos, setAnimationPos] =useState({
        startPos: 0,
        endPos: 0
    })

    useEffect(() => {
        if (!!chatTitle) { 
            document.title = chatTitle
            if (titleRef.current.offsetWidth > wrapperRef.current.offsetWidth) {
                setAnimationPos({startPos: 300, endPos: -titleRef.current.offsetWidth})
            }
        }
    }, [chatTitle]);

    return (
        <header className={styles.chatPage_header}>
            <NotificationComponent />
            <div className={styles.header_text}>
                <div ref={wrapperRef} className={styles.header__title__wraper}>
                    <TitleTextStyled animationPos={animationPos}
                                     ref={titleRef}>{chatTitle}</TitleTextStyled>
                </div>
                <span className={styles.header__connect_info}>{isLoading? "Подключение...": usersOnlineCounter + " участника"}</span>
            </div>
            <LogoutComponent isChat={true}/>
        </header>
    )
}