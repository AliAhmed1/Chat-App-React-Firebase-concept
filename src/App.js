import React from 'react'
import './App.css';
import Router from './config/router'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

export default App;
