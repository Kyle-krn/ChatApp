import React from "react";
import styles from './DateItem.module.css';
import Moment from 'react-moment';


export const DateItem = ({date}) => {
    const userDate = new Date(date).valueOf() - ((new Date).getTimezoneOffset() * 60000)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return (
        <div className={styles.dateItem}>
            <Moment date={userDate} format="DD.MM.YYYY"/>
        </div>
    )
}