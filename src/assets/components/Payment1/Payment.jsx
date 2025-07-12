// src/components/Payment.jsx
import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [method, setMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [otp, setOtp] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const chooseMethod = (m) => {
    const generatedId = 'TX-' + Date.now().toString(36).toUpperCase();
    setMethod(m);
    setTransactionId(generatedId);
    setSmsSent(false);
    setSuccess(false);
  };

  const handlePhoneBlur = () => {
    if (phone.trim()) {
      setSmsSent(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  const closeSuccess = () => {
    setSuccess(false);
    navigate(-1);
  };

  return (
    <div className="pay-page">
      <div className="pay-card">
        <h1 className="pay-title">Payment</h1>
        <p className="pay-sub">
          Subscription: <strong>Monthly 300k</strong>
        </p>

        <div className="pay-methods">
          <button
            className={method === 'syratel' ? 'method-btn selected' : 'method-btn'}
            onClick={() => chooseMethod('syratel')}
          >
            Syriatel Cash
          </button>
          <button
            className={method === 'mtn' ? 'method-btn selected' : 'method-btn'}
            onClick={() => chooseMethod('mtn')}
          >
            MTN Cash
          </button>
        </div>

        {method && (
          <form className="pay-form" onSubmit={handleSubmit}>
            <label>
              Mobile Number
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handlePhoneBlur}
                placeholder="09XXXXXXXX"
              />
            </label>
            {smsSent && (
              <p className="sms-note">
                A verification code has been sent via SMS.
              </p>
            )}

            <label>
              Amount
              <input type="text" readOnly value="300k" />
            </label>

            <label>
              Transaction ID
              <input type="text" readOnly value={transactionId} />
            </label>

            <label>
              OTP
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </label>

            <div className="buttons-row">
              <button type="submit" className="pay-btn">
                Pay Now
              </button>
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft /> Back
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Success Modal */}
      {success && (
        <div className="success-overlay">
          <div className="success-modal">
            <h2>Payment Successful!</h2>
            <p>Your transaction has been completed.</p>
            <button onClick={closeSuccess} className="success-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}