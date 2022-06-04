import { MoviesApiPath } from '../../../utils/constants';
import { useState } from "react";


function MoviesCard(props) {
    const [isLiked, setIsLiked] = useState(props.isLiked);

    function handleLiked() {
        if (!isLiked) {
            setIsLiked(true);
            props.likedMovies(props.movies);
        } else {
            setIsLiked(false);
            props.deleteMovies(props.movies.id);
        }
    };

    return (
        <>
            <li className="card">
                <a href={props.movies.trailerLink} target="_blank" rel="noreferrer"><img className="card__image" src={MoviesApiPath + props.movies.image.url} alt="Аватар" /></a>
                <div className="card__container">
                    <h3 className="card__title">{props.movies.nameRU}</h3>
                    <button className={isLiked ? "card__like card__like_them_active" : "card__like"} type="checkbox" onClick={handleLiked} />
                </div>
                <p className="card__duration">{props.movies.duration}</p>
            </li>
        </>
    )
}

export default MoviesCard;