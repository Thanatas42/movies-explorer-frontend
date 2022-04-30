function SearchForm() {
    return (
        <form className="search">
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search"></input>
                <button className="link-button search__button" type="submit">Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className="switch search__switch" type="checkbox" />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm;