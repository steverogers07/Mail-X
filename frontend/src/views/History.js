import React, { Component } from 'react';
import server from "../api/server"

// Components
import MailCard from "../components/MailCard"

class History extends Component {
  state = { mails: [] }
  componentDidMount = async ()=> {
    const res = await server.get('/history');
    // console.log(res.data)
    const allSentMails = res.data.allSentMails;
    // console.log(allEnabledMails)
    this.setState({mails:allSentMails});
    // console.log('State: ', this.state)
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
        <h1 style={{textAlign:"center", color:"#053742", marginTop:"20px", marginBottom:"20px"}}>Mails Sent</h1>
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
