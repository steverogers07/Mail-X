import { Redirect, Route, Switch } from 'react-router-dom'
import isAuthenticated from "../api/auth"
import React, { Component } from 'react';

//Views
import Home from '../views/Home';
import History from "../views/History";
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Mails from '../views/Mails';
import NewMail from '../views/NewMail';
import UpdateMail from '../views/UpdateMail';
import TestPage from '../views/TestPage';

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
       <Route path='/allmails' exact component={Mails} />
       <Route path='/newmail' exact component={NewMail} />
       <Route path='/updatemail/:id' exact component={UpdateMail} />
       <Route path='/testpage' exact component={TestPage}/>
        {/* Other Protected Routes... */}
       <Redirect path="/" to="/home" />
     </Switch>
   );
  }
}

export default AppWrapper;