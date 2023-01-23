import link from '../../../images/portfolio__link.svg';
import { HowToLearn } from '../../../utils/constants'
import { RussianTravel } from '../../../utils/constants'
import { Mesto } from '../../../utils/constants'

function Portfolio() {

    return (
        <div className="portfolio">
            <h4 className="portfolio__tittle">Портфолио</h4>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href={HowToLearn} className="portfolio__link" target="_blank" rel="noreferrer">
                        Статичный сайт<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href={RussianTravel} className="portfolio__link" target="_blank" rel="noreferrer">
                        Адаптивный сайт<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href={Mesto} className="portfolio__link">
                        Одностраничное приложение<img className="portfolio__image" src={link} alt="ссылка" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Portfolio;