import React, {useEffect} from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";


export const LoginPage = () => {
    useEffect(()=>{
        document.title = 'Login';
    },[])
    return (
        <div className="loginPage">
            <LoginForm />
        </div>
    )
}