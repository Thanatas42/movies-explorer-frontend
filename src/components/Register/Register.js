import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Footer from '../Footer/Footer';

function Register({ onReg, onLog }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const [resError, setresError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        onReg(values.UserName, values.UserEmail, values.UserPass)
            .then(() => {
                onLog(values.UserName, values.UserEmail, values.UserPass);
                resetForm();
            })
            .catch((err) => {
                setresError(`Произошла ошибка ${err}, поробуйте еще раз`);
                console.log(err);
            });
    }

    return (
        <>
            <form className="auth" onSubmit={handleSubmit}>
                <fieldset className="auth__container">
                    <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                    <h1 className="auth__title">Добро пожаловать!</h1>

                    <p className="auth__text">Имя</p>
                    <input id='UserName' name='UserName' className="auth__input" type="text" minLength="2" maxLength="30"
                        required value={values.UserName} onChange={handleChange} autoComplete="username" />
                    <label className="auth__error" htmlFor="UserName">{errors.UserName}</label>

                    <p className="auth__text">E-mail</p>
                    <input id='UserEmail' name='UserEmail' className="auth__input" type="email" minLength="2" maxLength="40"
                        required value={values.UserEmail} onChange={handleChange} autoComplete="userEmail" />
                    <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>

                    <p className="auth__text">Пароль</p>
                    <input id='UserPass' name='UserPass' className="auth__input" type="password" minLength="8" maxLength="30"
                        suggested="current-password" required value={values.UserPass} onChange={handleChange} autoComplete="current-password" />
                    <label className="auth__error" htmlFor="UserPass">{errors.UserPass}</label>
                </fieldset>

                <label className="auth__error" htmlFor="RegSubmit">{resError}</label>
                <button id='RegSubmit' name='RegSubmit' className={isValid ? 'button auth__submit' :
                    'button auth__submit auth__submit_theme_disabled'} type="submit" disabled={!isValid}
                >Зарегистрироваться</button>
                <p className="auth__description">Уже зарегистрированы?
                    <Link className="link auth__link" to="/signin" target="_self"> Войти</Link>
                </p>
            </form>
            <Footer />
        </>
    )
}

export default Register;