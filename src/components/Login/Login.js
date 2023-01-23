import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Footer from '../Footer/Footer';

function Login({ onLog, authStatus }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const [resError, setresError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLog(values.UserEmail, values.UserPass);
    };

    /*useEffect(() => {
        if (authStatus)
            authStatus.status ? resetForm()
                : setresError(`Что то пошло не так.. ${authStatus.err}`);
    }, [authStatus])*/

    return (
        <>
            <form className="auth" onSubmit={handleSubmit}>
                <fieldset className="auth__container">
                    <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                    <h1 className="auth__title">Рады видеть!</h1>
                    <p className="auth__text">E-mail</p>
                    <input name='UserEmail' className="auth__input" type="email" minLength="2" maxLength="40"
                        required value={values.UserEmail || ''} onChange={handleChange} autoComplete="email" />
                    <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>

                    <p className="auth__text">Пароль</p>
                    <input name='UserPass' className="auth__input" type="password" minLength="8" maxLength="30"
                        required value={values.UserPass || ''} onChange={handleChange} autoComplete="current-password" />
                    <label className="auth__error" htmlFor="UserPass">{errors.UserPass}</label>

                </fieldset>
                <label className="auth__error" htmlFor="RegSubmit">{resError}</label>
                <button className={isValid ? 'button auth__submit' :
                    'button auth__submit auth__submit_theme_disabled'} type="submit" disabled={!isValid}>Войти</button>
                <p className="auth__description">Ещё не зарегистрированы?
                    <Link className="link auth__link" to="/signup" target="_self"> Регистрация</Link>
                </p>
            </form >
            <Footer />
        </>
    )
}

export default Login;