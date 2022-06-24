import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { useContext, useState, useEffect } from "react";
import { MoviesArrayContex } from '../../context/MoviesArrayContex';
import resizeEvent from '../../utils/ResizeEvent';

function Movies(props) {
    const MoviesArray = useContext(MoviesArrayContex);
    const [moviesInMemory, setMoviesInMemory] = useState([]);
    const [moviesToShow, setMoviesToShow] = useState([]);

    let { drawingСards, moreCountCards } = resizeEvent();

    useEffect(() => {
        if (MoviesArray !== []) {
            setMoviesInMemory(MoviesArray);
            setMoviesToShow(MoviesArray.slice(0, drawingСards));
        }
        if (props.isShortFilms) {
            setMoviesInMemory(MoviesArray.filter(c => c.duration <= 40));
            setMoviesToShow(MoviesArray.filter(c => c.duration <= 40).slice(0, drawingСards));
        }
    }, [MoviesArray, drawingСards, props.isShortFilms]);

    function handleSubmitSearch(sortString) {
        const regex = RegExp(sortString);

        setMoviesInMemory(MoviesArray.filter((elem, index) => {
            return regex.test(elem.nameRU);
        }));
        setMoviesToShow(MoviesArray.filter((elem, index) => {
            return regex.test(elem.nameRU);
        }).slice(0, drawingСards));
        if (props.isShortFilms) {
            setMoviesInMemory(MoviesArray.filter((elem, index) => {
                return regex.test(elem.nameRU) && elem.duration <= 40;
            }));
            setMoviesToShow(MoviesArray.filter((elem, index) => {
                return regex.test(elem.nameRU) && elem.duration <= 40;
            }).slice(0, drawingСards));
        }
    }

    return (
        <>
            <SearchForm isShortFilms={props.isShortFilms} setIsShortFilms={props.setIsShortFilms} handleSubmitSearch={handleSubmitSearch} />
            <MoviesCardList resStatus={props.resStatus} likedMovies={props.likedMovies}
                deleteMovies={props.deleteMovies} isShortFilms={props.isShortFilms} drawingСards={drawingСards}
                moreCountCards={moreCountCards} moviesInMemory={moviesInMemory} moviesToShow={moviesToShow} setMoviesToShow={setMoviesToShow}
            />
        </>
    )
}

export default Movies;