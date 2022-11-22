import React, { Component } from 'react';
import axios from 'axios';
import env_var from './env.js';

class FileUpload extends Component{

  constructor(){
    super();
    this.state = {
      selectedFile: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    const formData = new FormData();
    console.log(this.state.selectedFile);
    formData.append('file', this.state.selectedFile);
    console.log(env_var);
    axios.post(env_var.UPLOAD, formData, {
      headers: { 'username': localStorage.getItem("userId")},
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
  }


 
  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files[0],
    });
    //console.log(this.state);
    //console.log(e.target.files[0])
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input className = "browse-upload" type="file" onChange={this.handleFileSelect}/>
        <input className = "btn-upload" type="submit" value="Upload File" />
      </form>
    )
  }
};
export default FileUpload;