import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Error from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import './App.css';



function App() {
  let LogOn = true;
  const [isNavigationPopupOpen, setNavigationPopupOpen] = React.useState(false);

  function handleNavigationClick() {
    setNavigationPopupOpen(true);
  };

  function closeAllPopups() {
    setNavigationPopupOpen(false);
  }


  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main LogOn={LogOn} onOpen={handleNavigationClick} onClose={closeAllPopups} />
        </Route>
        <Route path="/movies">
          <Movies LogOn={LogOn} onOpen={handleNavigationClick} />
        </Route>
        <Route path="/profile">
          <Header LogOn={LogOn} onOpen={handleNavigationClick} />
          <Profile userName="Виталий" />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies LogOn={LogOn} onOpen={handleNavigationClick} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <Error errCode="404" errName="Страница не найдена" />
        </Route>
      </Switch>

      <Navigation isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;
