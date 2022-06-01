import React, { useCallback } from "react";
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Register({ onReg, onLog }) {
    const history = useHistory();
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [resError, setresError] = React.useState('');

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    function handleSubmit(e) {
        e.preventDefault();
        onReg(getValue(values, 'UserEmail'), getValue(values, 'UserPass'), getValue(values, 'UserName'))
            .then(() => {
                onLog(getValue(values, 'UserEmail'), getValue(values, 'UserPass'));
                resetForm();
                history.push("/movies");
            })
            .catch((err) => {
                setresError(`Произошла ошибка ${err}, поробуйте еще раз`);
                console.log(err);
            });
    }

    function resetForm() {
        setValues({});
        setErrors({});
        setIsValid(false);
    };

    const getValue = useCallback((obj, nameProp) => {
        let { [nameProp]: email = '' } = obj;
        return email;
    }
    );

    return (
        <form className="auth" onSubmit={handleSubmit}>
            <fieldset className="auth__container">
                <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                <h1 className="auth__title">Добро пожаловать!</h1>
                <p className="auth__text">Имя</p>
                <input id='UserName' name='UserName' className="auth__input" type="text"
                    minLength="2" maxLength="32"
                    required value={getValue(values, 'UserName')} onChange={handleChange} autoComplete="username" />
                <label className="auth__error" htmlFor="UserName">{errors.UserName}</label>
                <p className="auth__text">E-mail</p>
                <input id='UserEmail' name='UserEmail' className="auth__input" type="email"
                    minLength="2" maxLength="40"
                    required value={getValue(values, 'UserEmail')} onChange={handleChange} autoComplete="username" />
                <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>
                <p className="auth__text">Пароль</p>
                <input id='UserPass' name='UserPass' className="auth__input" type="password"
                    minLength="8" maxLength="32" suggested="current-password"
                    required value={getValue(values, 'UserPass')} onChange={handleChange} autoComplete="current-password" />
                <label className="auth__error" htmlFor="UserPass">{errors.UserPass} </label>
            </fieldset>
            <label className="auth__error" htmlFor="RegSubmit">{resError}</label>
            <button id='RegSubmit' name='RegSubmit' className={isValid ? 'button auth__submit' :
                'button auth__submit auth__submit_theme_disabled'} type="submit" disabled={!isValid}
            >Зарегистрироваться</button>
            <p className="auth__description">Уже зарегистрированы?
                <Link className="link auth__link" to="/signin" target="_self"> Войти</Link>
            </p>
        </form>
    )
}


export default Register;