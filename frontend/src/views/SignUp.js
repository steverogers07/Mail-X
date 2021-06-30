import React, { Component } from 'react';
import server from "../api/server";
import {setCookie} from "../api/cookie"
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {g_id} from "../api/auth"
import Notification from '../components/Notification';


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

    onFormSubmit = async (event) =>{
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        
        try{
            // console.log({username, email, password});
            const res = await server.post('/register', {username, email, password});

            if(res.status===201){
                setCookie('authtoken2', res.data.token, 30);
                setCookie('username', username, 30);
                this.props.history.push("/home")
            }else {
                alert('Invalid Email or Email Already registered')
            }
        }catch{
            alert('Server Error')
        }
        
    }
    responseSuccessGoogle = async (response) =>{
        // console.log(response)
       const res = await server.post('/googlelogin', {tokenId: response.tokenId});
       if(res.status===201){
            setCookie('authtoken2', res.data.token, 30);
            setCookie('username', res.data.user.username, 30);
            this.props.history.push("/home")
        }else {
            // Handle error
        }
    }
    responseFailureGoogle = async (res) =>{
        // console.log('Failure: ', res)
        // this.props.history.push("/login")
    }
    render() {
        
        return (
            <>
            <div style={{width:"300px", marginTop:"5%", marginLeft:"40%"}}>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"><h4>Email address</h4></label>
                        <input name ="email" type="text" className="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleInputChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username"><h4>Username</h4></label>
                        <input name ="username" type="text" className="form-control" id="username" aria-describedby="username" placeholder="Choose a username" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1"><h4>Password</h4></label>
                        <input name ="password" type="password" required className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleInputChange}/>
                        <small id="passworHelp" className="form-text text-muted">Password Should be atleast 7 characters.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <br />
                <div>
                <Link to='/login'> Already a member? Login here. </Link>
                <GoogleLogin
                    clientId={g_id}
                    buttonText="Sign up"
                    onSuccess={this.responseSuccessGoogle}
                    onFailure={this.responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                
                </div>
            </div>
            <Notification/>
            </>
          );

        // return (
        //     <div>
        //          <form  onSubmit={this.onFormSubmit}>
        //                 <label>Email </label>
        //                 <input 
        //                     name ="email"
        //                     type="text"
        //                     // value={this.state.email}
        //                     onChange={this.handleInputChange}
        //                 />
        //                 <label>Username </label>
        //                 <input 
        //                     name="username"
        //                     type="text"
        //                     // value={this.state.username}
        //                     onChange={this.handleInputChange}
        //                 />

        //                 <label>Password </label>
        //                 <input
        //                     name="password" 
        //                     type="password"
        //                     onChange={this.handleInputChange}
        //                 />
        //             <button type="submit">Submit</button>
        //         </form>
        //         <div>
                    
        //             <Link to='/login'> Already a member?  </Link>
        //         </div>
        //     </div>
        //   );
    }
}
 
export default SignUp;