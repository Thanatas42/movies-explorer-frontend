import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../Preloader/Preloader';

function Movies(props) {

    return (
        <>
            {props.resStatus ? <Preloader /> :
                <MoviesCardList {...props} />
            }
            {!props.resStatus && props.moviesArray.length === 0 ? <p className="cards__empty">Во время запроса произошла ошибка. Возможно, проблема
                с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : <></>}
        </>
    )
}

export default Movies;