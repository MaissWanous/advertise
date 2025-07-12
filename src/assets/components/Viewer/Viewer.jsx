import React, { useState } from 'react';
import './Viewer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCamera } from '@fortawesome/free-solid-svg-icons';
import im1 from './image/im1.jpg'

const Viewer = () => {
  const [profile, setProfile] = useState({
    email: 'johanad8997@gmail.com',
    phone: '+528 763284528472',
    address: 'homs , syria',
    password: 'johanad8997@gmail.com',
  });

  const handleEdit = (field) => {
    const newValue = prompt(`Enter new  $ +{field}:, profile[field]`);
    if (newValue !== null) {
      setProfile(prev => ({ ...prev, [field]: newValue }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-image">
          <img src={im1} alt="User" />
          <span className="camera-icon">
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>
        <h3 className="profile-name">John Admas</h3>
      </div>
      <div className="profile-right">
        {['email', 'phone', 'address', 'password'].map((field) => (
          <div className="profile-field" key={field}>
            <label>{field} :</label>
            <input type="text" value={profile[field]} readOnly />
            <button className="edit-btn" onClick={() => handleEdit(field)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>
        ))}
        <div className="profile-type">
          <label>type:</label>
          <span className="viewer-type">viewer</span>
        </div>
        <button className="change-password-btn">change password</button>
      </div>
    </div>
  );
};

export default Viewer;