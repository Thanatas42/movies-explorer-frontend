import { useLocation } from 'react-router-dom'

function MoviesCard(props) {
    return (
        <>
            <li className="card">

                <a href={props.movies.trailerLink} target="_blank"><img className="card__image" src={"https://api.nomoreparties.co/" + props.movies.image.url} alt="Аватар" /></a>
                <div className="card__container">
                    <h3 className="card__title">{props.movies.nameRU}</h3>
                    <button className={useLocation().pathname === "/saved-movies" ? "card__delete" : "card__like"} type="checkbox" />
                </div>
                <p className="card__duration">{props.movies.duration}</p>
            </li>
        </>
    )
}

export default MoviesCard;