import { Redirect, Route } from 'react-router-dom'
import isAuthenticated from "../api/auth"
import React, { Component } from 'react';



//Views
import Login from './views/Login';
import SignUp from './views/SignUp';

class OpenAppWrapper extends Component{
  render(){

  if(isAuthenticated())
    return <Redirect to="/home" />

   return(
     <div>
        
        <Route path='/home' component={Home} />
     </div>
   );
  }
}

export default OpenAppWrapper;