import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';
import { useContext, useState, useEffect } from "react";
import { MoviesArrayContex } from '../../../context/MoviesArrayContex';
import { SavedMoviesArrayContex } from '../../../context/SavedMoviesArrayContex';
import Preloader from '../../Preloader/Preloader';

function SavedMoviesCardList(props) {
    const MoviesArray = useContext(MoviesArrayContex);
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    const [windowWidth, setWindowWidth] = useState(window.screen.availWidth);
    const [moviesToShow, setMoviesToShow] = useState([]);

    let shortMovies = MoviesArray.filter((item) => { return item.duration <= 40 });
    let moreLength = props.isShortFilms ? shortMovies.length : MoviesArray.length;
    let drawingСards;
    let moreIteration;

    if (windowWidth >= 768) {
        drawingСards = 12;
        moreIteration = 7;
    } else if (windowWidth <= 768 && windowWidth > 480) {
        drawingСards = 8;
        moreIteration = 7;
    } else {
        drawingСards = 5;
        moreIteration = 5;
    }

    useEffect(() => {
        if (MoviesArray !== []) {
            if (!props.isShortFilms)
                setMoviesToShow(MoviesArray.slice(0, drawingСards));
            else if (props.isShortFilms)
                setMoviesToShow(shortMovies.slice(0, drawingСards));
        }
    }, [MoviesArray, SavedMoviesArray, drawingСards, props.isShortFilms]);

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

    function handleShowMorePosts() {
        const slicedMovies = MoviesArray.slice(moviesToShow.length, moviesToShow.length + moreIteration);
        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };

    function handleShowMorePostsShortMovies() {
        const slicedMovies = MoviesArray.filter(shortMovies.slice(moviesToShow.length, moviesToShow.length + moreIteration));

        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };

    return (
        <>
            <ul className="cards" id="cards">
                {props.resStatus ? <Preloader /> : SavedMoviesArray.map((item) => {
                    return <SavedMoviesCard movies={item} key={item.movieId} likedMovies={props.likedMovies} deleteMovies={props.deleteMovies} />
                })
                }
                <h4 className="cards__empty">Ничего не найдено</h4>
            </ul>
            <button className={moreLength === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={props.isShortFilms ? handleShowMorePostsShortMovies : handleShowMorePosts}>Еще</button>
        </>
    )
}

export default SavedMoviesCardList;