import React from "react";

function SearchForm() {
    const [searchInput, setSearchInput] = React.useState('');

    function handleChangeSearchInput(e) {
        setSearchInput(e.target.value);
    }

    return (
        <form className="search">
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search" maxLength="40" required value={searchInput} onChange={handleChangeSearchInput} />
                <button className={searchInput.length === 0 ? "button search__button search__button_disabled" : "button search__button button"}
                    type="submit" disabled={searchInput.length === 0 ? true : false}>Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className="switch search__switch" type="checkbox" />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm;