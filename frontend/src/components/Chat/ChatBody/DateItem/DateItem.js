import React from "react";
import styles from './DateItem.module.css';

export const DateItem = ({date}) => {
    const userDate = new Date(date).valueOf() - ((new Date).getTimezoneOffset() * 60000)
    return (
        <div className={styles.dateItem}>
            {new Date(userDate).toLocaleString("ru-RU", {dateStyle: "full"})}
            
        </div>
    )
}