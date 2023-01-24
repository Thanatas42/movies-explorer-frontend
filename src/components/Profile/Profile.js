import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Footer from '../Footer/Footer';

function Profile(props) {
    const user = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [responsible, setResponsible] = useState({ resStatus: false, resMessage: '' });

    function handleSubmit(e) {
        e.preventDefault();

        fillingEmptyValues(values, user);

        props.handleUpdateUser(values.UserName, values.UserEmail)
            .then(() => {
                props.setCurrentUser({
                    userName: values.UserName,
                    userEmail: values.UserEmail,
                    userId: user._id
                });
                setResponsible({ resStatus: true, resMessage: 'Профиль успешно отредактирован' });
            })
            .catch((err) => {
                console.log(err);
                setResponsible({ resStatus: false, resMessage: 'Произошла ошибка при редактировании профиля' });
            });
    };

    function fillingEmptyValues(values, user) {
        if (!values.UserName || !values.UserEmail) {
            if (!values.UserName) {
                values.UserName = user.userName;
            }
            if (!values.UserEmail) {
                values.UserEmail = user.userEmail;
            }
        }
    }

    function isValueNotCurrent(values, user, isValid) {
        return user.userName === values.UserName
            && user.userEmail === values.UserEmail ? false : isValid;
    }

    return (
        <>
            <form className="auth auth_profile" onSubmit={handleSubmit}>
                <fieldset className="auth__container auth__container_profile">
                    <h1 className="auth__title auth__title_profile">Привет, {user.userName}!</h1>
                    <div className="auth__group">
                        <p className="auth__text auth__text_profile">Имя</p>
                        <input name='UserName' className="auth__input auth__input_profile" minLength="2"
                            maxLength="40" value={values.UserName || user.userName} onChange={handleChange} required />
                    </div>
                    <label className="auth__error" htmlFor="UserName">{errors.UserName}</label>
                    <div className="auth__group">
                        <p className="auth__text auth__text_profile">Email</p>
                        <input name='UserEmail' className="auth__input auth__input_profile" type="email" minLength="2"
                            maxLength="40" value={values.UserEmail || user.userEmail} onChange={handleChange} required />
                    </div>
                    <label className="auth__error" htmlFor="UserEmail">{errors.UserEmail}</label>
                    <p className={responsible.resStatus ? 'auth__text auth__text_update'
                        : 'auth__text auth__text_update auth__link_theme-red'}>{responsible.resMessage}</p>
                </fieldset>
                <button className={isValueNotCurrent(values, user, isValid) ? "link auth__link auth__link_profile" :
                    'link auth__link auth__link_profile auth__submit_theme_disabled'} type="submit" disabled={!isValueNotCurrent(values, user, isValid)}>Редактировать</button>
                <Link className="link auth__link auth__link_theme-red" to="#" onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </form>
            <Footer />
        </>
    )
}

export default Profile;
