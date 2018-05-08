import React, {Component} from 'react';


export default class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            users: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
        
    }

    componentWillMount() {
        let self = this;
        fetch('/login', {
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

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            email: this.state.email,
            password: this.state.password,
        }
        fetch("/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(Object.keys(data).length===1){
                console.log("Welcome Back");
                
            }
            else{
                console.log(`Sorry, we didn't recognize that username or password`);
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value}); 
    }

    render() {
        return (
            <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Email</label>
                    <p>
                    <input type='email' onChange={this.logChange} className="form-control" value={this.state.value} placeholder='email@email.com' name='email' required/>
                    </p>
                    <label>Password</label>
                    <p>
                    <input type='text' onChange={this.logChange} className="form-control" value={this.state.value} placeholder='******' name='password' required/>
                    </p>
                    <div className="submit-section">
                        <button className="btn btn-uth-submit">Log In</button>
                    </div>
                </form>
            </div>
        );
    }
}