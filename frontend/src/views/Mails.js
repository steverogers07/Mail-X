import React, { Component } from 'react';
import server from "../api/server"


// Components
import MailCard from "../components/MailCard"


class Mails extends Component {
  state = { mails: [] }
  componentDidMount = async ()=> {
    const res = await server.get('/allmails');
    // console.log(res.data)
    const allMails = res.data.allMails;
    this.setState({mails:allMails});
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
        <h1 style={{textAlign:"center", color:"#053742", marginTop:"20px", marginBottom:"20px"}}>All Mailing Lists</h1>
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
