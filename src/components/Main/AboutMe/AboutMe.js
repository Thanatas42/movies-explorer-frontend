import avatar from '../../../images/avatar.jpg';

function AboutMe() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="lead" id="student">
            <div className="lead__tittle-container">
                <h2 className="lead__tittle">Студент</h2>
            </div>
            <ul className="lead__content-container lead__content-container_about-me">
                <li className="lead__content-item lead__content-item_about-me-text">
                    <h3 className="lead__item-tittle lead__item-tittle_about-me">Дмитрий</h3>
                    <p className="lead__item-text lead__item-text_about-me">Фронтенд-разработчик, {currentYear - 1997} лет</p>
                    <p className="lead__item-text"> Разработчик СЭД в экосистеме Directum. Занимаюсь прикладной разработкой решений для систем электронного документооборота на C#.
                        С 2021 года работаю в компании «УЦ ГИС». Прошёл курс по веб-разработке, начал заниматься веб-разработкой в свободное время и хочу найти работу в направлении Веба.</p>
                    <ul className='lead__navbar'>
                        <li><a className='link lead__navlink' href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                        <li><a className='link lead__navlink' href="https://github.com/Thanatas42" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </li>
                <li className="lead__content-item lead__content-item_about-me-photo">
                    <img className="lead__content-item_about-me-photo" src={avatar} alt="Аватар" />
                </li>
            </ul>
        </div>
    );
};

export default AboutMe;