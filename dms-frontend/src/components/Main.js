import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './Login';
import Register from './Register.js';
import Contact from './contact';
import HomeUI from './HomeUI';

import HealthCheck from './HealthCheck.js'
class Main extends Component {
    render() {
        return ( 
            <div>
            <Route exact path="/" component={login} />

            <Route path="/login" component={login} />
            <Route path="/register" component={Register} />
            <Route path="/contact" component={Contact} />
            <Route path="/home" component={HomeUI} />
            
            </div>
            );
        }
}
export default Main;