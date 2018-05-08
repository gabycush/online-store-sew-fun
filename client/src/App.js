import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import Fabric from './fabric';
import HandCrafts from './hand-crafts';
import Classes from './classes';
import SignUp from './signup';
import LogIn from './login';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Navbar />
        </header>
        <div className="App-body">
            <Switch>
              <Route path='/fabric' component={Fabric} />
              <Route path='/hand-crafts' component={HandCrafts} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={LogIn} />
              <Route render={() => <Home />} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
