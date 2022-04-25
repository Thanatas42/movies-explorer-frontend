import logo from '../../images/header__logo.svg';

function Header() {

    return (
        <header className="header">
            <div className='header__container'>
                <a className="header__logo" href="#AboutProject" target="_self"><img src={logo} alt="Проект Movies Explorer" /></a>
            </div>
            <div className='header__container'>
                <a className="link-button header__link" href="#top" target="_self">Регистрация</a>
                <a className="link-button header__button"  href="#top" target="_self">Войти</a>
            </div>
        </header>
    )
}

export default Header;