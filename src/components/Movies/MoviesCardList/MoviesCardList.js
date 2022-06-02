import MoviesCard from '../MoviesCard/MoviesCard';
import { useContext, useState, useEffect } from "react";
import { MoviesArrayContex } from '../../../context/MoviesArrayContex';
import { SavedMoviesArrayContex } from '../../../context/SavedMoviesArrayContex';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {
    const MoviesArray = useContext(MoviesArrayContex);
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    const [windowWidth, setWindowWidth] = useState(window.screen.availWidth);
    const [moviesToShow, setMoviesToShow] = useState([]);

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
            setMoviesToShow(MoviesArray.slice(0, drawingСards));
        }


    }, [MoviesArray, drawingСards]);

    useEffect(() => {
        if (MoviesArray !== [] && props.isShortFilms) {
            setMoviesToShow(MoviesArray.filter((item) => { return item.duration <= 40 }));
        }
        else if (MoviesArray !== []) {
            setMoviesToShow(MoviesArray.slice(0, drawingСards));
        }
    }, [props.isShortFilms]);

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

    return (
        <>
            <ul className="cards" id="cards">
                {props.resStatus ? <Preloader /> : moviesToShow.map((item) => {
                    return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                        isLiked={(SavedMoviesArray.map((i) => { return (i.movieId === item.id) }).includes(true))} />
                })}
            </ul>
            <button className={MoviesArray.length === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;