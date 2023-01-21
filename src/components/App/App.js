import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { MoviesArrayContex } from '../../context/MoviesArrayContex';
import { SavedMoviesArrayContex } from '../../context/SavedMoviesArrayContex';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Movies from '../Movies/Movies';
import Error from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import createApi from "../../utils/MainApi";
import * as Auth from '../../utils/Auth';
import * as MoviesApi from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [authStatus, setAuthStatus] = useState();
  const [api, setApi] = useState(null);
  const [isNavigationPopupOpen, setNavigationPopupOpen] = useState(false);
  const [MoviesArray, setMoviesArray] = useState([]);
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);
  const [isShortFilms, setIsShortFilms] = useState(localStorage.getItem('isShortFilms') ? true : false);
  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "", userId: "" });
  const [resStatus, setResStatus] = useState(false);
  const history = useHistory();
  const location = useLocation();

  function handleNavigationClick() {
    setNavigationPopupOpen(true);
  };

  function closeAllPopups() {
    setNavigationPopupOpen(false);
  }

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      auth(localStorage.getItem("jwt"));
    } else
      setLoggedIn(false);
  }, [jwt]);

  function auth(jwt) {
    Auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            userName: res.data.name,
            userEmail: res.data.email,
            userId: res.data._id
          });
          setApi(createApi(jwt));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(name, email) {
    return api.updateUser(name, email);
  };

  function likedMovies({ country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN }) {
    api.createMovies({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail: image.formats.thumbnail,
      movieId: id,
      nameRU,
      nameEN
    })
      .then((res) => {
        MoviesArray.find(c => c.id === id).isLiked = true;
        setSavedMoviesArray([res, ...savedMoviesArray]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onReg = (emailInput, passwordInput, nameInput) => {
    return Auth.register(emailInput, passwordInput, nameInput)
      .then((res) => {
        if (!res) throw new Error("Что-то пошло не так");
        return res;
      });
  };

  const onLog = (emailInput, passwordInput) => {
    return Auth.authorize(emailInput, passwordInput)
      .then((res) => {
        if (!res || !res.token)
          throw new Error("Неправильные имя пользователя или пароль");
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setApi(createApi(res.token));
          setLoggedIn(true);
          history.push("/movies");
          setAuthStatus({ status: true, res: res });
        }
      })
      .catch((err) => {
        console.log(err);
        setAuthStatus({ status: false, err: err });
      });
  };

  const deleteMovies = (movieId) => {
    api.deleteMovies(movieId)
      .then((res) => {
        MoviesArray.find(c => c.id === movieId).isLiked = false;
        setSavedMoviesArray((savedMoviesArray) => savedMoviesArray.filter((c) => c.movieId !== movieId));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem('searchInput');
    localStorage.removeItem('isShortFilms');
    localStorage.clear();
    setLoggedIn(false);
    setApi(null);
    history.push("/");
  };


  useEffect(() => {
    if (!api) {
      console.log("api is null");
      return;
    }
    console.log("api is not null");

    setResStatus(true);
    Promise.all([api.getMovies(), MoviesApi.getMoviesCard()])
      .then(([initialSavedMovies, initialMovies]) => {
        setSavedMoviesArray(initialSavedMovies);
        let resultArray = initialMovies.map((item) => {
          let found = initialSavedMovies.find(c => c.movieId === item.id)
          found ? item.isLiked = true : item.isLiked = false;

          return item;
        });
        setMoviesArray(resultArray);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [api]);


  return (
    <>
      <MoviesArrayContex.Provider value={MoviesArray}>
        <SavedMoviesArrayContex.Provider value={savedMoviesArray}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header LogOn={loggedIn} onOpen={handleNavigationClick} />
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} resStatus={resStatus} setResStatus={setResStatus} likedMovies={likedMovies}
                deleteMovies={deleteMovies} isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} />

              <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} deleteMovies={deleteMovies} resStatus={resStatus}
                isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} setResStatus={setResStatus} savedMoviesArray={savedMoviesArray} />

              <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} onSignOut={onSignOut}
                updateUser={handleUpdateUser} setCurrentUser={setCurrentUser} currentUser={currentUser} />

              <Route path="/signup">
                <Register onReg={onReg} onLog={onLog} />
              </Route>

              <Route path="/signin">
                <Login onLog={onLog} authStatus={authStatus} />
              </Route>

              <Route path="*">
                <Error errCode="404" errName="Страница не найдена" />
              </Route>

              <Route>
                {loggedIn ? (
                  <Redirect to={location.pathname} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
            </Switch>

            <Navigation isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </SavedMoviesArrayContex.Provider>
      </MoviesArrayContex.Provider>
    </>
  );
}

export default App;
