import React, { useState, useCallback } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    try {
      // مناداة API هنا لإرسال رابط إعادة التعيين
      setMessage(`تم إرسال تعليمات إعادة التعيين إ ${email}`);
      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage('حدث خطأ أثناء الإرسال. حاول مجدداً.');
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
          <Link to="/verification">
          <button type="submit" className="btn-send">
            Send Email
          </button>
          </Link>
        </form>
        {message && (
          <p className="success-message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;