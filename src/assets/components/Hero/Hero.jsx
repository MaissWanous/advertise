import React from 'react';
import './Hero.css';
import {Link} from 'react-router-dom';

const Hero = () => (
  <div className="poster-container">
    <div className="poster-overlay">
      <h1 className="poster-text">
        POST YOUR AD.<br />
        REACH THOUSANDS<br />
        INSTANTLY!
      </h1>
      <Link to="/CreateAdForm">
      <button className="poster-button">Add Ad</button>
      </Link>
    </div>
  </div>
);

export default Hero;