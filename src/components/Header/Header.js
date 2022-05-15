import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Header() {

    return (
        <header className="header">
            <div className='header__container'>
                <Link className="header__logo" to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
            </div>
            <div className='header__container'>
                <Link className="link header__link" to="/signup" target="_self">Регистрация</Link>
                <Link className="link header__button" to="/signin" target="_self">Войти</Link>
            </div>
        </header>
    )
}

export default Header;