import React, { Component, useEffect, ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from './FileUpload';
import axios from "axios";
import NavigationBar from './LoginNavBar';
import './style.css';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';
import FileDelete from './FileDelete';
import FileShare from './FileShare';
import env_var from './env.js';
import HomeUINavBar from './HomeUINavBar';
import Dialog from 'react-bootstrap';


class HomeUI extends Component {
    
    constructor() {
        super();
        this.state = {
            filesArray: [],
        };
        this.handler = this.handler.bind(this);
        this.getAllFiles = this.getAllFiles.bind(this);
        this.getError = this.getError.bind(this);
    }
    
    handler () {
        //this.getAllFiles();
        
        window.location.reload(false);
    }

    getError () {
        return <p>User does not exist!</p>
    }

    Files = (filesArray) => {
        if (filesArray.length > 0){
            return(
                filesArray.map((file) => {
                    console.log(file)
                    return (
                        <div class="container-file">
                            <table border="1px" width= "100%">
                              <tr>
                                <th>File Name</th>
                                <th>Shared with</th>
                                <th>Owner</th>
                            </tr>
                            <tr>
                                <td><p>{file.name}</p></td>
                                <td><p>{file.sharedWith}</p></td>
                                <td><p>{file.owner}</p></td>
                            </tr>
                            
                            </table>
                            <tr>
                            <td ><FileDownload  id={file._id} name={file.name} type={file.mimetype}/></td>
                            <td><FileDelete id={file._id} name={file.name} handler={this.handler}/></td>
                            </tr>
                            <tr>
                            <td><FileShare id={file._id} getError={this.getError}/></td>
                            </tr>
                            <hr></hr>
                        
                        </div>
                    )
                })
            )
        } else {
            return <p>No files</p>
        }
    }


    getAllFiles = () => {
        axios.get(env_var.GETALL, {
            headers: {'username':localStorage.getItem("userId")}
        })
        .then(response => {
            this.setState({
                filesArray: response.data
            })
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getAllFiles();
    }

    render() {
        let redirectVar = null;
        console.log("Username active", localStorage.getItem("userId"));
        if (!localStorage.getItem("userId")) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                <div> <HomeUINavBar /> </div>
                    <div className="error-container">
                        {this.getError}
                    </div>
                        <div className="container"> 
                        <h2>Documents</h2> 
                            <div>
                                <FileUpload />  
                            </div>
                            <div>
                                {/* <table > */}
                                    {/* <tr>
                                    <td><label className='floatLabel'><b> Documents</b></label></td>
                                    </tr> */}
                                    {this.Files(this.state.filesArray)}
                                {/* </table> */}
                            </div>
                        </div> <br/><br/>
            </div>
            
        )
    }
}

export default HomeUI;