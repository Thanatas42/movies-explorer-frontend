import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from '../Movies/SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies(props) {
    return (
        <>
            <SearchForm isShortFilms={props.isShortFilms} setIsShortFilms={props.setIsShortFilms}/>
            <SavedMoviesCardList resStatus={props.resStatus} deleteMovies={props.deleteMovies}/>
        </>
    )
}

export default SavedMovies;