import React, { Component } from 'react';
import server from "../api/server";
import {setCookie, getCookie} from "../api/cookie"
import { Link } from 'react-router-dom';


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
        
        
        // console.log({username, email, password});
        const res = await server.post('/register', {username, email, password});

        if(res.status===201){
            setCookie('authtoken', res.data.token, 30);
            setCookie('username', username, 30);
            this.props.history.push("/home")
        }else {
            // Handle error
        }
    }
    render() {
        
        return (
            <div style={{width:"300px", marginTop:"5%", marginLeft:"40%"}}>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1"><h4>Email address</h4></label>
                        <input name ="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleInputChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1"><h4>Username</h4></label>
                        <input name ="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Choose a username" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1"><h4>Password</h4></label>
                        <input name ="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <br />
                <div>
                    
                    <Link to='/login'> Already a member? Login here. </Link>
                </div>
            </div>
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