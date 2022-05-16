import { Link } from 'react-router-dom';

function Profile(props) {
    return (
        <form className="auth auth_profile">
            <fieldset className="auth__container auth__container_profile">
                <h1 className="auth__title auth__title_profile">Привет, {props.userName}!</h1>
                <div className="auth__group">
                    <p className="auth__text auth__text_profile">Имя</p>
                    <input className="auth__input auth__input_profile" type="text"
                        minLength="2" maxLength="40"
                        required />
                </div>
                <div className="auth__group">
                    <p className="auth__text auth__text_profile">Email</p>
                    <input className="auth__input auth__input_profile" type="email"
                        minLength="2" maxLength="40"
                        required />
                </div>
            </fieldset>
            <Link className="link auth__link auth__link_profile" to="#">Редактировать</Link>
            <Link className="link auth__link auth__link_theme-red" to="#">Выйти из аккаунта</Link>
        </form>
    )
}

export default Profile