import React from "react";
import { useSelector } from "react-redux";
import { RoomItem } from "../RoomItem/RoomItem";
import styles from './RoomsList.module.css';

export const RoomsList = () => {
    const {roomsArray} = useSelector(state => state.chat.room)
    return (
            <div className={styles.roomList + ' scroll'}>
                {roomsArray.map(room => <RoomItem key={room.id} id={room.id} title={room.title}/>)}
            </div>
    )
}

