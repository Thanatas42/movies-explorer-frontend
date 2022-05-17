import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function SavedMovies(props) {
    return (
        <>
            <Header headerContentRight={props.headerContentRight} headerContentLeft={props.headerContentLeft} />
            <SearchForm />
            <MoviesCardList />
            <button className='button button_theme-still'>Еще</button>
            <Footer />
        </>
    )
}

export default SavedMovies;