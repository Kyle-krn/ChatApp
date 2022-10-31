import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CSRFToken from "../CSRFToken/CSRFToken";
import { APICreateRoom, APIGetRooms } from "../../redux/chat/roomReducers";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { unsetError } from "../../redux/chat/roomReducers";

export const RoomForm = ({isAuthenticated}) => {
    const [title, setTitle] = useState("");
    const {error, isLoading} = useSelector(state => state.chat.room)
    const dispatch = useDispatch();
    const handleOnChange = (e) => {
        !!error && dispatch(unsetError()); 
        setTitle(e.target.value);
        
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(APICreateRoom({title}));
        setTitle("");
    }

    useEffect(()=>{
        isAuthenticated && dispatch(APIGetRooms());
    },[])

    return (
        <div className="form roomForm">
            <span>Выберите / создайте чат</span>
            
            <form onSubmit={handleSubmitForm}>
                <CSRFToken />
                <div className="inputWithBtn">
                    <input placeholder={error?error:"Введите название чата"}
                           className={error? 'error': ''}
                           value={title}
                           onChange={handleOnChange}
                    />
                    {/* <button className="btn">Создать</button> */}
                    {isLoading?<LoadingButton />:<button className={!!title? "btn":"btn disableButton"}  
                        disabled={!title}>Создать</button>}
                </div>
            </form>
        </div>
    )
}