import React from "react";
import { CreateRoomForm } from "../RoomCreate/CreateRoom";
import { RoomsList } from "../RoomsList/RoomsList";

export const RoomModalWindow = ({handleCreateRoom}) => {
    return (
        <div className="form roomForm">
            <span className="form_title">Выберите / создайте чат</span>
            <RoomsList />
            <CreateRoomForm handleCreateRoom={handleCreateRoom}/>
        </div>
    )
}
