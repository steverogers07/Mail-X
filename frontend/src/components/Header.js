import React, { Component } from 'react';
import isAuthenticated from "../api/auth";
import { Link, withRouter } from 'react-router-dom';
import {deleteCookies} from "../api/cookie"
import server from "../api/server";


class Header extends Component {
    state = {  }
    logout = () =>{
        deleteCookies()
        server.post('/logout')
        this.props.history.push("/login")
    }
    renderRightItems = () => {
        if(!isAuthenticated()){
            return (
                <div>
                    <ul>
                        <li>
                        <Link to='/register'>  Register</Link>
                        </li>
                        <li>
                        <Link to='/login'>  Login</Link>  
                        </li>
                    </ul>
                </div>
            );
        }
        return (
            <div>
                <ul>
                    <button onClick={this.logout}>Logout</button>
                </ul>
            </div>
        );
    }
    render() { 
        return ( 
            <div>
                <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img src="/brand.jpeg" 
                            width="30" height="30" className="d-inline-block align-top" alt=""/>
                    Bootstrap
                </a>
                {this.renderRightItems()}
                </nav>
            </div>
         );
    }
}
 
export default withRouter(Header);