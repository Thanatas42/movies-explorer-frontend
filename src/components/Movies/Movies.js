import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


function Movies(props) {

    return (
        <>
            <Header headerContentRight={props.headerContentRight} headerContentLeft={props.headerContentLeft} />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
}

export default Movies;