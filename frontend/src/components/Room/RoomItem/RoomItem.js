import React from 'react';
import arrowSVG from './../../../../static/img/arrow.svg';
import { NavLink } from "react-router-dom";
import styles from './RoomItem.module.css'

export const RoomItem = ({id, title}) => {
    return (
        <NavLink to={`/room/${id}`}>
            <div className={styles.roomItem}>
                {title}
                <img src={arrowSVG}/>
            </div>
        </NavLink>
    )
}