import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {
    let isMount = props.resStatus;

    function handleShowMorePosts() {
        const slicedMovies = props.moviesInMemory.slice(props.moviesToShow.length, props.moviesToShow.length + props.moreCountCards);
        props.setMoviesToShow([...props.moviesToShow, ...slicedMovies]);
    };

    function getResultBlock() {
        if (props.moviesToShow.length > 0) {
            let result = props.moviesToShow.map((item) => {
                return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                    deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
            });
            isMount = false;
            return result;
        }
        else if (props.moviesToShow.length === 0 && !isMount)
            return <p className='cards__empty'>Ничего не найдено</p>
        /*else if (isMount) {
            isMount = false;
            return <Preloader />
        }*/
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