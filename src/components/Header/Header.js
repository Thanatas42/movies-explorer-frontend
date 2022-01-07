import logo from '../../images/header__logo.svg';

function Header() {

    return (
        <header className="header">
            <div className='header__container'>
                <a className="header__logo" href="#top" target="_self"><img src={logo} alt="Проект Movies Explorer" /></a>
            </div>
            <div className='header__container'>
                <a href="#top" target="_self" className="header__link">Регистрация</a>
                <button className="header__button" type="button">Войти</button>
            </div>
        </header>
    )
}

export default Header;