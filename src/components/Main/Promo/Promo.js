function Promo() {
    return (
        <div className="promo">
            <h1 className="promo__tittle">Учебный проект студента факультета Веб-разработки.</h1>
            <nav>
                <ul className="promo__navbar">
                    <li className="promo__nav-item"><a className="promo__nav-link" href="#AboutProject">О проекте</a></li>
                    <li className="promo__nav-item"><a className="promo__nav-link" href="#techs">Технологии</a></li>
                    <li className="promo__nav-item"><a className="promo__nav-link" href="#student">Студент</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Promo;