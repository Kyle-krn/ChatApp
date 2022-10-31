import React from "react";


export const LoginForm = () => {
    return (
        <div className="loginForm">
            <span>Авторизация</span>
            <form>
                <input placeholder="Логин"/>
                <input placeholder="Пароль"/>
                <button>Войти</button>
            </form>
        </div>
    )
}