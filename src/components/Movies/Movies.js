import SearchForm from './SearchForm/SearchForm';
import { useState } from "react";
import MoviesCardList from './MoviesCardList/MoviesCardList';


function Movies(props) {
    const [isShortFilms, setIsShortFilms] = useState(false);

    return (
        <>
            <SearchForm isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms}/>
            <MoviesCardList resStatus={props.resStatus} isShortFilms={isShortFilms} likedMovies={props.likedMovies}/>
        </>
    )
}

export default Movies;