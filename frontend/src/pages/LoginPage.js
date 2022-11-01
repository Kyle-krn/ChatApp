import React, {useEffect} from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const LoginPage = () => {
    const {isAuthenticated} = useSelector(state => state.authData.login)
    const navigate = useNavigate();
    
    useEffect(()=>{
        document.title = 'Login';
    },[])

    useEffect(()=>{
        isAuthenticated && navigate('/')
    }, [isAuthenticated])
    
    return (
        <div className="loginPage">
            <LoginForm />
        </div>
    )
}