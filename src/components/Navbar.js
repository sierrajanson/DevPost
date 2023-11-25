import React from 'react';
import './Navbar.css'
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div className="link_container">
    <li>
      <Link to="/"className="link">Home</Link>
    </li>
    <li>
      <Link to="/devpost"className="link">DevPost</Link>
    </li>
  </div>
  );
}
export default Navbar;