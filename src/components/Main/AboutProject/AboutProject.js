function AboutProject() {

    return (
        <div className="lead" id="AboutProject">
            <div className="lead__tittle-container">
                <h2 className="lead__tittle">О проекте</h2>
            </div>
            <ul className="lead__content-container">
                <li className="lead__content-item">
                    <h3 className="lead__item-tittle">Дипломный проект включал 5 этапов</h3>
                    <p className="lead__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="lead__content-item">
                    <h3 className="lead__item-tittle">На выполнение диплома ушло 5 недель</h3>
                    <p className="lead__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="lead__content-container lead__content-container_progress-bar">
                <li className="lead__content-item lead__content-item_progress-bar">
                    <div className="lead__progress">1 неделя</div>
                    <p className="lead__progress-description">Back-end</p>
                </li>
                <li className="lead__content-item lead__content-item_progress-bar">
                    <div className="lead__progress lead__progress_inactive">4 недели</div>
                    <p className="lead__progress-description">Front-end</p>
                </li>
            </ul>
        </div>
    )
}

export default AboutProject;