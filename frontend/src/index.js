import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from "react-router-dom";

// Views 
import AppWrapper from "./components/AppWrapper"

// Components
import Header from './components/Header';
import Footer from './components/Footer';


ReactDOM.render(
  <BrowserRouter>
    <Header/>
      <Route path="/" component={AppWrapper} />
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
);
