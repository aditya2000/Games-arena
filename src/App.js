import React, { Component } from 'react';

import AppBar from './components/appBar/appBar';
import GameResults from './components/body/gameResults';
import Favicon from 'react-favicon';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Favicon url="https://image.flaticon.com/icons/svg/214/214304.svg"/>
       <AppBar/>
       <GameResults />      
      </div>
    );
  }
}

export default App;
