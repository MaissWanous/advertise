import React, { useState, useCallback } from 'react';
import './ResetPassword.css';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  // حالتان لحقلين كلمة المرور وتأكيدها
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // حالة لرسالة الخطأ
  const [error, setError] = useState('');

  // دوال تغيير الحقول
  const handleNewPasswordChange = useCallback(e => {
    setNewPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback(e => {
    setConfirmPassword(e.target.value);
  }, []);

  // عند الضغط على زر Reset
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // تحقق من تطابق الحقلين
    if (newPassword !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    // هنا من المفترض مناداة API لإرسال الطلب
    alert(`تم إعادة تعيين كلمة المرور إلى: ${newPassword}`);
    // تفريغ الحقول وإزالة رسالة الخطأ
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  }, [newPassword, confirmPassword]);

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
          <Link to="/Home">
          <button type="submit" className="btn-reset">
            Save
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;