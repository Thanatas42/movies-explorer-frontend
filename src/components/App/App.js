import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
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
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [api, setApi] = useState(null);
  const [isNavigationPopupOpen, setNavigationPopupOpen] = useState(false);
  const [MoviesArray, setMoviesArray] = useState([]);
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);
  const [shortFilmsArray, setShortFilmsArray] = useState([]);
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "", userId: "" });
  const [resStatus, setResStatus] = useState(false);
  const history = useHistory();

  function handleNavigationClick() {
    setNavigationPopupOpen(true);
  };

  function closeAllPopups() {
    setNavigationPopupOpen(false);
  }

  const auth = (jwt) => {
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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) history.push("/movies");
  }, [loggedIn, history]);

  function handleUpdateUser(name, email) {
    api.updateUser(name, email)
      .then(() => {
        setCurrentUser({
          userName: name,
          userEmail: email,
          userId: currentUser._id
        });
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
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
    return Auth.register(emailInput, passwordInput, nameInput).then((res) => {
      if (!res) throw new Error("Что-то пошло не так");
      return res;
    });
  };

  const onLog = (emailInput, passwordInput) => {
    return Auth.authorize(emailInput, passwordInput).then((res) => {
      if (!res || !res.token)
        throw new Error("Неправильные имя пользователя или пароль");
      if (res.token) {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        setApi(createApi(res.token));
      }
    })
      .catch((err) => {
        console.log(err);
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
    setLoggedIn(false);
    setApi(null);
    history.push("/signin");
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
      .finally(setResStatus(false));
  }, [api]);

  return (
    <>
      <MoviesArrayContex.Provider value={MoviesArray}>
        <SavedMoviesArrayContex.Provider value={savedMoviesArray}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header LogOn={loggedIn} onOpen={handleNavigationClick} />
            <Switch>
              <Route exact path="/">
                <Main LogOn={loggedIn} />
              </Route>

              <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} resStatus={resStatus} likedMovies={likedMovies} deleteMovies={deleteMovies}
                isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} shortFilmsArray={shortFilmsArray} setShortFilmsArray={setShortFilmsArray} />

              <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} onSignOut={onSignOut}
                updateUser={handleUpdateUser} />

              <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} deleteMovies={deleteMovies} resStatus={resStatus}
                isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} />

              <Route path="/signup">
                <Register onReg={onReg} onLog={onLog} />
              </Route>

              <Route path="/signin">
                <Login onLog={onLog} />
              </Route>
              <Route>
                {loggedIn ? (
                  <Redirect to="/movies" />
                ) : (
                  <Redirect to="/signin" />
                )}
              </Route>
              <Route path="*">
                <Error errCode="404" errName="Страница не найдена" />
              </Route>
            </Switch>

            <Footer />

            <Navigation isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </SavedMoviesArrayContex.Provider>
      </MoviesArrayContex.Provider>
    </>
  );
}

export default App;
