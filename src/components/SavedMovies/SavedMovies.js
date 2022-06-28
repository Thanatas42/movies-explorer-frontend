import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from '../Movies/SavedMoviesCardList/SavedMoviesCardList';
import { useContext, useState, useEffect } from "react";
import { SavedMoviesArrayContex } from '../../context/SavedMoviesArrayContex';
import resizeEvent from '../../utils/resizeEvent';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
    const SavedMoviesArray = useContext(SavedMoviesArrayContex);
    const [moviesToShow, setMoviesToShow] = useState([]);
    const [moviesInMemory, setMoviesInMemory] = useState([]);

    let { drawingСards, moreCountCards } = resizeEvent();

    useEffect(() => {
        if (SavedMoviesArray !== []) {
            setMoviesInMemory(SavedMoviesArray);
            setMoviesToShow(SavedMoviesArray.slice(0, drawingСards));
        }
        if (props.isShortFilms) {
            setMoviesInMemory(SavedMoviesArray.filter(c => c.duration <= 40));
            setMoviesToShow(SavedMoviesArray.filter(c => c.duration <= 40).slice(0, drawingСards));
        }
    }, [SavedMoviesArray, drawingСards, props.isShortFilms]);

    function handleSubmitSearch(sortString) {
        const regex = new RegExp(`${sortString}`, 'gi');
        console.log(regex);
        setMoviesInMemory(SavedMoviesArray.filter((elem, index) => {
            return regex.test(elem.nameRU);
        }));
        setMoviesToShow(SavedMoviesArray.filter((elem, index) => {
            return regex.test(elem.nameRU);
        }).slice(0, drawingСards));
        if (props.isShortFilms) {
            setMoviesInMemory(SavedMoviesArray.filter((elem, index) => {
                return regex.test(elem.nameRU) && elem.duration <= 40;
            }));
            setMoviesToShow(SavedMoviesArray.filter((elem, index) => {
                return regex.test(elem.nameRU) && elem.duration <= 40;
            }).slice(0, drawingСards));
        }
    }



    return (
        <>
            <SearchForm isShortFilms={props.isShortFilms} setIsShortFilms={props.setIsShortFilms} handleSubmitSearch={handleSubmitSearch} />
            <SavedMoviesCardList resStatus={props.resStatus} deleteMovies={props.deleteMovies} isShortFilms={props.isShortFilms}
                moreCountCards={moreCountCards} moviesToShow={moviesToShow} moviesInMemory={moviesInMemory} setMoviesToShow={setMoviesToShow}
                SavedMoviesArray={SavedMoviesArray} setResStatus={props.setResStatus} />
            <Footer />
        </>
    )
}

export default SavedMovies;