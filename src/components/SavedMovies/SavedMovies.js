import React from 'react';
import SavedSearchForm from '../Movies/SavedSearchForm/SavedSearchForm';
import SavedMoviesCardList from '../Movies/SavedMoviesCardList/SavedMoviesCardList';
import { useContext, useState, useEffect } from "react";
import { SavedMoviesArrayContex } from '../../context/SavedMoviesArrayContex';
import resizeEvent from '../../utils/resizeEvent';
import Footer from '../Footer/Footer';
import { DurationShortFilms } from '../../utils/constants';
import Preloader from '../../components/Preloader/Preloader';

function SavedMovies(props) {
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    const [inSearch, setInSearch] = useState(false);
    const [inSearchString, setInSearchString] = useState('');
    const [isShortFilms, setIsShortFilms] = useState(false);
    const [moviesToShow, setMoviesToShow] = useState([]);
    const [moviesInMemory, setMoviesInMemory] = useState([]);
    const [savedNull, setSavedNull] = useState(false);

    let { drawingСards, moreCountCards } = resizeEvent();

    useEffect(() => {
        setSavedNull(false);
        props.setResStatus(true);
        let sortResult = SavedMoviesArray;
        if (inSearch) {
            const regex = RegExp(`${inSearchString}`, 'gi');

            sortResult = sortResult.filter((elem) => {
                return regex.test(elem.nameRU);
            })
        }
        if (isShortFilms)
            sortResult = sortResult.filter(c => c.duration <= DurationShortFilms);

        setMoviesInMemory(sortResult);
        setMoviesToShow(sortResult.slice(0, drawingСards));
        props.setResStatus(false);
        if (sortResult.length === 0) {
            setSavedNull(true);
        }
    }, [props.savedMoviesArray, drawingСards, inSearch, inSearchString, isShortFilms]);

    return (
        <>
            <SavedSearchForm isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} setInSearchString={setInSearchString} setInSearch={setInSearch} />
            {savedNull && !props.resStatus ? <p className="cards__empty">Ничего не найдено</p> : <></>}
            {props.resStatus ? <Preloader /> :
                <SavedMoviesCardList resStatus={props.resStatus} deleteMovies={props.deleteMovies} moreCountCards={moreCountCards}
                    moviesToShow={moviesToShow} moviesInMemory={moviesInMemory} setMoviesToShow={setMoviesToShow}
                    savedMoviesArray={props.savedMoviesArray} setResStatus={props.setResStatus} savedNull={savedNull} />
            }
            <Footer />
        </>
    )
}

export default SavedMovies;