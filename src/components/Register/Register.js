import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Register() {
    return (
        <form className="auth">
            <fieldset className="auth__container">
                <Link to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                <h1 className="auth__title">Добро пожаловать!</h1>
                <p className="auth__text">Имя</p>
                <input className="auth__input" type="text"
                    minLength="2" maxLength="40"
                    required />
                <p className="auth__text">E-mail</p>
                <input className="auth__input" type="email"
                    minLength="2" maxLength="40"
                    required />
                <p className="auth__text">Пароль</p>
                <input className="auth__input" type="text"
                    minLength="2" maxLength="40"
                    required />
            </fieldset>
            <button className="link auth__submit" type="submit">Зарегистрироваться</button>
            <p className="auth__description">Уже зарегистрированы?
                <Link className="link auth__link" to="/signin" target="_self"> Войти</Link>
            </p>
        </form>
    )
}


export default Register;