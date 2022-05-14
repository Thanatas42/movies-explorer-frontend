import logo from '../../images/header__logo.svg';

function Login() {
    return (
        <form className="auth">
            <fieldset className="auth__container">
                <a href="#AboutProject" target="_self"><img src={logo} alt="Проект Movies Explorer" /></a>
                <h1 className="auth__title">Рады видеть!</h1>
                <p className="auth__text">Email</p>
                <input className="auth__input" type="email"
                    minLength="2" maxLength="40"
                    required />
                <p className="auth__text">Пароль</p>
                <input className="auth__input" type="text"
                    minLength="2" maxLength="40"
                    required />
            </fieldset>
            <button className="link-button auth__submit" type="submit">Войти</button>
            <p className="auth__description">Ещё не зарегистрированы?
                <a className="auth__link" href="#top" target="_self"> Регистрация</a>
            </p>
        </form>
    )
}

export default Login;