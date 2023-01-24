import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { useContext, useState, useEffect } from "react";
import { MoviesArrayContex } from '../../context/MoviesArrayContex';
import resizeEvent from '../../utils/ResizeEvent';
import Footer from '../Footer/Footer';
import { DurationShortFilms } from '../../utils/constants';
import Preloader from '../../components/Preloader/Preloader';

function Movies(props) {
    const MoviesArray = useContext(MoviesArrayContex);
    const [inSearch, setInSearch] = useState(localStorage.getItem('searchInput') ? true : false);
    const [inSearchString, setInSearchString] = useState(localStorage.getItem('searchInput') ? localStorage.getItem('searchInput') : '');
    const [moviesInMemory, setMoviesInMemory] = useState([]);
    const [moviesToShow, setMoviesToShow] = useState([]);

    let { drawingСards, moreCountCards } = resizeEvent();

    useEffect(() => {
        if (MoviesArray !== []) {
            props.setResStatus(true);
            let sortResult = MoviesArray;
            if (inSearch) {
                const regex = RegExp(`${inSearchString}`, 'gi');

                sortResult = sortResult.filter((elem) => {
                    return regex.test(elem.nameRU);
                })
            }
            if (props.isShortFilms)
                sortResult = sortResult.filter(c => c.duration <= DurationShortFilms);

            setMoviesInMemory(sortResult);
            setMoviesToShow(sortResult.slice(0, drawingСards));
            props.setResStatus(false);
        }
    }, [MoviesArray, drawingСards, inSearch, inSearchString, props.isShortFilms]);

    return (
        <>
            <SearchForm isShortFilms={props.isShortFilms} setIsShortFilms={props.setIsShortFilms} setInSearchString={setInSearchString} setInSearch={setInSearch} />
            {props.resStatus ? <Preloader /> :
                <MoviesCardList resStatus={props.resStatus} likedMovies={props.likedMovies} deleteMovies={props.deleteMovies}
                    moreCountCards={moreCountCards} moviesInMemory={moviesInMemory} moviesToShow={moviesToShow} setMoviesToShow={setMoviesToShow} setResStatus={props.setResStatus} />
            }
            <Footer />
        </>
    )
}

export default Movies;