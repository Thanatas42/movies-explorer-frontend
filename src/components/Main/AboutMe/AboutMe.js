import avatar from '../../../images/avatar.svg';

function AboutMe() {

    return (
        <div className="lead" id="student">
            <div className="lead__tittle-container">
                <h2 className="lead__tittle">Студент</h2>
            </div>
            <ul className="lead__content-container lead__content-container_about-me">
                <li className="lead__content-item lead__content-item_about-me-text">
                    <h3 className="lead__item-tittle lead__item-tittle_about-me">Дмитрий</h3>
                    <p className="lead__item-text lead__item-text_about-me">Фронтенд-разработчик, 25 лет</p>
                    <p className="lead__item-text" style={{ lineHeight: "22px" }}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
                        «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <ul className='lead__navbar'>
                        <li><a className='lead__navlink' href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                        <li><a className='lead__navlink' href="https://github.com/Thanatas42" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </li>
                <li className="lead__content-item lead__content-item_about-me-photo">
                    
                </li>
            </ul>
        </div>
    );
};

export default AboutMe;