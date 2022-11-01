import React from "react";
import logoutSVG from '../../../static/img/logout.svg'
import styles from './Logout.module.css'

export const LogoutComponent = () => {
    return (
        <img src={logoutSVG} className={styles.logout}></img>
    )
}