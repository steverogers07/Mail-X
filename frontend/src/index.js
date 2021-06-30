import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route} from "react-router-dom";

// Views 
import AppWrapper from "./components/AppWrapper"

// Components
import Header from './components/Header';
import Footer from './components/Footer';


ReactDOM.render(
  <Router>
    <Header/>
      <Route path="/" component={AppWrapper} />
    <Footer/>
  </Router>,
  document.getElementById('root')
);
