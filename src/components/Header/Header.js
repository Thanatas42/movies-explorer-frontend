import logo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
            <div className='header__container'>
                <Link className="header__logo" to="/" target="_self"><img src={logo} alt="Проект Movies Explorer" /></Link>
                {props.headerContentLeft}
            </div>
            <div className='header__container'>
                {props.headerContentRight}
            </div>
        </header>
    )
}

export default Header;