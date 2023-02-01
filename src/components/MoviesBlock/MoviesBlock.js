import React, { useState, useEffect, useContext } from "react";
import * as MoviesApi from '../../utils/MoviesApi'
import { ApiContex } from '../../context/ApiContex';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Movies from "./Movies/Movies";

const MoviesBlock = ({ component: Component, ...props }) => {
    const Api = useContext(ApiContex);
    const [searchInput, setSearchInput] = useState('');
    const [isShortFilms, setIsShortFilms] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const [MoviesArray, setMoviesArray] = useState([]);
    const [savedMoviesArray, setSavedMoviesArray] = useState([]);
    const [requestStatus, setRequestStatus] = useState(false);

    useEffect(() => {
        if (!Api) {
            console.log("api is null");
            return;
        }
        console.log("api is not null");

        setRequestStatus(true);
        Promise.all([Api.getMovies(), MoviesApi.getMoviesCard()])
            .then(([initialSavedMovies, initialMovies]) => {
                setSavedMoviesArray(initialSavedMovies);

                let resulArray = initialMovies.map(obj => ({ ...obj, isLiked: false }));
                initialSavedMovies.forEach((i) => {
                    let found = resulArray.find(c => c.id === i.movieId);
                    found ? found.isLiked = true : found.isLiked = false;
                });
                setMoviesArray(resulArray);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setRequestStatus(false);
            })
    }, [Api]);

    function likedMovies({ country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        id,
        nameRU,
        nameEN }) {
        Api.createMovies({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail: image.formats.thumbnail,
            movieId: id,
            nameRU,
            nameEN
        })
            .then((res) => {
                MoviesArray.find(c => c.id === id).isLiked = true;
                setSavedMoviesArray([res, ...savedMoviesArray]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteMovies = (movieId) => {
        Api.deleteMovies(movieId)
            .then((res) => {
                MoviesArray.find(c => c.id === movieId).isLiked = false;
                setSavedMoviesArray((savedMoviesArray) => savedMoviesArray.filter((c) => c.movieId !== movieId));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <SearchForm isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} searchInput={searchInput} setSearchInput={setSearchInput} setIsSearch={setIsSearch} />
            {props.path === '/movies' ? <Movies {...props} moviesArray={MoviesArray} resStatus={requestStatus} likedMovies={likedMovies} deleteMovies={deleteMovies}
                isShortFilms={isShortFilms} searchInput={searchInput} isSearch={isSearch} /> : <></>}
            {props.path === '/saved-movies' ? <Movies {...props} moviesArray={savedMoviesArray} resStatus={requestStatus} likedMovies={likedMovies} deleteMovies={deleteMovies}
                isShortFilms={isShortFilms} searchInput={searchInput} isSearch={isSearch} /> : <></>}
            <Footer />
        </>
    );
};

export default MoviesBlock; 