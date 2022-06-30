const HeaderPathLists = ["/", "/movies", "/saved-movies", "/profile"];
const MoviesApiPath = "https://api.nomoreparties.co";
const RegexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DurationShortFilms = 40;

const СardScreenParams = {
    cardsOnScreenSize1280: 12,
    cardsAddScreenSize1280: 3,
    cardsOnScreenSize768: 8,
    cardsAddScreenSize768: 2,
    cardsOnScreenSize480: 5
}


export {
    HeaderPathLists,
    MoviesApiPath,
    СardScreenParams,
    RegexEmail,
    DurationShortFilms
};
