import React, {useEffect, useRef, useState, Fragment} from "react";
import { DateItem } from "./DateItem/DateItem";
import { UserJoinItem } from "./UserJoinItem/UserJoinItem";
import { MessageItem } from "./MessageItem/MessageItem";
import styles from './ChatBody.module.css';
import { useSelector } from "react-redux";


const SeparateMessageAction = (action, whatReturn) => {
    if (action.type === 'join_in_room' || action.type === 'leave_in_room') {
        return action[whatReturn]
    } else if (action.type === 'new_message' || action.type === 'sendMessage') {
        return action.message[whatReturn]
    }
}


export const ChatBody = ({handleGetOldMessage}) => {
    const {messagesArray, sendMessagesArray, joinOrLeaveMessagesArray, isHaveMessageUp} = useSelector(state => state.chat.chat)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [messages, setMessages] = useState([]);
    
    const [prevTopMessageId, setPrevTopMessageId] = useState('');
    const scrollDivRef = useRef(null);
    
    
    const prevTopMessageIdRef = useRef(null);
    
    const scrollDownRef = useRef(null);

    const {userId} = useSelector(state => state.authData.login)
    

    useEffect(()=>{
        let offsetScroll = 0;
        if (!!prevTopMessageId && (prevTopMessageId!==prevTopMessageIdRef.current) ){

            for (let i = 0; i < scrollDivRef.current.children.length; i++) { // используем существующую переменную
                if (scrollDivRef.current.children[i].getAttribute('message_id') === prevTopMessageId) {
                    break
                }
                offsetScroll += (scrollDivRef.current.children[i].clientHeight + 16)
                
              }
        }
        if (offsetScroll > 0) {
            scrollDivRef.current.scrollTop = offsetScroll + 16          
        }

        isAutoScroll && scrollDownRef.current?.scrollIntoView() //{behavior: 'smooth'}
    },[messages, prevTopMessageIdRef])


    useEffect(()=>{
        let messagesRaw =[...messagesArray, ...sendMessagesArray, ...joinOrLeaveMessagesArray ]
        messagesRaw.sort((a,b)=>{
            let a_created_at;
            let b_created_at;
            a_created_at = SeparateMessageAction(a, 'created_at')
            b_created_at = SeparateMessageAction(b, 'created_at')
            a_created_at = new Date(a_created_at).valueOf()
            b_created_at = new Date(b_created_at).valueOf()
            return a_created_at - b_created_at

        }) 
        setMessages(messagesRaw)
        setPrevTopMessageId(prevTopMessageIdRef.current)
        if ( !!messagesRaw[0]) {
            prevTopMessageIdRef.current = SeparateMessageAction(messagesRaw[0], 'id')
        }

    },[messagesArray, sendMessagesArray, joinOrLeaveMessagesArray, setMessages, setPrevTopMessageId])
    
    const ScrollHandler = e => {
        if (e.currentTarget.scrollTop === 0 && isHaveMessageUp && messagesArray.length > 0){
            handleGetOldMessage(messagesArray[0].message.created_at)
        } 
        
        if ((Math.abs( e.currentTarget.scrollHeight  - e.currentTarget.scrollTop) - e.currentTarget.clientHeight ) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        }  else {
            !!isAutoScroll && setIsAutoScroll(false)
        }
    }


    return (
        <div ref={scrollDivRef} onScroll={ScrollHandler} className={styles.chatBody + " scroll"}>
            {(!isHaveMessageUp && !!messages[0]) && <DateItem key={"dfefve"} date={SeparateMessageAction(messages[0], 'created_at').replace(' ', 'T')}/>}
            {messages.map( ( el, index )=>{
                
                let isMyMessageUp = false;
                let renderDateItem = false;

                if (index > 1) {
                    if (messages[index-1].type === 'new_message') {    
                        isMyMessageUp = messages[index-1].message.user_id === userId
                    }
                    let currentMessageDay = new Date(SeparateMessageAction(el, 'created_at').replace(' ', 'T')).getDate()
                    let prevMessageDay = new Date(SeparateMessageAction(messages[index-1], 'created_at').replace(' ', 'T')).getDate()
                    if (currentMessageDay !== prevMessageDay) {
                        renderDateItem = true
                    }
                }

                if (el.type === 'join_in_room' || el.type === 'leave_in_room') {
                    return <UserJoinItem key={el.id} id={el.id} username={el.user.username} type={el.type}/>
                } else if (el.type === 'new_message' || el.type === 'message' || el.type === 'sendMessage') { 
                    return (
                    <Fragment key={el.message.id + "_fragment"}>
                        {renderDateItem && <DateItem key={el.message.id + "_date"} date={SeparateMessageAction(el, 'created_at')}/>}
                        <MessageItem key={el.message.id}
                                    id={el.message.id}
                                    myMess={userId === el.message.user_id}
                                    isMyMessageUp={isMyMessageUp}
                                    username={el.message.username} 
                                    message={el.message.message} 
                                    created_at={el.message.created_at}
                                    type={el.type}
                        />
                    </Fragment>
                    )
                }
            })}
            <div ref={scrollDownRef}></div>
        </div>
    )
}