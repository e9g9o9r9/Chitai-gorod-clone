import React, { FC, MouseEventHandler } from 'react'
import book from "../../assets/svg/book.svg"
import cart from "../../assets/svg/cart.svg"
import user from "../../assets/svg/user.svg"
import bookmarks from "../../assets/svg/bookmarks.svg"
import styles from "./styles.module.scss"

interface Props {
    handleOpen: () => void
}

interface ButtonItem {
    id: number;
    icon: string;
    text: string;
    link: string | MouseEventHandler<HTMLDivElement>;
}

const HeaderButtons: React.FC<Props> = ({ handleOpen }) => {
    const buttons: ButtonItem[] = [
        {
            id: 1,
            icon: user,
            text: "Войти",
            link: handleOpen,
        },
        {
            id: 2,
            icon: book,
            text: "Заказы",
            link: "",
        },
        {
            id: 3,
            icon: bookmarks,
            text: "Закладки",
            link: "",
        },
        {
            id: 4,
            icon: cart,
            text: "Корзина",
            link: "",
        },
    ]

    return (
        <div className={styles.wrapper}>
            {buttons.map((button) => <div key={button.id} onClick={typeof button.link === 'function' ? button.link : undefined} className={styles.button}>
                <img src={button.icon} alt="" className={styles.image} />
                <span className={styles.text}>{button.text}</span>
            </div>)}
        </div>
    )
}

export default HeaderButtons