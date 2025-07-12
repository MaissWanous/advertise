

import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="logo">postly</div>
      <ul className="nav-links">
        
        <li><a href="/Home">home</a></li>
        
        <li><a href="/Profile">profile</a></li>
        <li><a href="/about">about</a></li>
      </ul>
      <div className="btn-container">
        <a href="/SignOut" className="btn-active">SIGN OUT</a>
      </div>
    </div>
  </nav>
);

export default Navbar;