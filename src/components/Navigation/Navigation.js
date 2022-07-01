import { Link } from 'react-router-dom';

function Navigation(props) {
    return (
        <div className={props.isOpen ? "popup  popup_open" : "popup"}>
            <div className='popup__container'>
                <button className="button popup__close-button" type="reset" onClick={props.onClose}></button>
                <div className='popup__links'>
                    <Link className="link popup__link" to="/" target="_self" onClick={props.onClose}>Главная</Link>
                    <Link className="link popup__link" to="/movies" target="_self" onClick={props.onClose}>Фильмы</Link>
                    <Link className="link popup__link" to="/saved-movies" target="_self" onClick={props.onClose}>Сохранённые фильмы</Link>
                </div>
                <Link className="link popup__account" to="/profile" target="_self" onClick={props.onClose} >Аккаунт</Link>
            </div>
        </div>
    )
}

export default Navigation;