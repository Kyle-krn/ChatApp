import React, {useState, useEffect} from "react";
import CSRFToken from "../CSRFToken/CSRFToken";
import { APILogin } from "../../redux/auth/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "../LoadingButton/LoadingButton";

export const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const {isLoading, error} = useSelector(state => state.authData.login)
    const dispatch = useDispatch();

    const hadnleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        dispatch(APILogin(formData));
    }

    useEffect(()=>{
        !!error && setFormData({
            username: '',
            password: ''
        })
    }, [error])

    return (
        <div className="loginForm">
            <span>Авторизация</span>
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