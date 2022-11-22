import React, { Component, useState } from 'react';
import axios from 'axios';
import env_var from './env.js';
import { Link } from 'react-router-dom';
class FileShare extends Component{

  constructor(props){
    super(props);
    
    this.handleShare = this.handleShare.bind(this);
  }

  onChange = (e) => {
    
    this.setState({[e.target.name] : e.target.value});
    
  }

  handleShare = (e) => {
    let data = {
      "_id": this.props.id,
      "shareWith": this.state.shareWith
    }
    console.log(data);
    axios.post(env_var.SHARE, data, {
      headers: {"username":localStorage.getItem("userId")}
    }, )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    });
  }


  


  render(){
    //console.log(this.props.input);
    return (
      <div>
      <form onSubmit={this.handleShare}> 
      {/* <div class ="row"> */}
        {/* <div class="col-sm-12"> */}
        <input className="defaultTextBox" type="text" name="shareWith" onChange={this.onChange} pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
        <input className = "btn-share" value="Share" type="submit" />
        {/* </div>
      </div> */}
      </form>
      </div>
    );
  }
};
export default FileShare;