import React , { useState }  from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Component } from 'react';
import { Redirect } from 'react-router';


class HomeUINavBar extends Component {


    handleLogout = (e) => {
        window.localStorage.clear();
        localStorage.removeItem("userId");
    };

    render() {
                     
        return (
            <div className= "backGroundLayer">
            <div className = "navbar">
            <div className = "leftSide">
            <label className="title"><b>Cloud Document Management System</b></label> 
            </div>    
            <div className = "rightSide">
            <Link to="/contact"> Contact Us </Link> 
            <Link to="/login" onClick={this.handleLogout}> Logout </Link>
            </div>    
        </div> </div>
        );
   }
}

export default HomeUINavBar;