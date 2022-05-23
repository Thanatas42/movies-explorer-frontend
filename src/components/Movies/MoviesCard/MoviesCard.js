import { useLocation } from 'react-router-dom'
import image from '../../../images/card1.svg';

function MoviesCard(props) {
    return (
        <>
            <li className="card">
                <img className="card__image" src={image} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">Киноальманах «100 лет дизайна»</h3>
                    <button className={useLocation().pathname === "/saved-movies" ? "card__delete" : "card__like"} type="checkbox" />
                </div>
                <p className="card__duration"></p>
            </li>
        </>
    )
}

export default MoviesCard;