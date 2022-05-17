import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <div className="cards">
            <MoviesCard path={window.location.href}/>
        </div>
    )
}

export default MoviesCardList;