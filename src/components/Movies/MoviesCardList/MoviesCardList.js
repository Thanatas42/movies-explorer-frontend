import MoviesCard from '../MoviesCard/MoviesCard';
import { useContext } from "react";
import { MoviesArrayContex } from '../../../context/MoviesArrayContex';

function MoviesCardList() {
    const MoviesArray = useContext(MoviesArrayContex);


    return (
        <ul className="cards">
            {MoviesArray.map((item) => {
                return <MoviesCard movies={item} key={item.id} />
            })}
        </ul>
    )
}

export default MoviesCardList;