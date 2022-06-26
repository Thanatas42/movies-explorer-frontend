import React, { useCallback, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Login({ onLog }) {
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

    function resetForm() {
        setValues({});
        setErrors({});
        setIsValid(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onLog(getValue(values, 'UserEmail'), getValue(values, 'UserPass'))
            .then(() => {
                resetForm();
                history.push("/movies");
            })
            .catch((err) => {
                setresError(err);
                console.log(err);
            });
    };

    
    useEffect(() => {
        return () => {
            if (localStorage.getItem("jwt")) {
                history.push("/movies");
            }
        }
    }, [history]);

    const getValue = useCallback((obj, nameProp) => {
        let { [nameProp]: email = '' } = obj;
        return email;
    });

    return (
        <form className="auth" onSubmit={handleSubmit}>
            <fieldset className="auth__container">
                <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                <h1 className="auth__title">Рады видеть!</h1>
                <p className="auth__text">Email</p>
                <input id='UserEmail' name='UserEmail' className="auth__input" type="email"
                    minLength="2" maxLength="40"
                    required value={getValue(values, 'UserEmail')} onChange={handleChange} />
                <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>
                <p className="auth__text">Пароль</p>
                <input id='UserPass' name='UserPass' className="auth__input" type="password"
                    minLength="8" maxLength="40" suggested="current-password"
                    required value={getValue(values, 'UserPass')} onChange={handleChange} />
                <label className="auth__error" htmlFor="UserPass">{errors.UserPass}</label>
            </fieldset>
            <label className="auth__error" htmlFor="RegSubmit">{resError}</label>
            <button className={isValid ? 'button auth__submit' :
                'button auth__submit auth__submit_theme_disabled'} type="submit" disabled={!isValid}>Войти</button>
            <p className="auth__description">Ещё не зарегистрированы?
                <Link className="link auth__link" to="/signup" target="_self"> Регистрация</Link>
            </p>
        </form >
    )
}

export default Login;