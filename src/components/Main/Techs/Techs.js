function Techs() {

    return (
        <div className="promo promo_techs" id="techs">
            <div className="promo__tittle-container">
                <h2 className="promo__about-tittle">Технологии</h2>
            </div>
            <h3 className="promo__tittle promo__tittle_techs">7 технологий</h3>
            <p className="promo__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="promo__navbar promo__navbar_techs">
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics" target="_blank" rel="noreferrer">HTML</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics" target="_blank" rel="noreferrer">CSS</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">JS</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://git-scm.com" target="_blank" rel="noreferrer">Git</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://expressjs.com" target="_blank" rel="noreferrer">Express.js</a></li>
                <li className="promo__nav-item promo__nav-item_techs"><a className="promo__nav-link promo__nav-link_techs" href="https://www.mongodb.com" target="_blank" rel="noreferrer">mongoDB</a></li>
            </ul>
        </div>
    );
}

export default Techs;