import { useEffect, useContext } from "react";
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';
import { SavedMoviesArrayContex } from '../../../context/SavedMoviesArrayContex';
import Preloader from '../../Preloader/Preloader';

function SavedMoviesCardList(props) {
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    let isMount = true;

    function handleShowMorePosts() {
        const slicedMovies = props.SavedMoviesArray.slice(props.moviesToShow.length, props.moviesToShow.length + props.moreCountCards);
        props.setMoviesToShow([...props.moviesToShow, ...slicedMovies]);
    };

    useEffect(() => {
        isMount ? <></> : props.setResStatus(false);
    }, [isMount]);

    if (SavedMoviesArray.length === 0)
        isMount = false;

    function getResultBlock() {
        if (props.moviesToShow.length > 0) {
            let result = props.moviesToShow.map((item) => {
                return <SavedMoviesCard movies={item} key={item.movieId} likedMovies={props.likedMovies}
                    deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
            });
            isMount = false;
            return result;
        }
        else if (!props.resStatus) {
            return <p className='cards__empty'>Ничего не найдено</p>
        }
        else {
            return <Preloader />;
        }
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

export default SavedMoviesCardList;