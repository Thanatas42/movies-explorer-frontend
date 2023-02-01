
function SavedMoviesCard(props) {

    return (
        <>
            <li className="card">
                <a href={props.movies.trailer} target="_blank" rel="noreferrer"><img className="card__image" src={props.movies.image} alt="Аватар" /></a>
                <div className="card__container">
                    <h3 className="card__title">{props.movies.nameRU}</h3>
                    <button className="card__delete" type="checkbox" onClick={() => { props.deleteMovies(props.movies.movieId) }} />
                </div>
                <p className="card__duration">{props.movies.duration}</p>
            </li>
        </>
    )
}

export default SavedMoviesCard;