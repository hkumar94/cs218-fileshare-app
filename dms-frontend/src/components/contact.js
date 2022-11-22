import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from './LoginNavBar';
import axios from "axios";
import './style.css';

class contact extends Component {
    
  

    render() {
        return (
            <div className= "backGroundLayer">
 
                <div> <NavigationBar /> </div>

                        <div className="container"> 
                        <h2><u> Contact us</u></h2> 
                                    <div>
                                    <table>
                                        
                                        <tr>
                                
                                            <td><label className='floatLabel'><b> Email Id :</b></label></td>
                                            <td><label className='floatLabel'><b> team5@sjsu.edu </b></label></td>
                                
                                        </tr>
                                        <tr>
                                        
                                            <td><label className='floatLabel'><b> Phone Number :</b></label></td>
                                            <td><label className='floatLabel'><b> +16692043409 </b></label></td>
                                        </tr>
                                       
                                       
                                        </table>
                                    </div>
                         
                        </div> <br/><br/>
            </div>
            
        )
    }
}

export default contact;
