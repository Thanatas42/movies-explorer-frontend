import React from "react";

function SearchForm(props) {
    const [searchInput, setSearchInput] = React.useState('');

    function handleChangeSearchInput(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleSubmitSearch(searchInput);
    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search" maxLength="40" required value={searchInput} onChange={handleChangeSearchInput} />
                <button className={searchInput.length === 0 ? "button search__button search__button_disabled" : "button search__button button"}
                    type="submit" disabled={searchInput.length === 0 ? true : false}>Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className={props.isShortFilms ? "switch search__switch switch_theme_active" : "switch search__switch"} type="checkbox" value={props.isShortFilms}
                    onClick={() => { props.setIsShortFilms(props.isShortFilms ? false : true) }} />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default React.memo(SearchForm)