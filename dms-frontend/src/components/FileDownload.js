import React, { Component } from 'react';
import axios from 'axios';
import env_var from './env.js';
import { Link } from 'react-router-dom';

class FileDownload extends Component{

  constructor(props){
    super(props);

    this.handleDownload = this.handleDownload.bind(this);
  }
  
  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

  handleDownload = (e) => {
    console.log(this.props);
    const link = document.createElement('a');
    link.target = "_blank";
    link.download = this.props.name;
    axios.get(env_var.DOWNLOAD, {
      headers: {'username': localStorage.getItem("userId"), "_id":this.props.id}, 
      
    }, )
    .then(response => {
      let convertedBlob = this.base64ToArrayBuffer(response.data[0].data);
      var blob = new Blob([convertedBlob], {type: this.props.type });
      link.href = URL.createObjectURL(blob);
      link.click();
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
  }


  render(){
    return (
        <button className = "btn-primary-dwnld" onClick = {this.handleDownload} value="Download">Download</button>
    )
  }
};
export default FileDownload;