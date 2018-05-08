import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import HandCraftItems from './handcraftitems';
import './navbar.css';

class HandCrafts extends Component {

  render() {
    return (
        <div>
            <h1> What you need for all Crafting Desires! </h1>
            <HandCraftItems />
        </div>
    );
  }
}

export default HandCrafts;