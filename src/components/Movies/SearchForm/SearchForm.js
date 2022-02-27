function SearchForm() {
    return (
        <form className="search">
            <div className="search__field">
                <input className="search__input" placeholder="Фильм" type="search"></input>
                <button className="search__button" type="submit">Поиск</button>
            </div>
            <div className="search__switch-container">
                <input className="search__switch" type="checkbox" />
                <p className="seacrh__annotation">Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm;