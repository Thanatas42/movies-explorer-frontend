import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Error from '../NotFound/ErrorPage';
import Header from '../Header/Header';
import navIcon from '../../images/navIcon.svg';
import { Link } from 'react-router-dom';
import './App.css';



function App() {
  let headerContentLeft;
  let headerContentRight;
  if (window.screen.width < 1280) {
    headerContentRight = <button className='header__navigation'><img src={navIcon} alt="Кнопка «button»"></img></button>;
  } else {
    headerContentRight =
      <>
        <Link className="link header__account" to="/profile" target="_self">Аккаунт</Link>
      </>;
    headerContentLeft =
      <>
        <Link className="link header__link header__link_log-on" to="/movies" target="_self">Фильмы</Link>
        <Link className="link header__link header__link_log-on" to="/saved-movies" target="_self">Сохранённые фильмы</Link>
      </>;
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies headerContentRight={headerContentRight} headerContentLeft={headerContentLeft} />
        </Route>
        <Route path="/profile">
          <Header headerContentRight={headerContentRight} headerContentLeft={headerContentLeft} />
          <Profile userName="Виталий" />
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
    </>
  );
}

export default App;
