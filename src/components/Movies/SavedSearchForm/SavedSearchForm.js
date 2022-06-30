import React from "react";

function SavedSearchForm(props) {
    const [searchInput, setSearchInput] = React.useState('');

    function handleChangeSearchInput(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(searchInput);
        if (searchInput === '') {
            props.setInSearch(false);
        } else {
            props.setInSearch(true);
            props.setInSearchString(searchInput);
        }
    }

    function handleSwitch() {
        if (props.isShortFilms) {
            props.setIsShortFilms(false);
            localStorage.removeItem('isShortFilms');
        } else {
            props.setIsShortFilms(true);
            localStorage.setItem('isShortFilms', true);
        }
    }

    return (
        <form className="search" onSubmit={handleSubmit} noValidate>
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search" maxLength="40" required value={searchInput} onChange={handleChangeSearchInput} />
                <button className="button search__button button" type="submit">Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className={props.isShortFilms ? "switch search__switch switch_theme_active" : "switch search__switch"} type="checkbox" value={props.isShortFilms}
                    onClick={handleSwitch} />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default React.memo(SavedSearchForm)