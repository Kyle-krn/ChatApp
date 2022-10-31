import React, {useState, useEffect} from 'react';
import { axiosInstance } from '../../api/instance';
import api from './../../api/index';
import axios from 'axios';

const CSRFToken = () => {
    const [csrftoken, setCsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(()=>{
        const fetchData = async () => {
            try {
                await api.auth.getCSRFToken();
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
        setCsrftoken(getCookie('csrftoken'));
    }, [])

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}/>
    )

}

export default CSRFToken;