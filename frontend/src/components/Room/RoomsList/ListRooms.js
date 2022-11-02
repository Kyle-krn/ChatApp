import React from "react";
import { useSelector } from "react-redux";
import { RoomItem } from "../RoomItem/RoomItem";

export const RoomsList = () => {
    const {roomsArray} = useSelector(state => state.chat.room)
    
    return (
            <div className="roomList scroll">
                {roomsArray.map(room => <RoomItem key={room.id} id={room.id} title={room.title}/>)}
            </div>
    )
}

