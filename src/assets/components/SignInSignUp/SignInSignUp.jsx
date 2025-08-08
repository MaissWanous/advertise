import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useAuth } from '../../../context/context.jsx';
import api from '../../../api/index.jsx';
import './SignInSignUp.css';
import im2 from './image/im2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Loading from "../../loading/loading.jsx";


export default function SignInSignUp() {
  const { saveToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('personal')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/login', { email, password
        // , account_type:userType
       });
      const access = response.data?.data?.access_token;

      if (access) {
        saveToken(access);
        navigate('/Home');
      } else {
        throw new Error('Access token not found.');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <section className="login-hero" style={{ backgroundImage: `url(${im2})` }}>
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-card__title">SIGN IN</h2>

        <label className="login-card__label">
          Email address
          <div className="login-card__field">
            <MdEmail className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/forgotPassword" className="forgot-link">Forgot password?</Link>
        </label>
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

        {error && <p className="text-danger text-center">{error}</p>}

        <button type="submit" className="login-card__submit">
          Sign in
        </button>

        <div className="login-card__footer">
          <Link to="/CreateAccount">Create account</Link>
        </div>
      </form>
    </section>
  );
}
