import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import { MoviesArrayContex } from '../../context/MoviesArrayContex';
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [api, setApi] = React.useState(null);
  const [isNavigationPopupOpen, setNavigationPopupOpen] = React.useState(false);
  const [MoviesArray, setMoviesArray] = React.useState([]);
  const [resStatus, setResStatus] = React.useState(false);

  function handleNavigationClick() {
    setNavigationPopupOpen(true);
  };

  function closeAllPopups() {
    setNavigationPopupOpen(false);
  }

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
        setApi(createApi(res.token));
        localStorage.setItem("jwt", res.token);
      }
    })
      .catch((err) => {
        console.log(err);
        setResStatus(false);
      });
  };

  React.useEffect(() => {
    setApi(createApi);
  }, []);

  React.useEffect(() => {
    if (!api) {
      console.log("api is null");
      return;
    } else {
      console.log("api is not null");

      Promise.all([api.getMoviesCard()])
        .then((initialMovies) => {
          setMoviesArray(initialMovies[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [api]);

  return (
    <>
      <MoviesArrayContex.Provider value={MoviesArray}>
        <Header LogOn={loggedIn} onOpen={handleNavigationClick} />
        <Switch>
          <Route exact path="/">
            <Main LogOn={loggedIn} />
          </Route>

          <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} />

          <ProtectedRoute path="/profile" userName="Виталий" component={Profile} loggedIn={loggedIn} />

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
      </MoviesArrayContex.Provider>
    </>
  );
}

export default App;
