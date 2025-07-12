import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaLock
} from 'react-icons/fa';
import './CreateAccount.css';
import bgImage from './bgImage.jpg';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password })
      });
      if (!res.ok) throw new Error('Failed to create account');
      // TODO: التعامل مع الاستجابة
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="create-account-page"
      style={{ backgroundImage:` url(${bgImage})` }}
    >
      <div className="create-account-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
          </label>
          <label>
            Email
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </label>
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
          {error && <div className="error">{error}</div>}
          <Link to="/Home">
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait…' : 'Create Account'}
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}