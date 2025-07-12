// UserSettings.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faPen,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import './Admain.css';
import im1 from './image/im1.jpg';

const Admain = () => {
  const [user, setUser] = useState({
    avatar: '/default-avatar.png',
    name: 'Vini Hotel Chain',
    email: 'johanad8997@gmail.com',
    phone: '+528 763284528472',
    address: 'aleppo, syria',
    password: '••••••••••••',
  });
  const [editField, setEditField] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // fetch('/api/user')...
  }, []);

  const handleAvatarClick = () => fileInputRef.current.click();
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setUser(u => ({ ...u, avatar: URL.createObjectURL(file) }));
  };

  const handleEditClick = field => setEditField(field);
  const handleBlur = () => setEditField(null);
  const handleChange = (field, value) =>
    setUser(u => ({ ...u, [field]: value }));

  const handlePasswordChange = () => {
    console.log('change password clicked');
  };

  return (
    <div className="user-settings">
      {/* sidebar */}
      <div className="div">
      <aside className="sidebar">
        <div className="avatar-wrapper">
          <img src={im1} alt="avatar" className="avatar" />
          <div className="camera-overlay" onClick={handleAvatarClick}>
            <FontAwesomeIcon icon={faCamera} color="#fff" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>
        <h2 className="username">{user.name}</h2>
        <button className="nav-button">dashboard</button>
        <button className="nav-button">your ads</button>
      </aside>
      </div>

      {/* form */}
      <section className="details-form">
        {['email', 'phone', 'address', 'password'].map(field => (
          <div key={field} className="form-field">
            <label>{field}:</label>
            <div className="input-group">
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={user[field]}
                disabled={editField !== field}
                onChange={e => handleChange(field, e.target.value)}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => handleEditClick(field)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
          </div>
        ))}

        {/* type */}
        <div className="form-field">
          <label>type:</label>
          <div className="input-group type-field">
            <FontAwesomeIcon icon={faShieldAlt} size="lg" />
          </div>
        </div>

        <button
          type="button"
          className="btn-change"
          onClick={handlePasswordChange}
        >
          change password
        </button>
      </section>
    </div>
  );
};

export default Admain;