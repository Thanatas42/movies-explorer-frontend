import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Movies />
      <Footer />
    </div>
  );
}

export default App;
