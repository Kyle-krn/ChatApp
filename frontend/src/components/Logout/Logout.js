import React from "react";
import logoutSVG from '../../../static/img/logout.svg'
import styles from './Logout.module.css'
import { NavLink } from "react-router-dom";


export const LogoutComponent = ({isChat}) => {
    return (
        <NavLink to={isChat?'/':''}>
            <img src={logoutSVG} className={styles.logout}></img>
        </NavLink>
        
    )
}