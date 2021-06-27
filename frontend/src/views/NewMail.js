import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// import DateTimePicker from 'react-datetime-picker';
// import { Link } from 'react-router-dom';

import server from "../api/server";
// import {setCookie} from "../api/cookie"

// assets
// import "./css/Login.css"

class NewMail extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), frequency: 'weekly'};
    
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleDateChange = this.handleDateChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    // handleDateChange(value){
    //     console.log('value: ', value)
    //     // console.log('After date change: ',event.target)
    //     // console.log('Type: ', event.target.type)
    //     this.setState({date: value})
    // }

    showOptions = () =>{
        switch (this.state.frequency) {
            case 'weekly':
                return (
                    <div>
                        <div className="form-group">
                            <label for="week">Schedule for every week: </label>
                            <input type="number" min="0" max="6" name="week"></input>
                        </div>
                        <div className="form-group">
                        
                        <label for="time">Schedule for every time: </label>
                            <input type="time" name="time"></input>
                        </div>
                    </div>
                );
            case 'monthl':
                return (
                    <div>
                        <div className="form-group">
                            <label for="day">Schedule for every month: </label>
                            <input type="number" min="1" max="31" name="day"></input>
                        </div>
                        <div className="form-group">
                        <label for="time">Schedule for every time: </label>
                                <input type="time" name="time"></input>
                        </div>
                    </div>
                    );
            case 'yearly':
                return (
                    <div>
                        <div className="form-group">
                            <label for="day">Schedule for every month: </label>
                            <input type="number" min="1" max="31" name="day"></input>
                        </div>
                        <div className="form-group">
                            <label for="month">Schedule for every month: </label>
                            <input type="number" min="1" max="12" name="month"></input>
                        </div>
                        <div className="form-group">
                        <label for="time">Schedule for every time: </label>
                                <input type="time" name="time"></input>
                        </div>
                    </div>
                    );
            default:
                return <></>;
        }
    }
    
    onFormSubmit = async (event) =>{
        event.preventDefault();
        const form = event.target;
        // const username = form.username.value;
        const toAddress = form.toAddress.value;
        const ccAddress = form.ccAddress.value;
        const subject = form.subject.value;
        const content = form.content.value;
        const frequency = this.state.frequency
        let finfo = {}
        switch (frequency) {
            case "weekly":
                const week = form.week.value
                const time = form.time.value
                finfo = {week, time}
                break;
            case "monthl":
                const day = form.day.value
                const time2 = form.time.value
                finfo = {day, time: time2}
                break;
            case "yearly":
                const month = form.month.value
                const day2 = form.day.value
                const time3 = form.time.value
                finfo = {day: day2, month, time: time3}
                break;
            default:
                break;
        }
        
        // console.log(frequency)
        // console.log(finfo)
        // console.log({username, email, password});
        const res = await server.post('/mail', {toAddress, ccAddress, subject, content, enabled:true, frequency, ...finfo});
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
                        {/* <small id="emailHelp" className="form-text text-muted">Please</small> */}
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
                    {/* Handling frequency */}
                    <div className="form-group">
                        <label for="frequency">Please choose one of the below frequency type</label>
                        <select name="frequency" value={this.state.frequency}  onChange={this.handleInputChange}>
                            <option value="weekly">Weekly</option>
                            <option value="monthl">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="minute">Minutely</option>
                        </select>
                    </div>
                    {this.showOptions()}
                    
                    
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
          );
    }
}
 
export default withRouter(NewMail);