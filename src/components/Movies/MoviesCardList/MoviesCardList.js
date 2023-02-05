import React, { useState, useEffect } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import resizeEvent from '../../../utils/ResizeEvent';
import { DurationShortFilms } from '../../../utils/constants';
import SavedMoviesCard from "../MoviesCard/SavedMoviesCard";

function MoviesCardList(props) {
    const [moviesToMemory, setMoviesToMemory] = useState([]);
    const [moviesToShow, setMoviesToShow] = useState([]);
    let { drawingСards, moreCountCards } = resizeEvent();


    useEffect(() => {
        if (props.moviesArray !== []) {
            let sortResult = props.moviesArray;
            if (props.isShortFilms) {
                const regex = RegExp(`${props.searchInput}`, 'gi');

                sortResult = sortResult.filter((elem) => {
                    return regex.test(elem.nameRU);
                })
            }
            if (props.isShortFilms)
                sortResult = sortResult.filter(c => c.duration <= DurationShortFilms);
            setMoviesToMemory(sortResult);
            setMoviesToShow(sortResult.slice(0, drawingСards));
        }
    }, [props.moviesArray, drawingСards, props.isShortFilms, props.searchInput]);



    function handleShowMorePosts() {
        const slicedMovies = moviesToMemory.slice(moviesToShow.length, moviesToShow.length + moreCountCards);
        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };


    return (
        <>
            <ul className="cards" id="cards">
                {props.path === '/movies' ? moviesToShow.map((item) => {
                    return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                        deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
                }) : <></>}

                {props.path === '/saved-movies' ? moviesToShow.map((item) => {
                    return <SavedMoviesCard movies={item} key={item.movieId} deleteMovies={props.deleteMovies} />
                }) : <></>}
            </ul>
            <button className={moviesToMemory.length === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;