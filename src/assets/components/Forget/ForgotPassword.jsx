import React, { useState, useCallback } from 'react';
import './ForgotPassword.css';
import {  useNavigate } from 'react-router-dom';
import api from '../../../api/index.jsx';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
   const navigate = useNavigate();

  const handleChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    try {
       const response = await api.post('/api/reset-password', { email: email });
       console.log(response)
      setMessage(`Reset instruction have been sent to ${email}`);
        navigate('/verification');
    
      setEmail('');
    } catch (err) {
      console.error(err);
       const errorMessage = (err.response?.data?.message || 'An error occurred while sending the message, please try again.');
      console.error("error:", err);
      setMessage(errorMessage);
    }
  }, [email]);

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <p>
          Enter the email address you used to create the account,
          and we will email you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn-send">
            Send Email
          </button>
         
        </form>
        {message && (
          <p className="success-message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;