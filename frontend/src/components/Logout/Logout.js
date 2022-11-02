import React from "react";
import logoutSVG from '../../../static/img/logout.svg'
import styles from './Logout.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { APILogout } from "../../redux/auth/loginReducer";


export const LogoutComponent = ({isChat}) => {
    const dispatch = useDispatch();

    if (isChat) {
        return (
            <NavLink to={isChat?'/':''}>
                <img src={logoutSVG} className={styles.logout}></img>
            </NavLink>
        )
    } else {
        return (
            <div onClick={()=> dispatch(APILogout())}>
                <img src={logoutSVG} className={styles.logout}></img>
            </div>
        )
    }
    
}