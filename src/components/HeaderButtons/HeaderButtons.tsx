import React, { FC, MouseEventHandler, useState, useRef, useEffect } from 'react'
import book from "../../assets/svg/book.svg"
import cart from "../../assets/svg/cart.svg"
import user from "../../assets/svg/user.svg"
import bookmarks from "../../assets/svg/bookmarks.svg"
import styles from "./styles.module.scss"
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { RootState } from '../../store/store'
import { logout } from '../../store/slices/authSlice'
import { menuItems } from '../../common/constants'
import { useNavigate } from 'react-router-dom'

interface Props {
    handleOpen: () => void
}

interface ButtonItem {
    id: number;
    icon: string;
    text: string | undefined | null;
    link: string | MouseEventHandler<HTMLDivElement>;
    isUserMenu?: boolean;
}

const HeaderButtons: React.FC<Props> = ({ handleOpen }) => {
    const { name, token } = useAppSelector(
        (state: RootState) => state.login
    );
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleUserMenuToggle = () => {
        if (token) {
            setIsUserMenuOpen(!isUserMenuOpen);
        } else {
            handleOpen();
        }
    };

    const handleLogout = () => {
        dispatch(logout())
        setIsUserMenuOpen(false) 
    }

    const handleItemClick = (item: typeof menuItems[0]) => {
        setIsUserMenuOpen(false)

        if (item.text === "Выйти") {
            handleLogout()
        } else {
            navigate(item.link)
        }
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setIsUserMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const buttons: ButtonItem[] = [
        {
            id: 1,
            icon: user,
            text: token ? name : "Войти",
            link: handleUserMenuToggle,
            isUserMenu: true
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
            {buttons.map((button) => (
                <div
                    key={button.id}
                    onClick={typeof button.link === 'function' ? button.link : undefined}
                    className={styles.button}
                    ref={button.isUserMenu ? userMenuRef : null}
                >
                    <img src={button.icon} alt="" className={styles.image} />
                    <span className={styles.text}>{button.text}</span>

                    {button.isUserMenu && isUserMenuOpen && token && (
                        <div className={styles.userMenu}>
                            {menuItems.map((item) => {
                                return <div key={item.id}
                                    className={styles.userMenuItem}
                                    onClick={() => handleItemClick(item)}>{item.text}</div>
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default HeaderButtons