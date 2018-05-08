import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import './navbar.css';
import logo from './imgs/logo.png';

class Navbar extends Component {

  render() {
    return (
      <div>
        <p className='login'><NavLink to={'/login'}>log in</NavLink></p>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Sew Fun</h1>
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'}>home</NavLink>
                </li>
                <li>
                    <NavLink to={'/fabric'}>fabric</NavLink>
                </li>
                <li>
                    <NavLink to={'/hand-crafts'}>hand crafts</NavLink>
                </li>
                {/* <li>
                    <NavLink to={'/classes'}>classes</NavLink>
                </li> */}
            </ul>
        </nav>
    </div>
    );
  }
}

export default Navbar;