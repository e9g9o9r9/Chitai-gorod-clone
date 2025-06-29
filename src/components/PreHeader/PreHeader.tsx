import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./styles.module.scss"


const PreHeader = () => {
    const links = [
        {
            id: 1,
            text: "Магазины",
            navigate: "1"
        },
        {
            id: 2,
            text: "Доставка",
            navigate: "2"
        },
        {
            id: 3,
            text: "Программа лояльности",
            navigate: "3"
        },
        {
            id: 4,
            text: "Партнерская программа",
            navigate: "4"
        },
    ]



    return (
        <div className={styles.wrapper}>
            {links.map((link) => <Link to={link.navigate} key={link.id} className={styles.link}>{link.text}</Link>)}
        </div>
    )
}

export default PreHeader