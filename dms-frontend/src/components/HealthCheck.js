import React from 'react'
import axios from 'axios';
import env_var from './env.js';

function HealthCheck () {

    axios.get(env_var.HEALTHCHECK)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })

}

export default HealthCheck;
