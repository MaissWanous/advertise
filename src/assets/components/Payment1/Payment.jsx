import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import './Payment.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../api';

export default function Payment() {
  const [method, setMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [otp, setOtp] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [showOtpFields, setShowOtpFields] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const storedAd = location.state;

  const setm = (m) => {
    setMethod(m);
    setSmsSent(false);
    setShowOtpFields(false);
    setTransactionId('');
    setOtp('');
  };

  const handlePhoneBlur = () => {
    if (phone.trim()) {
      setSmsSent(true);
    }
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/paymentCreate', {
        method: method,
        phone: parseInt(phone),
        amount: 300000
      });

      console.log('✅ Payment Create Response:', response.data);

      setTransactionId(response.data.transaction_id);

      Swal.fire({
        icon: 'success',
        title: 'Payment Initiated',
        text: 'Please enter the OTP sent to your phone to complete the payment.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });

      setShowOtpFields(true);

    } catch (err) {
      console.error('Submission error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: err.response?.data?.message || 'An unexpected error occurred. Please try again later.',
        confirmButtonText: 'Close',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    try {
      // تأكيد الدفع
      await api.post(`/api/paymentConfirm/${transactionId}`, { otp });

      // رفع الإعلان بعد الدفع
      if (storedAd) {
        const formData = new FormData();
        formData.append('title', storedAd.title || '');
        formData.append('description', storedAd.description || '');
        formData.append('price', storedAd.price || 300000);
        formData.append('status', storedAd.status || 'completed');
        formData.append('category_name', storedAd.category_name || '');

        if (storedAd.imageFiles?.length) {
          formData.append('images', storedAd.imageFiles[0]);
        }
        if (storedAd.videoFile) {
          formData.append('video_path', storedAd.videoFile);
        }

        const res = await api.post('/api/storeAd', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log('✅ Ad created:', res.data);
      }

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your ad has been created successfully.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        navigate('/home');
      });

    } catch (err) {
      console.error('Confirmation error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Confirmation Failed',
        text: err.response?.data?.message || 'Failed to confirm payment.',
        confirmButtonText: 'Close',
        confirmButtonColor: '#d33'
      });
    }
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
            className={method === 'syriatel_cash' ? 'method-btn selected' : 'method-btn'}
            onClick={() => setm('syriatel_cash')}
          >
            Syriatel Cash
          </button>
          <button
            className={method === 'mtn_cash' ? 'method-btn selected' : 'method-btn'}
            onClick={() => setm('mtn_cash')}
          >
            MTN Cash
          </button>
        </div>

        {method && (
          <form
            className="pay-form"
            onSubmit={showOtpFields ? handleConfirmPayment : handleCreatePayment}
          >
            {!showOtpFields && (
              <>
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
                    A verification code will be sent after initiating payment.
                  </p>
                )}
                <label>
                  Amount
                  <input type="text" readOnly value="300k" />
                </label>
              </>
            )}

            {showOtpFields && (
              <>
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
              </>
            )}

            <div className="buttons-row">
              <button type="submit" className="pay-btn">
                {showOtpFields ? 'Confirm Payment' : 'Pay Now'}
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
    </div>
  );
}
