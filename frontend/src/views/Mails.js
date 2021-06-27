import React, { Component } from 'react';
import server from "../api/server"


// Components
import MailCard from "../components/MailCard"


class Mails extends Component {
  state = { mails: [] }
  componentDidMount = async ()=> {
    const res = await server.get('/future');
    // console.log(res.data)
    const allEnabledMails = res.data.allEnabledMails;
    this.setState({mails:allEnabledMails});
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
        <h2>Mails List</h2>
        {renderedItems}
      </div>
    );
  }
  render() { 
    return ( 
      <div>
        Home
        {this.showMails()}
      </div>
    );
  }
}
 
export default Mails;
