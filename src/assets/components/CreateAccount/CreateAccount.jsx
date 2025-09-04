import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaLock
} from 'react-icons/fa';
import './CreateAccount.css';
import bgImage from './bgImage.jpg';
import { data, Link, useNavigate } from 'react-router-dom';
import api from '../../../api';
import Loading from '../../loading/loading';
import { useAuth } from '../../../context/context.jsx';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('personal');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const { saveToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/register', { 
        name: name,
        email: Email,
        password: password,
        account_type: userType
      });
      saveToken(res.data.data.token)
      console.log(res);
       navigate("/Home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className="create-account-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="create-account-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>

          {/* Name Field */}
          <label>
            Name
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
          </label>

          {/* Email Field */}
          <label>
            Email
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                value={Email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@example.com"
                required
              />
            </div>
          </label>
      
          {/* Password Field */}
          <label>
            Password
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </label>

          {/* Confirm Password Field */}
          <label>
            Confirm Password
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
          </label>

          {/* Account Type */}
          <div className="login-card__types">
            <label>
              <input
                type="radio"
                name="type"
                checked={userType === 'personal'}
                onChange={() => setUserType('personal')}
              />
              Personal
            </label>
            <label>
              <input
                type="radio"
                name="type"
                checked={userType === 'business'}
                onChange={() => setUserType('business')}
              />
              Business
            </label>
          </div>

          {error && <div className="error">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait…' : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  );
}
