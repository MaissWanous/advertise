import React from 'react';
import './Start.css';
import im1 from './image/im1.jpg'; // المسار الصحيح لصورة الخلفية
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Start() {
    const navigate=useNavigate();
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${im1}) `}}
    >
      <div className="hero__overlay">
        <h1 className="hero__title">
          Post, Browse, Connect – All in One Place.
        </h1> 
        <Link to="/SignInSignUp">
        <button className="hero__btn">GET STARTED</button>
        </Link>
      </div>
    </section>
  );
}