import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    function handleShowMorePosts() {
        const slicedMovies = props.moviesInMemory.slice(props.moviesToShow.length, props.moviesToShow.length + props.moreCountCards);
        props.setMoviesToShow([...props.moviesToShow, ...slicedMovies]);
    };

    return (
        <>
            <ul className="cards" id="cards">
                {props.moviesToShow.map((item) => {
                    return <MoviesCard movies={item} key={item.id} likedMovies={props.likedMovies}
                        deleteMovies={props.deleteMovies} isLiked={item.isLiked} />
                })}
            </ul>
            <button className={props.moviesInMemory.length === props.moviesToShow.length ? 'button button_theme-still button__theme-hidden'
                : 'button button_theme-still'} onClick={handleShowMorePosts}>Еще</button>
        </>
    )
}

export default MoviesCardList;