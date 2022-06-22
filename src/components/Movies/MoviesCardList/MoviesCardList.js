import MoviesCard from '../MoviesCard/MoviesCard';
import { useContext, useState, useEffect } from "react";
import { MoviesArrayContex } from '../../../context/MoviesArrayContex';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {
    const MoviesArray = useContext(MoviesArrayContex);
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
        if (MoviesArray !== []) {
            setMoviesToShow(MoviesArray.slice(0, drawingСards));
        }
    }, [MoviesArray, drawingСards]);

    function handleShowMorePosts() {
        const slicedMovies = MoviesArray.slice(moviesToShow.length, moviesToShow.length + moreCountCards);
        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };

    return (
        <>
            <ul className="cards" id="cards">
                {props.resStatus ? <Preloader /> : moviesToShow.map((item) => {
                    return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                        deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
                })}
            </ul>
            <button className={MoviesArray.length === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;