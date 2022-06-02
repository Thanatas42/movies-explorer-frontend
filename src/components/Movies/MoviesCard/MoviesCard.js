import { useLocation } from 'react-router-dom'
import { MoviesApiPath } from '../../../utils/constants';
import { useState, useEffect } from "react";


function MoviesCard(props) {
    const [themCardButton, setThemCardButton] = useState('');
    let path = useLocation().pathname;


    useEffect(() => {
        if (path === "/saved-movies")
            setThemCardButton("card__delete");
        else if (props.isLike === true)
            setThemCardButton("card__like card__like_them_active");
        else
            setThemCardButton("card__like");
    }, [path]);


    function handleSubmit(e) {
        props.likedMovies
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <>
            <li className="card">
                <a href={props.movies.trailerLink} target="_blank"><img className="card__image" src={MoviesApiPath + props.movies.image.url} alt="Аватар" /></a>
                <div className="card__container">
                    <h3 className="card__title">{props.movies.nameRU}</h3>
                    <button className={themCardButton} type="checkbox" onClick={handleSubmit} />
                </div>
                <p className="card__duration">{props.movies.duration}</p>
            </li>
        </>
    )
}

export default MoviesCard;