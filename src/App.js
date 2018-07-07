import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './components/Board/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <img className="Hello-img" src={'https://render.bitstrips.com/v2/cpanel/ffe718ca-8461-4ccc-a192-ffc300e5c946-5882e07a-77f2-42ca-82b4-c6df167a1cb1-v1.png?transparent=1&palette=1'}/>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Mural</h1>
        </header>
        <div className="Board-container">
            <Board></Board>
        </div>
      </div>
    );
  }
}

export default App;