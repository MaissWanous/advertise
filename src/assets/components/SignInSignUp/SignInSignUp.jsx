import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useAuth } from '../../../context/context.jsx';
import api from '../../../api/index.jsx';
import './SignInSignUp.css';
import im2 from './image/im2.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInSignUp() {
  const{token ,setToken}=useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('personal');
  const [error, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/api/login', { email: email, password: password });
   console.log(response)
      const access = response.data.data.access_token;
      setToken(access)
      console.log(access)
      localStorage.setItem(`token`, access);

      navigate('/Home');

    } catch (err) {
      const errorMessage = (err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      console.error("Login error:", err);
      setErro(errorMessage);
      console.log(errorMessage)
    }
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
   {error && <p className="text-danger text-center">{error}</p>}
    

        <button type="submit" className="login-card__submit">
          Sign in
        </button>

        <div className="login-card__footer">
          <a href="CreateAccount">Create account</a>
        </div>
      </form>
    </section>
  );
}