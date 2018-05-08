import React, { Component } from 'react';
import FabricItems from './fabricitems';
import './fabric.css';

class Fabric extends Component {

  render() {
    return (
        <div>
            <h1> Enjoy Our Selection of Fabrics! </h1>
            <FabricItems />
        </div>
    );
  }
}

export default Fabric;