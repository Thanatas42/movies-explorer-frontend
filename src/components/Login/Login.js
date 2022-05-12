import logo from '../../images/header__logo.svg';

function Login() {
    return (
        <form className="login">
            <a className="login__logo" href="#AboutProject" target="_self"><img src={logo} alt="Проект Movies Explorer" /></a>
            <h1 className="login__title">Рады видеть!</h1>
            <p className="login__text">Email</p>
            <input className="login__input" type="email"
                minLength="2" maxLength="40"
                required />
            <p className="login__text">Пароль</p>
            <input className="login__input" type="text"
                minLength="2" maxLength="40"
                required />
        </form>
    )
}

export default Login;