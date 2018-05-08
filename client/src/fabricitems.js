import React, { Component } from 'react';
import Modal from 'react-modal';

class FabricItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let self = this;
    fetch('/fabricitem', {
      method: 'GET'
    }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
        self.setState({items: data});
    }).catch(err => {
    console.log('caught it!',err);
    })
  }

  // addToCart(event) {
  //   event.preventDefault()
  //   var data = {
  //       items: [] 
  //   }
  //   fetch("/login", {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(data)
  //   }).then(function(response) {
  //       if (response.status >= 400) {
  //         throw new Error("Bad response from server");
  //       }
  //       return response.json();
  //   }).then(function(data) {
  //       console.log(data)    
  //       if(Object.keys(data).length===1){
  //           console.log("Welcome Back");
            
  //       }
  //       else{
  //           console.log(`Sorry, we didn't recognize that username or password`);
  //       }
  //   }).catch(function(err) {
  //       console.log(err)
  //   });
  // }

  render() {
    return (
      <div className="container"> 
        {this.state.items.map(item =>
            <div className='item'>
              <h3>{item.name} </h3>
              <p>{item.description}</p>
              <p>{item.retailPrice}</p>
              <form onSubmit={this.addToCart} method="POST">
                <input className="hidden" type='text' value={item.itemId} name='itemId' required readOnly/>
                <button className="btn btn-uth-submit">Add To Cart</button>
              </form>
            </div>
        )}
      </div>
      );
    }
}

export default FabricItems;