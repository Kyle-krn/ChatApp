import React, {useState} from "react";
import CSRFToken from "../CSRFToken/CSRFToken";

export const LoginForm = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("handle")
    }
    return (
        <div className="loginForm">
            <span>Авторизация</span>
            <form onSubmit={handleSubmitForm}>
                <CSRFToken />
                <input placeholder="Логин"  
                       onChange={(e) => {setLogin(e.target.value)}}
                       value={login}
                />
                <input placeholder="Пароль" 
                       onChange={(e) => {setPassword(e.target.value)}}
                       value={password}
                       type="password"
                />
                <button>Войти</button>
            </form>
        </div>
    )
}