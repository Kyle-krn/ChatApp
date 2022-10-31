import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CSRFToken from "../CSRFToken/CSRFToken";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { setError } from "../../redux/chat/roomReducers";
import arrowSVG from './../../../static/img/arrow.svg';

export const RoomForm = ({connectionStatus, handleCreateRoom}) => {
    const [title, setTitle] = useState("");
    const {error, isLoading, roomsArray} = useSelector(state => state.chat.room)
    const dispatch = useDispatch();
    
    
    const handleOnChange = (e) => {
        !!error && dispatch(setError(null)); 
        setTitle(e.target.value);
        
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleCreateRoom(title)
        setTitle("");
    }

    return (
        <div className="form roomForm">
            <span>Выберите / создайте чат</span>
            <div className="roomList">
                {roomsArray.map(room => <RoomItem key={room.id} id={room.id} title={room.title}/>)}
            </div>
            <form onSubmit={handleSubmitForm}>
                <CSRFToken />
                <div className="inputWithBtn">
                    <input placeholder={error?error:"Введите название чата"}
                           className={error? 'error': ''}
                           value={title}
                           onChange={handleOnChange}
                    />
                    {/* <button className="btn">Создать</button> */}
                    {connectionStatus!=='Open'?<LoadingButton />:<button className={!!title? "btn":"btn disableButton"}  
                        disabled={!title}>Создать</button>}
                </div>
            </form>
        </div>
    )
}

export const RoomItem = ({id, title}) => {
    return (
        <div className="roomItem">
            {title}
            <img src={arrowSVG}/>
        </div>
    )
}