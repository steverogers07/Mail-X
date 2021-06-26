import React, { Component } from 'react';
import isAuthenticated from "../api/auth";
import { Link, withRouter } from 'react-router-dom';
import {deleteCookies} from "../api/cookie"
import server from "../api/server";


class Header extends Component {
    state = {  }
    logout = async () =>{
        await server.post('/logout')
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
                        Username
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="logout">Action</Link>
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
                            <Link className="nav-link" to="/History">History</Link>
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