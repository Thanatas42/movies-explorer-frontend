import { Link } from 'react-router-dom';

function Navigation() {
    return ( /*popup_open*/
        <div className="popup ">
            <div className='popup__container'>
                <button className="button popup__close-button" type="reset"></button>
                <div className='popup__links'>
                    <Link className="link popup__link" to="/" target="_self">Главная</Link>
                    <Link className="link popup__link" to="/movies" target="_self">Фильмы</Link>
                    <Link className="link popup__link" to="/saved-movies" target="_self">Сохранённые фильмы</Link>
                </div>
                <Link className="link popup__account" to="/profile" target="_self">Аккаунт</Link>
            </div>
        </div>
    )
}

export default Navigation;