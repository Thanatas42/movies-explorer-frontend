import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {

    function handleShowMorePosts() {
        const slicedMovies = props.moviesInMemory.slice(props.moviesToShow.length, props.moviesToShow.length + props.moreCountCards);
        props.setMoviesToShow([...props.moviesToShow, ...slicedMovies]);
    };

    function getResultBlock() {
        if (!props.resStatus && props.moviesInMemory.length > 0)
            return props.moviesToShow.map((item) => {
                return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                    deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
            })
        else if (props.resStatus)
            return <Preloader />
        else if (props.moviesInMemory.length === 0)
            return <p className='cards__empty'>Ничего не найдено</p>
    }
    
    return (
        <>
            <ul className="cards" id="cards">
                {getResultBlock()}
            </ul>
            <button className={props.moviesInMemory.length === props.moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;