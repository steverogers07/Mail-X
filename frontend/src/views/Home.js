import React, { Component } from 'react';
// import server from "../api/server"

class Home extends Component {
  state = {  }
  // componentDidMount = async ()=> {
  //   const res = await server.get('/history');
  //   console.log('Response: ',res)
  // }
  // showList = async(mails) =>{
    
  //   return (
  //     <div>Mails</div>
  //   );
  // }
  render() { 
    return ( 
      <div>
        Home
        {/* {this.showList()} */}
      </div>
    );
  }
}
 
export default Home;
