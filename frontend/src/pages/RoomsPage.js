import React, {useEffect} from 'react';
import { RoomForm } from '../components/RoomForm/RoomForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const RoomsPage = () => {
    const {isAuthenticated} = useSelector(state => state.authData.login)
    const navigate = useNavigate();
    useEffect(()=>{
        document.title = 'Rooms';
    },[])

    useEffect(()=>{
        !isAuthenticated && navigate('/login')
    }, [isAuthenticated])
    
    return (
        <div className='roomPage'>
            <RoomForm isAuthenticated={isAuthenticated}/>
        </div>
    )
}