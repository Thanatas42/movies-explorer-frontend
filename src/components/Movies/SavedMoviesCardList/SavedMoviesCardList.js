import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';
import { useContext, useState, useEffect } from "react";
import { SavedMoviesArrayContex } from '../../../context/SavedMoviesArrayContex';
import Preloader from '../../Preloader/Preloader';

function SavedMoviesCardList(props) {
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    const [windowWidth, setWindowWidth] = useState(window.screen.availWidth);
    const [moviesToShow, setMoviesToShow] = useState([]);

    let drawingСards;
    let moreCountCards;

    if (windowWidth >= 768) {
        drawingСards = 12;
        moreCountCards = 3;
    } else if (windowWidth <= 768 && windowWidth > 480) {
        drawingСards = 8;
        moreCountCards = 2;
    } else {
        drawingСards = 5;
        moreCountCards = 2;
    }

    (function () {
        window.addEventListener("resize", resizeThrottler, false);

        var resizeTimeout;
        function resizeThrottler() {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    actualResizeHandler();
                }, 66);
            }
        }

        function actualResizeHandler() {
            setWindowWidth(window.screen.availWidth);
        }
    }());

    useEffect(() => {
        if (SavedMoviesArray !== []) {
            setMoviesToShow(SavedMoviesArray.slice(0, drawingСards));
            console.log(SavedMoviesArray);
        }
    }, [SavedMoviesArray, drawingСards]);

    function handleShowMorePosts() {
        const slicedMovies = SavedMoviesArray.slice(moviesToShow.length, moviesToShow.length + moreCountCards);
        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };


    return (
        <>
            <ul className="cards" id="cards">
                {props.resStatus ? <Preloader /> : moviesToShow.map((item) => {
                    return <SavedMoviesCard movies={item} key={item.movieId} likedMovies={props.likedMovies}
                        deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
                })}
            </ul>
            <button className={SavedMoviesArray.length === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default SavedMoviesCardList;