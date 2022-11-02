import React from "react";
import { CreateRoomForm } from "../RoomCreate/CreateRoom";
import { RoomsList } from "../RoomsList/ListRooms";

export const RoomModalWindow = ({handleCreateRoom}) => {
    return (
        <div className="form roomForm">
            <span>Выберите / создайте чат</span>
            <RoomsList />
            <CreateRoomForm handleCreateRoom={handleCreateRoom}/>
        </div>
    )
}
