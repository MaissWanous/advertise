import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import './LogIn.css';
import im1 from './image/im1.jpg'; // ← ضع هنا مسار الخلفية
import {Link} from 'react-router-dom';
export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
    // اربط الـ API هنا
  };

  return (
    <section
      className="hero-section"
      style={{ backgroundImage:` url(${im1})` }}
    >
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">LOG IN</h2>

        <div className="form-group">
          <label className="form-label">Email address</label>
          <div className="input-wrapper">
            <MdEmail className="input-icon" />
            <input
              className="input-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <MdLock className="input-icon" />
            <input
              className="input-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="forgotPassword" className="form-forgot">
            Forgot password?
          </a>
        </div>
               <Link to="/Home">
        <button type="submit" className="btn-submit">
          Log in
        </button>
        </Link>

        <div className="form-footer">
          <a href="CreateAccount">Create account</a>
        </div>
      </form>
    </section>
  );
}