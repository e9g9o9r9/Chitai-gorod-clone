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
import { registrationInputs, authInputs } from '../../common/constants';

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

export interface InputItem {
    id: number
    text: string
    name: string
}

interface FormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
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
    const [errors, setErrors] = useState<FormErrors>({});

    const { isSuccess } = useAppSelector(
        (state: RootState) => state.register
    );

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }
        
        if (form) {
            if (!formData.name) {
                newErrors.name = 'Имя обязательно';
            }
            
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Подтвердите пароль';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Пароли не совпадают';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const changeForm = () => {
        setForm(!form);
        setFormData({
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

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
                setErrors({
                    email: 'Ошибка регистрации. Проверьте данные.',
                    password: ' ',
                    confirmPassword: ' '
                });
            });
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        const userData = {
            email: formData.email,
            password: formData.password,
        };

        dispatch(login(userData))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setErrors({
                    email: 'Неверный email или пароль',
                    password: ' '
                });
            });
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
                            error={Boolean(errors[input.name as keyof FormErrors])}
                            helperText={errors[input.name as keyof FormErrors]}
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
                            error={Boolean(errors[input.name as keyof FormErrors])}
                            helperText={errors[input.name as keyof FormErrors]}
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