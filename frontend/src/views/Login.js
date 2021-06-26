import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import server from "../api/server";
import {setCookie} from "../api/cookie"
// import history from "../history"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", email:"", password:""};
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
    }

    onFormSubmit = async (event) =>{
        event.preventDefault();
        const form = event.target;
        // const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({username, email, password});
        const res = await server.post('/login', {email, password});
        // console.log('Response: ', res)
        if(res.status===200){
            setCookie('authtoken', res.data.token, 30);
            this.props.history.push("/home")
        }else {
            // Handle error
        }

        // Apply setCookie
        
    }
    render() { 
        return (
            <div>
                 <form  onSubmit={this.onFormSubmit}>
                        <label>Email </label>
                        <input 
                            name ="email"
                            type="text"
                            // value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                        {/* <label>Username </label>
                        <input 
                            name="username"
                            type="text"
                            // value={this.state.username}
                            onChange={this.handleInputChange}
                        /> */}

                        <label>Password </label>
                        <input
                            name="password" 
                            type="password"
                            onChange={this.handleInputChange}
                        />
                    <button type="submit">Submit</button>
                </form>
                <div>
                     
                    <Link to='/register'>  Create a new Account</Link>
                </div>
            </div>
          );
    }
}
 
export default withRouter(Login);