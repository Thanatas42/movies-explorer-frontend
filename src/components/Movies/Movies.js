import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';


function Movies(props) {

    return (
        <>
            <SearchForm isShortFilms={props.isShortFilms} setIsShortFilms={props.setIsShortFilms} />
            <MoviesCardList resStatus={props.resStatus} likedMovies={props.likedMovies} deleteMovies={props.deleteMovies}
                isShortFilms={props.isShortFilms} />
        </>
    )
}

export default Movies;