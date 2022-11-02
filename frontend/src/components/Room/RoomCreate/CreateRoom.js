import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CSRFToken from "../../CSRFToken/CSRFToken";
import { LoadingButton } from "../../LoadingButton/LoadingButton";
import { setError } from "../../../redux/chat/roomReducers";


export const CreateRoomForm = ({handleCreateRoom}) => {
    const [title, setTitle] = useState("");
    const {error, isLoading} = useSelector(state => state.chat.room)
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
            <form onSubmit={handleSubmitForm}>
                <CSRFToken />
                <div className="inputWithBtn">
                    <input placeholder={error?error:"Введите название чата"}
                           className={error? 'error': ''}
                           value={title}
                           onChange={handleOnChange}
                    />
                    {isLoading?<LoadingButton />:<button className={!!title? "btn":"btn disableButton"}  
                        disabled={!title}>Создать</button>}
                </div>
            </form>
    )
}
