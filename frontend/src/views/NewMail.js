import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom';

import server from "../api/server";
// import {setCookie} from "../api/cookie"

// assets
// import "./css/Login.css"

class NewMail extends Component {
    constructor(props) {
        super(props);
        // this.state = {username: "", email:"", password:""};
    
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
        const toAddress = form.toAddress.value;
        const ccAddress = form.ccAddress.value;
        const subject = form.subject.value;
        const content = form.content.value;
        // console.log({username, email, password});
        const res = await server.post('/mail', {toAddress, ccAddress, subject, content, enabled:true});
        // console.log('Response: ', res)
        if(res.status===201){
            this.props.history.push("/home")
        }else {
            // Handle error
        }
        
    }
    render() { 

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label for="to">To:</label>
                        <input name ="toAddress" type="text" className="form-control" id="to" placeholder="example@gmail.com"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label for="cc">cc:</label>
                        <input name ="ccAddress" type="text" className="form-control" id="cc"  placeholder="example@gmail.com"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label for="subject">Subject</label>
                        <input name ="subject" type="text" className="form-control" id="subject"  placeholder="Subject"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label for="content">Body</label>
                        <input name ="content" type="text" className="form-control" id="content"  placeholder="Body"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
          );
    }
}
 
export default withRouter(NewMail);