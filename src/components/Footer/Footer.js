const year = new Date().getFullYear();

function Footer() {

    return (
        <footer className="footer">
            <h4 className="footer__tittle">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__container">
                <p>&#169; {year}</p>
                <ul className="footer__list">
                    <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
                    <li className="footer__item"><a className="footer__link" href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;