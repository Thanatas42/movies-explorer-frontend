import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Main() {
    let headerContentRight =
        <>
            <Link className="link header__link" to="/signup" target="_self">Регистрация</Link>
            <Link className="link header__button" to="/signin" target="_self">Войти</Link>
        </>

    return (
        <>
            <Header headerContentRight={headerContentRight} />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </>
    )
}

export default Main;