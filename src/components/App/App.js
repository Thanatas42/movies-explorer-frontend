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
import createApi from "../../utils/MoviesApi"
import './App.css';



function App() {
  let LogOn = true;
  const [api, setApi] = React.useState(null);
  const [isNavigationPopupOpen, setNavigationPopupOpen] = React.useState(false);
  const [MoviesArray, setMoviesArray] = React.useState([]);

  function handleNavigationClick() {
    setNavigationPopupOpen(true);
  };

  function closeAllPopups() {
    setNavigationPopupOpen(false);
  }

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
        <Header LogOn={LogOn} onOpen={handleNavigationClick} />
        <Switch>
          <Route exact path="/">
            <Main LogOn={LogOn} />
          </Route>

          <ProtectedRoute path="/movies" component={Movies} loggedIn={LogOn} />

          <ProtectedRoute path="/profile" userName="Виталий" component={Profile} loggedIn={LogOn} />

          <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={LogOn} />

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>
          <Route>
            {LogOn ? (
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
