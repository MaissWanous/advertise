import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Password.css';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Password = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // هنا تضع منطق التحقق / الإرسال
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div>
        <Navbar/>
   
    <div className="cp-container">
      {/* الجانب الأيسر: العنوان والنموذج */}
      <div className="cp-content">
        <h2 className="cp-title">Change Password</h2>
        <form className="cp-form" onSubmit={handleSubmit}>
          <label className="cp-label">Old Password</label>
          <input
            type="password"
            className="cp-input"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />

          <label className="cp-label">New Password</label>
          <input
            type="password"
            className="cp-input"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />

          <label className="cp-label">Confirm Password</label>
          <input
            type="password"
            className="cp-input"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
           <Link to="/profile">
          <button type="submit" className="cp-button">
            Save <FontAwesomeIcon icon={faCheck} />
          </button>
          </Link>
        </form>
      </div>

      {/* الجانب الأيمن: أيقونة القفل */}
      <div className="cp-icon">
        <FontAwesomeIcon icon={faLock} />
      </div>
    </div>
    <div>
      <Footer/>
    </div>
     </div>
  );
};

export default Password;