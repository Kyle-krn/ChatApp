import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './Notification.module.css';
import soundOnSVG from './../../../../static/img/soundOn.svg';
import soundOffSVG from './../../../../static/img/soundOff.svg';
import { APIToggleIsNotificationMessage } from "../../../redux/auth/profileReducer";

export const NotificationComponent = () => {
    const {isNotificationMessage} = useSelector(state => state.authData.profile)
    const dispatch = useDispatch();
    const activeSVG = isNotificationMessage? soundOffSVG:soundOnSVG 
    
    return (
            <img onClick={()=> dispatch(APIToggleIsNotificationMessage())} className={styles.soundSvg} src={activeSVG}/>
    )
}