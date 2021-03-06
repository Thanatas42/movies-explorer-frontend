import link from '../../../images/portfolio__link.svg';

function Portfolio() {

    return (
        <div className="portfolio">
            <h4 className="portfolio__tittle">Портфолио</h4>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="https://thanatas42.github.io/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
                        Статичный сайт<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://thanatas42.github.io/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
                        Адаптивный сайт<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="#top" className="portfolio__link">
                        Одностраничное приложение<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Portfolio;