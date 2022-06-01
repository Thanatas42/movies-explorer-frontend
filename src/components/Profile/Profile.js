import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();
    const [values, setValues] = useState({ UserName: currentUser.userName, UserEmail: currentUser.userEmail });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.updateUser(values.UserName, values.UserEmail)
    };

    return (
        <form className="auth auth_profile" onSubmit={handleSubmit}>
            <fieldset className="auth__container auth__container_profile">
                <h1 className="auth__title auth__title_profile">Привет, {currentUser.userName}!</h1>
                <div className="auth__group">
                    <p className="auth__text auth__text_profile">Имя</p>
                    <input id='UserName' name='UserName' className="auth__input auth__input_profile" type="text"
                        minLength="2" maxLength="40" value={values.UserName} onChange={handleChange}
                        required />
                </div>
                <div className="auth__group">
                    <p className="auth__text auth__text_profile">Email</p>
                    <input id='UserEmail' name='UserEmail' className="auth__input auth__input_profile"
                        type="email" minLength="2" maxLength="40" value={values.UserEmail} onChange={handleChange}
                        required />
                </div>
            </fieldset>
            <button className={isValid ? "link auth__link auth__link_profile" :
                'link auth__link auth__link_profile auth__submit_theme_disabled'} type="submit" disabled={!isValid}>Редактировать</button>
            <Link className="link auth__link auth__link_theme-red" to="#" onClick={props.onSignOut}>Выйти из аккаунта</Link>
        </form>
    )
}

export default Profile