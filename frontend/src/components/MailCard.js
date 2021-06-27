import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Api
import server from "../api/server"

class MailCard extends Component {
    state = {enabled: true }
    componentDidMount() {
        console.log('Props: ',this.props)
    }
    submitDelete = async () =>{
        await server.delete(`/mail/${this.props._id}`)
        this.setState({enabled: false})
    }
    render() { 
        const {_id, ccAddress, toAddress, subject} = this.props
        const enabled = this.state.enabled
        return ( 
            <ul className="list-group">
                <li className="list-group-item">
                <div className="card" style={{backgroundColor:"#D8E3E7", width: '80%'}}>
                    <div className="card-body">
                        <p>Created on: 24 June, 2021</p>
                        <h3 style={{color:'#126E82'}}>{subject}</h3>
                        <hr/>
                        <h6 className="card-text" style={{color:'#4B778D'}}>To: {toAddress.map(add=> <span>{add},</span>)}</h6>
                        <h6 className="card-text" style={{color:'#4B778D'}}>CC: {ccAddress.map(add=> <span>{add},</span>)}</h6>
                        <p className="card-text"  style={{color:'#343F56'}}>Frequency: <strong>Weekly</strong></p>
                            <button style={{display: "inline"}} className={`btn btn-${enabled?"success":"danger"}`}>
                                {enabled?"Enabled":"Disabled"}
                            </button>
                        <div style={{display: 'inline', marginLeft:"75%"}} className="card-button">
                            <Link to={`/updatemail/${_id}`} className="btn btn-primary">Update</Link>
                            {enabled?<button onClick={this.submitDelete} className="btn btn-danger">Delete</button>:null}
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        );
    }
}
 
export default MailCard;