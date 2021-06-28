import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom';

import server from "../api/server";
// import {setCookie} from "../api/cookie"

// assets
// import "./css/Login.css"

class UpdateMail extends Component {
    constructor(props) {
        super(props);
        this.state = {loading : true};
    
        this.handleInputChange = this.handleInputChange.bind(this);
        // console.log(this.props.match)
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    componentDidMount = async () => {
        const id = this.props.match.params.id
        const res = await server.get(`/mail/${id}`)
        const mail = res.data
        // console.log('Mail Received: ', mail)
        this.setState({...mail, loading: false})

    }
    onFormSubmit = async (event) =>{
        event.preventDefault();
        const {_id, ccAddress, toAddress, subject, content, enabled} = this.state
        // const form = event.target;
        // // const username = form.username.value;
        // const toAddress = form.toAddress.value;
        // const ccAddress = form.ccAddress.value;
        // const subject = form.subject.value;
        // const content = form.content.value;
        // console.log(this.props.match)
        // const id = this.props.match.params.id //"60d70bcbe8e07747b81e2035"
        // console.log({username, email, password});
        const res = await server.patch(`/mail/${_id}`, {toAddress, ccAddress, subject, content, enabled});
        // console.log('Response: ', res)
        if(res.status===200){
            this.props.history.push("/home")
        }else {
            // Handle error
        }
        
    }
    render() { 
        if(this.state.loading){
            return <div>Loading...</div>
        }
        const {_id, ccAddress, toAddress, subject, enabled, content} = this.state
        return (
            <div id={_id}>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="to">To:</label>
                        <input name ="toAddress" type="text" className="form-control"
                         id="to" placeholder="example@gmail.com"
                         value={toAddress}
                         onChange={this.handleInputChange}
                         />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cc">cc:</label>
                        <input name ="ccAddress" type="text" className="form-control" 
                        id="cc"  placeholder="example@gmail.com"
                        value={ccAddress}
                        onChange={this.handleInputChange}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input name ="subject" type="text" className="form-control" 
                        id="subject"  placeholder="Subject"
                        value={subject}
                         onChange={this.handleInputChange}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Body</label>
                        <input name ="content" type="text" className="form-control"
                         id="content"  placeholder="Body"
                         value={content}
                         onChange={this.handleInputChange}
                         />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="enabled">Body</label>
                        <input name ="enabled" type="checkbox" className="form-control"
                         id="enabled"
                         checked={enabled}
                         onChange={this.handleInputChange}
                         />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
          );
    }
}
 
export default withRouter(UpdateMail);