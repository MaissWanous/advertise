// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* ABOUT */}
        <div className="footer__section">
          <h3 className="footer__heading">About</h3>
          <ul className="footer__list">
            <li><a href="/about">About Us</a></li>
            <li><a href="/story">Our Story</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>
        {/* SUPPORT */}
        <div className="footer__section">
          <h3 className="footer__heading">Support</h3>
          <ul className="footer__list">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        {/* SOCIAL */}
        <div className="footer__section">
          <h3 className="footer__heading">Social</h3>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className='div'></div>
      <div className="footer__bottom">
        © {year} Your Company
      </div>
    </footer>
);
}