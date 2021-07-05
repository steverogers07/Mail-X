import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import "./../views/css/Login.css"
import "./../views/css/internal.css"

// Api
// import server from "../api/server"

class HistoryMailCard extends Component {
    state = {enabled: this.props.enabled , deleted: this.props.deleted}
    render() {
        const {_id, ccAddress, toAddress, subject, count, frequency, createdAt} = this.props
        // const enabled = this.state.enabled
        // const deleted = this.state.deleted
        return ( 
                <ul key={_id} className="list-group" style={{borderBottom: "none"}}>
                <li className="list-group-item">
                <div className="card" style={{backgroundColor:"#F8EDED", width: '80%',marginLeft:"10%", paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="card-body">
                        <p>Created on: {createdAt?(new Date(createdAt)).toDateString(): '28 June, 2021'}</p>
                        <h3 style={{color:'#053742'}}>{subject}</h3>
                        <h6 className="card-text" style={{color:'#4B778D'}}>To: {toAddress.map(add=> <span key={add}>{add},</span>)}</h6>
                        <h6 className="card-text" style={{color:'#4B778D'}}>CC: {ccAddress.map(add=> <span key={add}>{add},</span>)}</h6>
                        <p className="card-text"  style={{color:'#343F56'}}>Frequency: <strong>{frequency}</strong></p>
                        <p className="card-text"  style={{color:'#343F56'}}>Count: <strong>{count}</strong></p>
                    </div>
                </div>
                </li>
            </ul>
                );
    }
}
 
export default HistoryMailCard;