import React, {useEffect, useRef, useState} from "react";
import { DateItem } from "./DateItem/DateItem";
import { UserJoinItem } from "./UserJoinItem/UserJoinItem";
import { MessageItem } from "./MessageItem/MessageItem";
import styles from './ChatBody.module.css';
import { useSelector } from "react-redux";
 

export const ChatBody = ({handleGetOldMessage}) => {
    const {messagesArray, sendMessagesArray, joinOrLeaveMessagesArray, isHaveMessageUp} = useSelector(state => state.chat.chat)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [messages, setMessages] = useState([]);
    // const [topMessageId, setTopMessageId] = useState('');
    
    const [prevTopMessageId, setPrevTopMessageId] = useState('');
    const scrollDivRef = useRef(null);
    
    
    const TestRef = useRef(null);
    
    const scrollDownRef = useRef(null);

    const {userId} = useSelector(state => state.authData.login)
    

    useEffect(()=>{
        console.log("count messages>>>>>",scrollDivRef.current.children.length)
        console.log("prev id>>>>>",prevTopMessageId)
        console.log("now id>>>>>",TestRef.current)
        let offsetScroll = 0;
        if (!!prevTopMessageId && (prevTopMessageId!==TestRef.current) ){

            for (let i = 0; i < scrollDivRef.current.children.length; i++) { // используем существующую переменную
                offsetScroll += (scrollDivRef.current.children[i].clientHeight + 16)
                if (scrollDivRef.current.children[i].getAttribute('message_id') === prevTopMessageId) {
                    break
                }
                // console.log(scrollDivRef.current.children[i].getAttribute('messageId'))
              }
        }
        if (offsetScroll > 0) {
            // console.log(scrollDivRef.current.scrollTop)             
            scrollDivRef.current.scrollTop = offsetScroll          
        }
        // if ( !!messages[0] && (messages[0].type === 'join_in_room' || messages[0].type === 'leave_in_room')) {
        //     console.log("message[0]>>>>>", messages[0].id)
        // } else if (!!messages[0] && (messages[0].type === 'new_message' || messages[0].type === 'sendMessage')) {
        //     console.log("message[0]>>>>>", messages[0].message.id)
        // }

        isAutoScroll && scrollDownRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages, TestRef])


    useEffect(()=>{
        let messagesRaw =[...messagesArray, ...sendMessagesArray, ...joinOrLeaveMessagesArray ]
        messagesRaw.sort((a,b)=>{
            let a_created_at;
            let b_created_at;
            if (a.type === 'join_in_room' || a.type === 'leave_in_room') {
                // console.log(a)
                a_created_at = a.created_at
            } else if (a.type === 'new_message' || a.type === 'sendMessage') {
                a_created_at = a.message.created_at
            }
            
            if (b.type === 'join_in_room' || b.type === 'leave_in_room') {
                b_created_at = b.created_at
            } else if (b.type === 'new_message' || b.type === 'sendMessage') {
                b_created_at = b.message.created_at
            }
            a_created_at = new Date(a_created_at).valueOf()
            b_created_at = new Date(b_created_at).valueOf()
            return a_created_at - b_created_at

        }) 
        setMessages(messagesRaw)
        setPrevTopMessageId(TestRef.current)
        if ( !!messagesRaw[0] && (messagesRaw[0].type === 'join_in_room' || messagesRaw[0].type === 'leave_in_room')) {
            TestRef.current = messagesRaw[0].id
        } else if (!!messagesRaw[0] && (messagesRaw[0].type === 'new_message' || messagesRaw[0].type === 'sendMessage')) {
            TestRef.current = messagesRaw[0].message.id
        }

    // useEffect(()=>{})

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
            {messages.map( ( el, index )=>{
                let isMyMessageUp = false;
                if (index > 1 && messages[index-1].type === 'new_message') {
                    isMyMessageUp = messages[index-1].message.user_id === userId
                }
                if (el.type === 'join_in_room' || el.type === 'leave_in_room') {
                    return <UserJoinItem key={el.id} id={el.id} username={el.user.username} type={el.type}/>
                } else if (el.type === 'new_message' || el.type === 'message' || el.type === 'sendMessage') { 
                    return <MessageItem key={el.message.id}
                                        id={el.message.id}
                                        myMess={userId === el.message.user_id}
                                        isMyMessageUp={isMyMessageUp}
                                        username={el.message.username} 
                                        message={el.message.message} 
                                        created_at={el.message.created_at}
                                        type={el.type}
                    />
                }
            })}
            <div ref={scrollDownRef}></div>
        </div>
    )
}