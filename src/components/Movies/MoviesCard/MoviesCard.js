import image from '../../../images/card1.svg';
import image1 from '../../../images/pic__COLOR_pic.png';
import image2 from '../../../images/pic__COLOR_pic.jpg';
import image3 from '../../../images/pic__CO1LOR_pic.png';

function MoviesCard() {
    return (
        <div className="calc">
            <div className="card">
                <img className="card__image" src={image} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">Киноальманах «100 лет дизайна»</h3>
                    <input className="card__like" type="checkbox" />
                </div>
                <p className="card__duration">1ч 47м</p>
            </div>
            <div className="card">
                <img className="card__image" src={image1} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">Киноальманах «100 лет дизайна»</h3>
                    <input className="card__like" type="checkbox" />
                </div>
                <p className="card__duration">1ч 47м</p>
            </div>
            <div className="card">
                <img className="card__image" src={image2} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">В погоне за Бенкси</h3>
                    <input className="card__like" type="checkbox" />
                </div>
                <p className="card__duration">1ч 47м</p>
            </div>
            <div className="card">
                <img className="card__image" src={image3} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">Баския: Взрыв реальности</h3>
                    <input className="card__like" type="checkbox" />
                </div>
                <p className="card__duration">1ч 47м</p>
            </div>
            <div className="card">
                <img className="card__image" src={image3} alt="Аватар" />
                <div className="card__container">
                    <h3 className="card__title">Баския: Взрыв реальности</h3>
                    <input className="card__like" type="checkbox" />
                </div>
                <p className="card__duration">1ч 47м</p>
            </div>
        </div>
    )
}

export default MoviesCard;