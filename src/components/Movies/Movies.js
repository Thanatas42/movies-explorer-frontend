import React from 'react';
import { useContext, useState, useEffect } from "react";
import * as MoviesApi from '../../utils/MoviesApi'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import resizeEvent from '../../utils/ResizeEvent';
import { DurationShortFilms } from '../../utils/constants';
import Preloader from '../../components/Preloader/Preloader';

function Movies(props) {
    const [inSearch, setInSearch] = useState(localStorage.getItem('searchInput') ? true : false);
    const [inSearchString, setInSearchString] = useState(localStorage.getItem('searchInput') ? localStorage.getItem('searchInput') : '');

    return (
        <>
            {props.resStatus ? <Preloader /> :
                <MoviesCardList moviesArray={props.moviesArray} deleteMovies={props.deleteMovies} likedMovies={props.likedMovies} />
            }
            {!props.resStatus && props.moviesArray.length === 0 ? <p className="cards__empty">Во время запроса произошла ошибка. Возможно, проблема
                с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : <></>}
        </>
    )
}

export default Movies;