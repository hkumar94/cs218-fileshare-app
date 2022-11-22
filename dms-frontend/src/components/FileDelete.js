import React, { Component } from 'react';
import axios from 'axios';
import env_var from './env.js';
import { Link } from 'react-router-dom';

class FileDelete extends Component{

  constructor(props){
    super(props);
    
    this.handleDelete = this.handleDelete.bind(this);
    this.axioxDelete = this.axioxDelete.bind(this);
  }

  axioxDelete() {
    axios.delete(env_var.DELETE, {
      headers: {'username': localStorage.getItem("userId"), "_id":this.props.id}, 
      
    }, )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    });
  }
  handleDelete = (e) => {
    console.log(this.props);
    this.axioxDelete();
    this.props.handler();
  }

  componentWillUnmount(){
    this.props.handler();
  }
  render(){
      return (
          <button className = "btn-primary-del" onClick = {this.handleDelete} value="Delete">Delete</button>
      )
  }
};
export default FileDelete;