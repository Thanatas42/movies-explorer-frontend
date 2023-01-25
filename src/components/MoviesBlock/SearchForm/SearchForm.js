import React from "react";

function SearchForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleChange(e) {
        props.setSearchInput(e.target.value);
    }

    function handleSwitch() {
        props.setIsShortFilms(!props.isShortFilms);
    }


    return (
        <form className="search" onSubmit={handleSubmit} noValidate>
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search" maxLength="40"
                    required value={props.searchInput} onChange={handleChange} />
                <button className="button search__button button" type="submit">Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className={props.isShortFilms ? "switch search__switch switch_theme_active" : "switch search__switch"}
                    type="checkbox" value={props.isShortFilms} onClick={handleSwitch} />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default React.memo(SearchForm)