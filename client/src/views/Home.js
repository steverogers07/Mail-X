import React, { Component } from 'react';
import server from "../api/server"
import { deleteCookies } from '../api/cookie';
// import { getCookie } from '../api/cookie';

// Components
import MailCard from "../components/MailCard"

// {
//   headers: {
//       Cookie: `cookie1=${getCookie('authtoken')};`
//   },
//   withCredentials:true
// }
class Home extends Component {
  state = { mails: [], loading:true }
  componentDidMount = async ()=> {
    try{
      const res = await server.get('/future' );
      // console.log(res.data)
      const allEnabledMails = res.data.allEnabledMails;
      // console.log(allEnabledMails)
      this.setState({mails:allEnabledMails, loading: false});
    }catch{
      alert('Unauthorized: Please check , If you have allowed cookies or not!')
      deleteCookies()
    }
    
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
        <h1 style={{textAlign:"center", color:"#053742", marginTop:"20px", marginBottom:"20px"}}>Mailing Lists</h1>
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
 
export default Home;
