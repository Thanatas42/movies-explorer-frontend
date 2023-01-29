import React, { useState, useEffect } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import resizeEvent from '../../../utils/ResizeEvent';

function MoviesCardList(props) {
    const [moviesToShow, setMoviesToShow] = useState([]);
    let { drawingСards, moreCountCards } = resizeEvent();


    useEffect(() => {
        if (props.moviesArray !== []) {
            let sortResult = props.moviesArray;
            /*if (inSearch) {
                const regex = RegExp(`${inSearchString}`, 'gi');

                sortResult = sortResult.filter((elem) => {
                    return regex.test(elem.nameRU);
                })
            }*/
            /*if (props.isShortFilms)
                sortResult = sortResult.filter(c => c.duration <= DurationShortFilms);*/

            setMoviesToShow(sortResult.slice(0, drawingСards));
        }
    }, [props.moviesArray, drawingСards]);



    function handleShowMorePosts() {
        console.log(moviesToShow);
        const slicedMovies = props.moviesArray.slice(moviesToShow.length, moviesToShow.length + moreCountCards);
        console.log(slicedMovies);
        setMoviesToShow([...moviesToShow, ...slicedMovies]);
    };

    return (
        <>
            <ul className="cards" id="cards">
                {moviesToShow.map((item) => {
                    return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                        deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
                })}
            </ul>
            <button className={props.moviesArray.length === moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;