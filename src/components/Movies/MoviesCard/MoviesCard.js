import image from '../../../images/card1.svg';

function MoviesCard() {
    return (
        <div className="card">
            <img className="card__image" src={image} alt="Аватар"/>
            <div>
                <h3>33 слова о дизайне</h3>
                <p></p>
            </div>
        </div>
    )
}

export default MoviesCard;