import React, {useState, useEffect} from 'react';
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
                const res = await axios.get(`http://localhost:8000/auth/csrf_cookie`)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
        console.log(getCookie('csrftoken'))
        // setCsrftoken(getCookie('csrftoken'));
    }, [])

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}/>
    )

}

export default CSRFToken;