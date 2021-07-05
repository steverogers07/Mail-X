import React, { Component } from 'react';
import { deleteCookies } from '../api/cookie';
import server from "../api/server"


// Components
import MailCard from "../components/MailCard"


class Mails extends Component {
  state = { mails: [], loading: true }
  componentDidMount = async ()=> {
    try{
      const res = await server.get('/allmails');
        // console.log(res.data)
      const allMails = res.data.allMails;
      this.setState({mails:allMails, loading: false});
      // console.log('State: ', this.state)
    }catch{
      alert('Unauthorized: Please check , If you have allowed cookies or not!')
      deleteCookies()
    }
    
    
  }
  showMails = () =>{
    const renderedItems = this.state.mails.map(mail => {
      return (
        // Use Card Component with props here
        <MailCard key={mail._id} {...mail} />
      );
    });
    return (
      <div>
        <h1 style={{textAlign:"center", color:"#053742", marginTop:"20px", marginBottom:"20px"}}>All Mailing Lists</h1>
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
 
export default Mails;
