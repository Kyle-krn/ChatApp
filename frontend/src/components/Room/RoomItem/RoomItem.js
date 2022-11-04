import React from 'react';
import arrowSVG from './../../../../static/img/arrow.svg';
import { NavLink } from "react-router-dom";
import styles from './RoomItem.module.css'

export const RoomItem = ({id, title}) => {
    return (
        <NavLink to={`/room/${id}`}>
            <div className={styles.roomItem}>
                <div className={styles.roomTitleWrapper}>
                    <span className={styles.roomTitle}>{title}</span>
                </div> 
                <img src={arrowSVG}/>
            </div>
        </NavLink>
    )
}