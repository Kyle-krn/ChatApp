import React from 'react';
import arrowSVG from './../../../../static/img/arrow.svg';
import { NavLink } from "react-router-dom";

export const RoomItem = ({id, title}) => {
    return (
        <NavLink to={`/room/${id}`}>
            <div className="roomItem">
                {title}
                <img src={arrowSVG}/>
            </div>
        </NavLink>
    )
}