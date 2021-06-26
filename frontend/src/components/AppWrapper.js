import { Redirect, Route, Switch } from 'react-router-dom'
import isAuthenticated from "../api/auth"
import React, { Component } from 'react';

//Views
import Home from '../views/Home';
import History from "../views/History";
import Login from '../views/Login';
import SignUp from '../views/SignUp';

class AppWrapper extends Component{
  render(){

  if(!isAuthenticated()){
    return(
      <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={SignUp} />
            <Redirect path="/" to="/login" />
      </Switch>
    );
  }
    

   return(
    <Switch>
       <Route path='/home' exact component={Home} />
       <Route path='/history' exact component={History} />
        {/* Other Protected Routes... */}
       <Redirect path="/" to="/home" />
     </Switch>
   );
  }
}

export default AppWrapper;