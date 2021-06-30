import React, { Component } from 'react';
import server from "../api/server"
import { deleteCookies } from '../api/cookie';

// Components
import HistoryMailCard from "../components/HistoryMailCard"

class History extends Component {
  state = { mails: [] , loading : true}
  componentDidMount = async ()=> {
    try{
    const res = await server.get('/history');
    // console.log(res.data)
    const allSentMails = res.data.allSentMails;
    // console.log(allEnabledMails)
    this.setState({mails:allSentMails, loading: false});
    }catch{
      alert('Unauthorized: Please check , If you have allowed cookies or not!');
      deleteCookies()
    }
    // console.log('State: ', this.state)
  }
  showMails = () =>{
    const renderedItems = this.state.mails.map(mail => {
      return (
        // Use Card Component with props here
        <HistoryMailCard key={mail._id} {...mail} />
      );
    });
    return (
      <div>
        <h1 style={{textAlign:"center", color:"#053742", marginTop:"20px", marginBottom:"20px"}}>Mails Sent</h1>
        {this.state.loading?'Loading Mails...':""}
        {renderedItems}
      </div>
    );
  }



  render() { 
    return ( 
      <div>
        {this.showMails()}
        
      </div>
    );
  }
}
 
export default History;
