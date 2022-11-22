import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import NavigationBar from './Navbar';
import axios from "axios";
import './style.css';
import env_var from './env.js';


class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

    }

    setRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
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
            username: this.state.username,
            password: this.state.password
        }
        this.setState({
            redirect: true
        })
        axios.post(env_var.SIGNUP, data)
        .then(response => {
            this.setState({
                signedUp: 1
            });    
            this.setRedirect();
        })
        .catch(error => {
            this.setState({
                message: "REGISTER_ERROR",
                register: true
            });
            
            this.setRedirect();
        })

    }
    
    render() {
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
            redirectVar = <Redirect to="/customerLogin" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signedUp){
            message = "Username is already registered"
        }*/
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                <div> <NavigationBar /> </div>

                        <div className="container"> 
                        <h2><u> Register</u></h2> 
                                    <form onSubmit={this.onSubmit}>
                                        <table>
                                        
                                        <tr>
                                
                                            <td><label className='floatLabel'><b> Email Id </b></label></td>
                                            <td><input type="email" className="input_field" name="username" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required /></td>
                                
                                        </tr>
                                        <tr>
                                        
                                            <td><label className='floatLabel'><b> Password </b></label></td>
                                            <td><input type="password" className="input_field" name="password" onChange={this.onChange} placeholder="Password" required /></td>
                                    
                                        </tr>
                                       
                                       
                                        </table>
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" className="btn-primary"><center>Signup</center></button><br /><br />
                                                                        
                                    </form>
                         
                        </div> <br/><br/>
            </div>
            
        )
    }
}

export default Register;
