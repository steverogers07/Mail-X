import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

// Views 
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';

// Components
import Header from './components/Header';
import Footer from './components/Footer';


ReactDOM.render(
  <BrowserRouter>
    <Header/>
    <Switch>
      
      <Route path="/login" component={Login} />
      <Route path="/register" component={SignUp} />
      <Route path="/home" component={Home} />
      <Redirect from="/" to="/home"/>
    </Switch>
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
);
