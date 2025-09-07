import React, { useState, useCallback } from 'react';
import './ResetPassword.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../loading/loading';
import api from '../../../api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const email=location.state.email;
  const code=location.state.code;
  // حالتان لحقلين كلمة المرور وتأكيدها
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // حالة لرسالة الخطأ
  const [error, setError] = useState('');

  const[loading,setLoading]=useState(false)

  // دوال تغيير الحقول
  const handleNewPasswordChange = useCallback(e => {
    setNewPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback(e => {
    setConfirmPassword(e.target.value);
  }, []);

  // عند الضغط على زر Reset
  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    // تحقق من تطابق الحقلين
    if (newPassword !== confirmPassword) {
      setError('password and password confirmation must be identical !');
      return;
    }
    try {
      setLoading(true)
      console.log(newPassword,code,email)
      const response = await api.post('/api/reset-password-code', {
         email: email,
         code: code,
         new_password: newPassword,
         new_password_confirmation:confirmPassword
      });
      console.log(response)
      navigate("/Home")
      // setEmail('');
    } catch (err) {
      console.error(err);
      const errorMessage = (err.response?.data?.message || 'An error occurred while verifying, please try again.');
      console.error("error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
    // تفريغ الحقول وإزالة رسالة الخطأ
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  }, [newPassword, confirmPassword]);
if (loading) {
  return<Loading/>
}
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1>Create New Password</h1>
        <p>Your new password must be different from any of your previous passwords.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
         
            <button type="submit" className="btn-reset">
              Save
            </button>
        
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;