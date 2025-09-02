import React from 'react';
import './Navbar.css';
import { useAuth } from '../../../context/context.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/index.jsx';

const Navbar = () => {
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');

      removeToken(); // حذف التوكن من السياق
      navigate('/signinsignUp'); // إعادة التوجيه
      console.log("log out")
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // ممكن تضيف Swal.fire هنا لو حابب تعرض رسالة خطأ
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">postly</div>
        <div className='d-flex align-items-center'>
          <ul className="nav-links">
            <li><a href="/Home">home</a></li>
            <li><a href="/Profile">profile</a></li>
            <li><a href="/about">about</a></li>
          </ul>
          <div className="btn-container">
            <button onClick={handleLogout} className="btn-active">SIGN OUT</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
