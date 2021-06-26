import React, { Component } from 'react';
import server from "../api/server"

class Home extends Component {
  state = { mails: [] , user : {}}
  componentDidMount = async ()=> {
    const res = await server.get('/history');
    // console.log(res.data)
    const {mails} = res.data.foundUser;
    this.setState({mails, user:  res.data.foundUser.username});
    // console.log('State: ', this.state)
  }
  showMails = () =>{
    const renderedItems = this.state.mails.map(mail => {
      return (
        // Use Card Component with props here
        <div key={mail._id}>
          <h4>{mail.subject}</h4>
          <p>{mail.to}</p>
        </div> 
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
 
export default Home;
