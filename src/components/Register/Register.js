import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Register() {
    const [nameInput, setNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setpasswordInput] = React.useState('');
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);

    function validateField(fieldName, value) {
        switch (fieldName) {
            case 'email': value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            setEmailValid = emailValid ? '' : ' is invalid';
                break;
        }
    }

    function handleChangeNameInput(e) {
        setNameInput(e.target.value, () => {
            
        });
    }
    function handleChangeEmailInput(e) {
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        setpasswordInput(e.target.value);
    }

    const resetForm = () => {
        setEmailInput('');
        setpasswordInput('');
    };

    return (
        <form className="auth">
            <fieldset className="auth__container">
                <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                <h1 className="auth__title">Добро пожаловать!</h1>
                <p className="auth__text">Имя</p>
                <input className="auth__input" type="text"
                    minLength="2" maxLength="30"
                    required value={nameInput} onChange={handleChangeNameInput} />
                <p className="auth__text">E-mail</p>
                <input className="auth__input" type="email"
                    minLength="2" maxLength="40"
                    required value={emailInput} onChange={handleChangeEmailInput} />
                <p className="auth__text">Пароль</p>
                <input className="auth__input" type="password"
                    minLength="2" maxLength="40"
                    required value={passwordInput} onChange={handleChangePasswordInput} />

            </fieldset>
            <button className="link auth__submit" type="submit">Зарегистрироваться</button>
            <p className="auth__description">Уже зарегистрированы?
                <Link className="link auth__link" to="/signin" target="_self"> Войти</Link>
            </p>
        </form>
    )
}


export default Register;