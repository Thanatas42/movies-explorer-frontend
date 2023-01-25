import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';
import Movies from "../Movies/Movies";

const MoviesBlock = ({ component: Component, ...props }) => {
    const location = useLocation();
    const [searchInput, setSearchInput] = useState('');
    const [isShortFilms, setIsShortFilms] = useState(false);


    return (
        <>
            <SearchForm isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} searchInput={searchInput} setSearchInput={setSearchInput} />
            {
                location.pathname === '/movies' ? <Movies /> : <></>

            }
            <Footer />
        </>
    );
};

export default MoviesBlock; 