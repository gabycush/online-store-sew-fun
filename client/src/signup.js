import React, {Component} from 'react';


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: 'NULL',
            password: '',
            address: 'NULL',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
        
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        console.log(data)
        fetch("/newcustomer", {
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
            if(data === "success"){
               this.setState({msg: "Thanks for registering"});  
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value}); 
        console.log (JSON.stringify(this.state)); 
    }

    render() {
        return (
            <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Name</label>
                    <p>
                    <input type='text' onChange={this.logChange} className="form-control" value={this.state.value} placeholder='John' name='name' required/>
                    </p>
                    <label>Email</label>
                    <p>
                    <input type='email' onChange={this.logChange} className="form-control" value={this.state.value} placeholder='email@email.com' name='email' required/>
                    </p>
                    <label>Password</label>
                    <p>
                    <input type='text' onChange={this.logChange} className="form-control" value={this.state.value} placeholder='******' name='password' required/>
                    </p>
                    <div className="submit-section">
                        <button className="btn btn-uth-submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}