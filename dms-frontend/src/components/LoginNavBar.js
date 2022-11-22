import React , { useState }  from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Component } from 'react';


class LoginNavBar extends Component {


    render() {
                     
        return (
            <div className= "backGroundLayer">
            <div className = "navbar">
        
            <div className = "leftSide">
            <label className="title"><b>Cloud Document Management System</b></label> 
                <div className="hiddenLinks">
                <Link to="/contact"> Contact Us </Link> 
                </div>
            </div>    
            <div className = "rightSide">
            <Link to="/register">Register</Link> 
            <Link to="/contact"> Contact Us </Link>
            </div>    
        </div> </div>
        );
   }
}

export default LoginNavBar;