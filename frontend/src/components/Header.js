import React, { Component } from 'react';
import isAuthenticated from "../api/auth";
import { Link, withRouter } from 'react-router-dom';
import {deleteCookies, getCookie} from "../api/cookie"
import server from "../api/server";


class Header extends Component {
    state = { username: getCookie('username') }
    logout = async () =>{
        const res = await server.post('/logout')
        deleteCookies()
        this.props.history.push("/login")
    }
    renderRightItems = () => {
        if(!isAuthenticated()){
            return (
                <>
                <li className="nav-item active">
                    <Link className="nav-link" to='/register'>  Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>  Login</Link>  
                </li>
                </>
            );
        }
        return (
            <div>
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.username}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button className="dropdown-item" onClick={this.logout}>Log Out</button>
                    </div>
                </li>
            </div>
        );
    }
    render() { 
        return ( 
            <div>
                {/* Navbar 1 */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Flipr</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/history">History</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allmails">All Mails</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/newmail">Schedule Mail</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/testpage">Test</Link>
                        </li>

                        {this.renderRightItems()}
                        </ul>
                    </div>
                </nav>
            </div>
         );
    }
}
 
export default withRouter(Header);