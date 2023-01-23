import logo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';
import navIcon from '../../images/navIcon.svg';
import { useLocation } from 'react-router-dom';
import { HeaderPathLists } from "../../utils/constants";


function Header(props) {
    const location = useLocation();

    return (
        <>
            {HeaderPathLists.includes(location.pathname) ?
                <header className="header">
                    <div className='header__container'>
                        <Link className="header__logo" to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                        {(props.LogOn) ? (
                            <><Link className="link header__link header__link_log-on" to="/movies" target="_self">Фильмы</Link>
                                <Link className="link header__link header__link_log-on" to="/saved-movies" target="_self">Сохранённые фильмы</Link></>)
                            : (<></>)
                        }
                    </div>
                    <div className='header__container'>
                        {(props.LogOn) ? (
                            <><Link className="link header__account" to="/profile" target="_self">Аккаунт</Link>
                                <button className='header__navigation' onClick={props.onOpen}><img src={navIcon} alt="Кнопка «button»"></img></button></>)
                            : (<><Link className="link header__link" to="/signup" target="_self">Регистрация</Link>
                                <Link className="link header__button" to="/signin" target="_self">Войти</Link></>)
                        }
                    </div>
                </header> : <></>}
        </>
    )
}

export default Header;