import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';
import styles from "./styles.module.scss"

const style = {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    handleClose: () => void,
    open: boolean
}

interface InputItem {
    id: number
    text: string
}

const AuthorizationModal: React.FC<Props> = ({ handleClose, open }) => {

    const [form, setForm] = useState(false)

    const registrationInputs: InputItem[] = [
        {
            id: 1,
            text: "Введите ваш номер телефона"
        },
        {
            id: 2,
            text: "Ваше имя"
        },
        {
            id: 3,
            text: "Введите пароль"
        },
        {
            id: 4,
            text: "Введите пароль повторно"
        },
    ]

    const authInputs: InputItem[] = [
        {
            id: 1,
            text: "Введите ваш номер телефона"
        },
        {
            id: 2,
            text: "Введите пароль"
        },
    ]


    const changeForm = () => {
        setForm(!form)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {form ? <Box sx={style}>
                    <span>Регистрация</span>
                    {registrationInputs.map((input) => {
                        return <TextField id="outlined-basic" label={input.text} variant="outlined" sx={{ width: "100%" }} />
                    })}

                    <Box sx={{ display: "flex", gap: "4px" }}> <span >Уже есть аккаунт?</span><span className={styles.textButton} onClick={changeForm}>Войти</span></Box>
                    <Button variant="contained">Зарегистрироваться</Button>
                </Box > : <Box sx={style}>
                    <span>Вход</span>
                    {authInputs.map((input) => {
                        return <TextField id="outlined-basic" label={input.text} variant="outlined" sx={{ width: "100%" }} />
                    })}

                    <Box sx={{ display: "flex", gap: "4px" }}> <span >Нет аккаунта?</span><span className={styles.textButton} onClick={changeForm}>Регистрация</span></Box>
                    <Button variant="contained">Войти</Button></Box>}
            </Modal>
        </div>
    );
}

export default AuthorizationModal
