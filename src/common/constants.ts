import { InputItem } from "../components/AuthorizationModal/AuthorizationModal";

export const menuItems = [
    {
        id: 1,
        text: "Профиль",
        link: "/profile"
    },
    {
        id: 2,
        text: "Заказы",
        link: "/orders"
    },
    {
        id: 3,
        text: "Сертификаты",
        link: "/sertificates"
    },
    {
        id: 4,
        text: "Бонусная карта",
        link: "/bonus-card"
    },
    {
        id: 5,
        text: "Закладки",
        link: "/bookmarks"
    },
    {
        id: 6,
        text: "Профиль",
        link: "/profile"
    },
    {
        id: 7,
        text: "Выйти",
        link: "/"
    },
]

    export const registrationInputs: InputItem[] = [
        { id: 1, text: "Введите вашу электронную почту", name: "email" },
        { id: 2, text: "Ваше имя", name: "name" },
        { id: 3, text: "Введите пароль", name: "password" },
        { id: 4, text: "Введите пароль повторно", name: "confirmPassword" },
    ];

    export const authInputs: InputItem[] = [
        { id: 1, text: "Введите вашу электронную почту", name: "email" },
        { id: 2, text: "Введите пароль", name: "password" },
    ];