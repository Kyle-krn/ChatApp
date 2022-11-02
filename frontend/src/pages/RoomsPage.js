import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { setRooms, setError, appendRoom, setLoading } from '../redux/chat/roomReducers';
import { resetChatState } from '../redux/chat/chatReducers';
import { LogoutComponent } from '../components/Logout/Logout';
import { RoomModalWindow } from '../components/Room/RoomModalWindow/RoomModalWindow';
import { wsTypes } from '../api/wsTypes';

export const RoomsPage = () => {
    const {isAuthenticated} = useSelector(state => state.authData.login)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.WS}/ws/rooms/`, {
        shouldReconnect: (closeEvent) => true,
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    useEffect(()=>{
        dispatch(setLoading(connectionStatus !== 'Open'))
    }, [readyState])
    
    useEffect(()=>{
        if (lastMessage !== null) {
            let data = JSON.parse(lastMessage.data)
            switch (data.type) {
                case wsTypes.ROOM.GET.ALL_ROOMS:
                    dispatch(setRooms(data.rooms))
                    break
                case wsTypes.ROOM.GET.CREATED_ROOM:
                    dispatch(appendRoom(data.room))
                    break;
                case wsTypes.ROOM.GET.TITLE_UNIQUE:
                    dispatch(setError("Комната с таким именем уже существует."))
                    break
            }
        }
    }, [lastMessage])

    const handleCreateRoom = useCallback((title) => sendMessage(JSON.stringify({
        "type": wsTypes.ROOM.POST.CREATE_ROOM,
        title
    })), []);


    useEffect(()=>{
        document.title = 'Rooms';
        dispatch(resetChatState());
    },[])

    useEffect(()=>{
        !isAuthenticated && navigate('/login');
    }, [isAuthenticated])
    
    return (
        <div className='roomPage'>
            <LogoutComponent />
            <RoomModalWindow handleCreateRoom={handleCreateRoom}/>
        </div>
    )
}