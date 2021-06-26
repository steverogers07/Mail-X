import React, { Component } from 'react';
import axios from "axios";


class SignUp extends Component {
    // state = {username: "", email="", password=""};
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

    // onEmailChange = (event) =>{
    //   this.setState({email: event.target.value})
    // };
    // onUsernameChange = (event) =>{
    //     this.setState({username: event.target.value})
    //   };
    onFormSubmit = async (event) =>{
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log({username, email, password});
        const res = await axios.post('http://localhost:5000/register', {username, email, password});
        console.log(res)
        const body = await res.json();
        console.log(body);
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
                        <label>Username </label>
                        <input 
                            name="username"
                            type="text"
                            // value={this.state.username}
                            onChange={this.handleInputChange}
                        />

                        <label>Password </label>
                        <input
                            name="password" 
                            type="password"
                            onChange={this.handleInputChange}
                        />
                    <button type="submit">Submit</button>
                </form>
            </div>
          );
    }
}
 
export default SignUp;