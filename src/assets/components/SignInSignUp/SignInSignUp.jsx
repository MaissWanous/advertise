import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import './SignInSignUp.css';
import im2 from './image/im2.jpg'; // ← استبدل بمسار صورتك
import { Link } from 'react-router-dom';

export default function SignInSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('personal');

  const handleTypeClick = (type) => setUserType(type);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, userType });
    // اربط الـ API هنا
  };

  return (
    <section
      className="login-hero"
      style={{ backgroundImage: `url(${im2})` }}
    >
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-card__title">SIGN IN</h2>

        <label className="login-card__label">
          Email address
          <div className="login-card__field">
            <MdEmail className="icon" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </label>

        <label className="login-card__label">
          Password
          <div className="login-card__field">
            <MdLock className="icon" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="/forgotPassword" className="forgot-link">
            Forgot password?
          </a>
        </label>

        <div className="login-card__types">
          <label>
            <input 
              type="radio" 
              name="type" 
              checked={userType==='personal'} 
              onChange={() => handleTypeClick('personal')} 
            />
            Personal
          </label>
          <label>
            <input 
              type="radio" 
              name="type" 
              checked={userType==='business'} 
              onChange={() => handleTypeClick('business')} 
            />
            Business
          </label>
        </div>

        {/* Sign in button */}
        <Link to="/Home">
          <button type="submit" className="login-card__submit">
            Sign in
          </button>
        </Link>

        {/* New Login button */}
            <Link to="/LogIn">
        <button 
          type="button" 
          className="login-card__login"
          onClick={() => console.log('Login clicked')}
        >
          Log in
        </button>
            </Link>
        <div className="login-card__footer">
          <a href="CreateAccount">Create account</a>
        </div>
      </form>
    </section>
  );
}