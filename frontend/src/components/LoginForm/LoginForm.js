import React, {useState} from "react";
import CSRFToken from "../CSRFToken/CSRFToken";
import { APILogin } from "../../redux/auth/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { unsetError } from "../../redux/auth/loginReducer";


export const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const {isLoading, error} = useSelector(state => state.authData.login)
    const dispatch = useDispatch();

    const hadnleOnChange = e => {
        !!error && dispatch(unsetError())
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        dispatch(APILogin(formData));
        setFormData({
            username: '',
            password: ''
        })
    }

    return (
        <div className="form loginForm">
            <span className="form_title">Авторизация</span>
            <form onSubmit={handleSubmitForm}>
                <CSRFToken />
                <input placeholder={error? error:"Логин"}  
                       name="username"
                       className={error? 'error': ''}
                       onChange={hadnleOnChange}
                       value={formData.username}
                       
                />
                <input placeholder="Пароль" 
                       name="password"
                       type="password"
                       className={error? 'error': ''}
                       onChange={hadnleOnChange}
                       value={formData.password}
                       
                />
                {isLoading?<LoadingButton />:<button className={!!formData.username && !!formData.password? "btn":"btn disableButton"}  
                        disabled={!formData.username || !formData.password}>Войти</button>}
                
            </form>
        </div>
    )
}