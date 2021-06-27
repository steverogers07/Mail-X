import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import server from "../api/server";
import {setCookie} from "../api/cookie"

// assets
import "./css/Login.css"


const g_id = '747047291644-u1amvc1utafscsca4rhtg8kh0vqa3qg0.apps.googleusercontent.com'
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
            setCookie('username', res.data.user.username, 30);
            this.props.history.push("/home")
        }else {
            // Handle error
        }
    }
    responseSuccessGoogle = async (response) =>{
        // console.log(response)
       const res = await server.post('/googlelogin', {tokenId: response.tokenId});
       if(res.status===201){
            setCookie('authtoken', res.data.token, 30);
            setCookie('username', res.data.user.username, 30);
            this.props.history.push("/home")
        }else {
            // Handle error
        }
    }
    responseFailureGoogle = async (res) =>{
        console.log('Failure: ', res)
        // this.props.history.push("/login")
    }
    render() { 

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input name ="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input name ="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <GoogleLogin
                    clientId={g_id}
                    buttonText="Login"
                    onSuccess={this.responseSuccessGoogle}
                    onFailure={this.responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div>
                    <Link to='/register'>  Create a new Account</Link>
                </div>
            </div>
          );
    }
}
 
export default withRouter(Login);