function AboutProject() {

    return (
        <div className="lead">
            <div className="lead__tittle-container">
                <h2 className="lead__tittle">О проекте</h2>
            </div>
            <ul className="lead__content-container">
                <li className="lead__content-item">
                    <h3>Дипломный проект включал 5 этапов</h3>
                    <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="lead__content-item">
                    <h3>На выполнение диплома ушло 5 недель</h3>
                    <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="lead__content-container lead__content-container_progress-bar">
                <li className="lead__content-item lead__content-item_progress-bar">
                    <span>1 неделя</span>
                    <p>Back-end</p>
                </li>
                <li className="lead__content-item lead__content-item_progress-bar">
                    <h3>На выполнение диплома ушло 5 недель</h3>
                    <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
        </div>
    )
}

export default AboutProject;