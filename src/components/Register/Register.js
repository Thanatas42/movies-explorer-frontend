import React, { useCallback } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { RegexEmail } from '../../utils/constants';
import Footer from '../Footer/Footer';


function Register({ onReg, onLog }) {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [resError, setresError] = React.useState('');

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });

        if (target.name === 'UserEmail') {
            const regex = RegexEmail;
            if (!regex.test(target.value)) {
                target.style = "color: #EE3465";
                setIsValid(regex.test(target.value));
                setErrors({ ...errors, [name]: "Email должен соответствовать схеме NN@NN.com" })
            } else {
                target.style = "color: #FFF";
                setIsValid(regex.test(target.value));
                setErrors({ ...errors, [name]: "" })
            }
        } else {
            setErrors({ ...errors, [name]: target.validationMessage });
            setIsValid(target.closest("form").checkValidity());
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        onReg(getValue(values, 'UserEmail'), getValue(values, 'UserPass'), getValue(values, 'UserName'))
            .then(() => {
                onLog(getValue(values, 'UserEmail'), getValue(values, 'UserPass'));
                resetForm();
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
    });

    return (
        <>
            <form className="auth" onSubmit={handleSubmit}>
                <fieldset className="auth__container">
                    <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                    <h1 className="auth__title">Добро пожаловать!</h1>

                    <p className="auth__text">Имя</p>
                    <input id='UserName' name='UserName' className="auth__input" type="text"
                        minLength="2" maxLength="30"
                        required value={getValue(values, 'UserName')} onChange={handleChange} autoComplete="username" />
                    <label className="auth__error" htmlFor="UserName">{errors.UserName}</label>

                    <p className="auth__text">E-mail</p>
                    <input id='UserEmail' name='UserEmail' className="auth__input" type="email"
                        minLength="2" maxLength="40" required
                        value={getValue(values, 'UserEmail')} onChange={handleChange} autoComplete="userEmail" />
                    <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>

                    <p className="auth__text">Пароль</p>
                    <input id='UserPass' name='UserPass' className="auth__input" type="password"
                        minLength="8" maxLength="30" suggested="current-password"
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
            <Footer />
        </>
    )
}


export default Register;