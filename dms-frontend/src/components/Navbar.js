import React , { useState }  from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {

    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
      };
    
    const handleLogout = () => {
        window.localStorage.clear();
    };
    

    return (
       
    <div className = "navbar">
        <div className = "leftSide" id={openLinks ? "open" : "close"}>
        <label className="title"><b>Cloud Document Management System</b></label> 
            <div className="hiddenLinks">
            <Link to="/login"> Login </Link> 
            <Link to="/contact"> Contact Us </Link> 

            </div>
        </div>    
        <div className = "rightSide">
            <Link to="/login"> Login </Link> 
            <Link to="/contact"> Contact Us </Link> 
        </div>    
    </div>
);
}

export default Navbar;