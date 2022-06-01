import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import { MoviesArrayContex } from '../../context/MoviesArrayContex';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Movies from '../Movies/Movies';
import Error from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import createApi from "../../utils/MoviesApi";
import * as MainApi from '../../utils/MainApi';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [api, setApi] = useState(null);
  const [isNavigationPopupOpen, setNavigationPopupOpen] = useState(false);
  const [MoviesArray, setMoviesArray] = useState([]);
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
    MainApi.getContent(jwt)
      .then((res) => {
        if (res) {
          console.log(res);
          setCurrentUser({
            userName: res.data.name,
            userEmail: res.data.email,
            userId: res.data._id
          });
          setLoggedIn(true);
          if (!api) {
            setApi(createApi);
          }
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

  function handleUpdateUser(userData) {
    /*MainApi.updateUser(userData)
      .then((userData) => {
        setCurrentUser({
          userName: userData.name,
          userEmail: userData.email
        });
        console.log(currentUser)
      })
      .catch((err) => {
        console.log(err);
      });*/
  };


  const onReg = (emailInput, passwordInput, nameInput) => {
    return MainApi.register(emailInput, passwordInput, nameInput).then((res) => {
      if (!res) throw new Error("Что-то пошло не так");
      return res;
    });
  };

  const onLog = (emailInput, passwordInput) => {
    return MainApi.authorize(emailInput, passwordInput).then((res) => {
      if (!res || !res.token)
        throw new Error("Неправильные имя пользователя или пароль");
      if (res.token) {
        setLoggedIn(true);
        setApi(createApi);
        localStorage.setItem("jwt", res.token);
      }
    })
      .catch((err) => {
        console.log(err);
        setResStatus(false);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setApi(null);
    history.push("/signin");
  };

  React.useEffect(() => {
    if (!api) {
      console.log("api is null");
      return;
    }
    console.log("api is not null");

    api.getMoviesCard()
      .then((initialMovies) => {
        setMoviesArray(initialMovies);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [api]);

  return (
    <>
      <MoviesArrayContex.Provider value={MoviesArray}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header LogOn={loggedIn} onOpen={handleNavigationClick} />
          <Switch>
            <Route exact path="/">
              <Main LogOn={loggedIn} />
            </Route>

            <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} />

            <ProtectedRoute path="/profile" userName="Виталий" component={Profile} loggedIn={loggedIn} onSignOut={onSignOut} 
            updateUser={handleUpdateUser} />

            <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} />

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
      </MoviesArrayContex.Provider>
    </>
  );
}

export default App;
