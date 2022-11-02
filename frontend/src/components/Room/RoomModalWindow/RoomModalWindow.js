import React from "react";
// import { CreateRoomForm } from "../Room/RoomCreate/CreateRoom";
// import { RoomsList } from "../Room/RoomsList/ListRooms";
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
