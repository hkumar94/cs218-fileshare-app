import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from './LoginNavBar';
import axios from "axios";
import './style.css';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        //prevent the page from refresh
        e.preventDefault();
        const data = {
        
            email_id: this.state.email_id,
            password: this.state.password,
            
        }

        axios("http://localhost:3001/login", data)
        .then(response => {
            this.setState({
                signedUp: 1
            });    
        })
        .catch(error => {
            this.setState({
                message: "LOGIN_ERROR"
            });
        });
        
    }

    

    render() {
        console.log('rendering the page');
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        //Get the username from local or session storage.
        /*if (!localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/customerSignup" />
        }
        if (this.state.signedUp == 1) {
            console.log("User successfully login");
            alert("You have registered successfully. Please Login!");
            redirectVar = <Redirect to="/login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signedUp){
            message = "Username is already registered"
        }*/
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                <div> <NavigationBar /> </div>

                        <div className="container"> 
                        <h2><u> Login</u></h2> 
                                    <form onSubmit={this.onSubmit}>
                                        <table>
                                        
                                        <tr>
                                
                                            <td><label className='floatLabel'><b> Email Id </b></label></td>
                                            <td><input type="email" className="input_field" name="email_id" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required /></td>
                                
                                        </tr>
                                        <tr>
                                        
                                            <td><label className='floatLabel'><b> Password </b></label></td>
                                            <td><input type="password" className="input_field" name="password" onChange={this.onChange} placeholder="Password" required /></td>
                                    
                                        </tr>
                                       
                                       
                                        </table>
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" className="btn-primary"><center>Login</center></button><br /><br />
                                                                        
                                    </form>
                         
                        </div> <br/><br/>
            </div>
            
        )
    }
}

export default Login;
