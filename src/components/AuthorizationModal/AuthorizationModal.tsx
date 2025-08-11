import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../store/slices/registerSlice';
import { ChangeEvent } from 'react';
import { RootState } from '../../store/store';
import { login } from '../../store/slices/authSlice';
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
    name: string // Добавляем имя поля для связи с formData
}

interface FormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

const AuthorizationModal: React.FC<Props> = ({ handleClose, open }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const { isSuccess } = useAppSelector(
        (state: RootState) => state.register
    );
    console.log(formData, "formData111");

    const registrationInputs: InputItem[] = [
        {
            id: 1,
            text: "Введите вашу электроную почту",
            name: "email"
        },
        {
            id: 2,
            text: "Ваше имя",
            name: "name"
        },
        {
            id: 3,
            text: "Введите пароль",
            name: "password"
        },
        {
            id: 4,
            text: "Введите пароль повторно",
            name: "confirmPassword"
        },
    ];

    const authInputs: InputItem[] = [
        {
            id: 1,
            text: "Введите вашу электроную почту",
            name: "email"
        },
        {
            id: 2,
            text: "Введите пароль",
            name: "password"
        },
    ];

    const changeForm = () => {
        setForm(!form);
        setFormData({
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        const userData = {
            email: formData.email,
            name: formData.name,
            password: formData.password,
        };

        dispatch(register(userData))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            email: formData.email,
            password: formData.password,
        };
        console.log('Login data:', { email: formData.email, password: formData.password });

        dispatch(login(userData))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
        handleClose();
    };

    if (isSuccess) {
        dispatch(reset());
        navigate('/');
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {form ? (
                <Box component="form" onSubmit={handleRegister} sx={style}>
                    <span>Регистрация</span>
                    {registrationInputs.map((input) => (
                        <TextField
                            key={input.id}
                            name={input.name}
                            label={input.text}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            onChange={onChange}
                            value={formData[input.name as keyof FormData]}
                            type={input.name.includes('password') ? 'password' : 'text'}
                            required
                        />
                    ))}
                    <Box sx={{ display: "flex", gap: "4px" }}>
                        <span>Уже есть аккаунт?</span>
                        <span className={styles.textButton} onClick={changeForm}>Войти</span>
                    </Box>
                    <Button type="submit" variant="contained">Зарегистрироваться</Button>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleLogin} sx={style}>
                    <span>Вход</span>
                    {authInputs.map((input) => (
                        <TextField
                            key={input.id}
                            name={input.name}
                            label={input.text}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            onChange={onChange}
                            value={formData[input.name as keyof FormData]}
                            type={input.name.includes('password') ? 'password' : 'text'}
                            required
                        />
                    ))}
                    <Box sx={{ display: "flex", gap: "4px" }}>
                        <span>Нет аккаунта?</span>
                        <span className={styles.textButton} onClick={changeForm}>Регистрация</span>
                    </Box>
                    <Button type="submit" variant="contained">Войти</Button>
                </Box>
            )}
        </Modal>
    );
}

export default AuthorizationModal;