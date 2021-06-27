import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Api
import server from "../api/server"

class MailCard extends Component {
    state = {enabled: this.props.enabled , deleted: this.props.deleted}
    componentDidMount() {
        console.log('Props: ',this.props)
    }
    submitDelete = async () =>{
        await server.delete(`/mail/${this.props._id}`)
        this.setState({enabled: false, deleted: !this.state.deleted})
    }
    handleEnabel = async () => {
        // console.log(this.state.enabled)
        await server.patch(`/mail/${this.props._id}`, {enabled:!this.state.enabled})
        // this.props.enabled = this.state.enabled
        this.setState({enabled: !this.state.enabled})
    }
    render() { 
        const {_id, ccAddress, toAddress, subject, content, count} = this.props
        const enabled = this.state.enabled
        const deleted = this.state.deleted
        return ( 
            <ul key={_id} className="list-group">
                <li className="list-group-item">
                <div className="card" style={{backgroundColor:"#D8E3E7", width: '80%'}}>
                    <div className="card-body">
                        <p>Created on: 24 June, 2021</p>
                        <h3 style={{color:'#126E82'}}>{subject}</h3>
                        <hr/>
                        <h6 className="card-text" style={{color:'#4B778D'}}>To: {toAddress.map(add=> <span key={add}>{add},</span>)}</h6>
                        <h6 className="card-text" style={{color:'#4B778D'}}>CC: {ccAddress.map(add=> <span key={add}>{add},</span>)}</h6>
                        <p className="card-text"  style={{color:'#343F56'}}>Frequency: <strong>Weekly</strong></p>
                        <p className="card-text"  style={{color:'#343F56'}}>Count: <strong>{count}</strong></p>
                            <button onClick={this.handleEnabel}  style={{display: "inline"}} className={`btn btn-${enabled?"success":"danger"}`}>
                                {enabled?"Enabled":"Disabled"}
                            </button>
                        <div style={{display: 'inline', marginLeft:"75%"}} className="card-button">
                            <Link to={`/updatemail/${_id}`} className="btn btn-primary">Update</Link>
                            {!deleted?<button onClick={this.submitDelete} className="btn btn-danger">Delete</button>:null}
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        );
    }
}
 
export default MailCard;