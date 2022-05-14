import logo from '../../images/header__logo.svg';

function Register() {
    return (
        <form className="auth">
            <fieldset className="auth__container">
                <a href="#AboutProject" target="_self"><img src={logo} alt="Проект Movies Explorer" /></a>
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
            <button className="link-button auth__submit" type="submit">Зарегистрироваться</button>
            <p className="auth__description">Уже зарегистрированы?
                <a className="auth__link" href="#top" target="_self"> Войти</a>
            </p>
        </form>
    )
}


export default Register;