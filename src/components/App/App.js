import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { ApiContex } from '../../context/ApiContex';
import { SavedMoviesArrayContex } from '../../context/SavedMoviesArrayContex';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Movies from '../Movies/Movies';
import Error from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MoviesBlock from "../MoviesBlock/MoviesBlock";
import createApi from "../../utils/MainApi";
import * as Auth from '../../utils/Auth';
import * as MoviesApi from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
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
      setLoggedIn(true);
      auth(localStorage.getItem("jwt"));
    } else
      setLoggedIn(false);
  }, [jwt]);

  function auth(jwt) {
    Auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setApi(createApi(jwt));
          setCurrentUser({
            userName: res.data.name,
            userEmail: res.data.email,
            userId: res.data._id
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    return api.updateUser(name, email);
  };

  const onReg = (emailInput, passwordInput, nameInput) => {
    return Auth.register(emailInput, passwordInput, nameInput)
      .then((res) => { return res; });
  };

  const onLog = (emailInput, passwordInput) => {
    return Auth.authorize(emailInput, passwordInput)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setApi(createApi(res.token));
          setLoggedIn(true);
          history.push("/movies");
        }
      })
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


  return (
    <>
      <ApiContex.Provider value={api}>
        <SavedMoviesArrayContex.Provider value={savedMoviesArray}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header LogOn={loggedIn} onOpen={handleNavigationClick} />
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <ProtectedRoute path={"/movies"} component={MoviesBlock} loggedIn={loggedIn} />

              <ProtectedRoute path="/saved-movies" component={MoviesBlock} loggedIn={loggedIn} resStatus={resStatus}
                isShortFilms={isShortFilms} setIsShortFilms={setIsShortFilms} setResStatus={setResStatus} savedMoviesArray={savedMoviesArray} />

              <ProtectedRoute path="/profile" component={Profile} onSignOut={onSignOut}
                handleUpdateUser={handleUpdateUser} setCurrentUser={setCurrentUser} loggedIn={loggedIn} />

              <Route path="/signup">
                <Register onReg={onReg} onLog={onLog} />
              </Route>

              <Route path="/signin">
                <Login onLog={onLog} />
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
      </ApiContex.Provider>
    </>
  );
}

export default App;
