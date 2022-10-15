import React, { useContext } from 'react'
import {UserContext} from '../App'
import styles from '../styles/weather.module.scss'
function Welcome({currUser}) {
    return (
        <div className={styles.welcome}>
            <h1>Welcome back, {currUser.name}!</h1>
            <h3>How are you feeling today?</h3>
        </div>
    )
}

export default Welcome