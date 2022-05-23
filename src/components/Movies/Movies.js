import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';


function Movies(props) {

    return (
        <>
            <SearchForm />
            <MoviesCardList />
            <button className='button button_theme-still'>Еще</button>
        </>
    )
}

export default Movies;