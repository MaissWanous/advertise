import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './SignOut.css';
import bgImage from './bgImage.jpg';

export default function SignOut() {
  const [fullName, setFullName] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      if (!res.ok) throw new Error('Signup failed');
      // TODO: تعامل مع الاستجابة هنا
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup-page"
      style={{ backgroundImage:` url(${bgImage})` }}
    >
      <div className="signup-card">
        <h1>Sign Out</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <div className="input-wrapper">
              <FaUser className="icon" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Email
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Password
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait…' : 'Sign Out'}
          </button>
        </form>
        <a href="CreateAccount" className="footer-text">
          Already have an account?
        </a>
      </div>
    </div>
  );
}