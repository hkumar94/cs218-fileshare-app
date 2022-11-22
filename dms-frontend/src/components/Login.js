import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from './LoginNavBar';
import axios from "axios";
import './style.css';
import env_var from './env.js';
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    setRedirect(){
        this.redirect = true;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        //prevent the page from refresh
        console.log("onSubmit")
        e.preventDefault();
        const data = {
            username: this.state.email_id,
            password: this.state.password
        }
        
        console.log(this.redirect);
        axios.post(env_var.LOGIN, data)
        .then((response) => {
            this.setState({
                signedUp: 1
            });    
            console.log(response.status);
            this.setState({
                redirect: true
            })
        })
        .catch((error) => {
            this.setState({
                message: "LOGIN_ERROR"
            });
            window.alert("Invalid username or password!");
            console.log(error);
        });
    }

    render() {
        //console.log('rendering the page');
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
        if (!localStorage.getItem("userId")) {
            redirectVar = <Redirect to="/login" />
        }
        if (this.state.signedUp == 1 || localStorage.getItem("userId")) {
            console.log("User successfully login");
            localStorage.setItem("userId",this.state.email_id);
            redirectVar = <Redirect to="/home" />
        }   
         if(this.state.message == "LOGIN_ERROR"){
            console.log("Invalid username and password");
            redirectVar = <Redirect to="/login" />

        }
        
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                <div> <NavigationBar /> </div>

                        <div className="container"> 
                        <h2><u> Login</u></h2> 
                                    <form onSubmit={this.onSubmit}>
                                        <table>
                                        
                                        <tr>
                                
                                            <td><label className='floatLabel'><b> Email ID </b></label></td>
                                            <td><input type="email" className="input_field" name="email_id" onChange={this.onChange} placeholder="Email ID" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required /></td>
                                
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
