import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Verification.css';
import Loading from '../../loading/loading';
import api from '../../../api';
import { useLocation, useNavigate } from 'react-router-dom';

const Verification = () => {
  const location=useLocation();
  const [loading, setLoading] = useState(false);
  const Email=location.state.email;
  const [message,setMessage]=useState("")
  let codeS='';
  const navigate = useNavigate();
  // حالة الخمس خانات
  const [code, setCode] = useState(Array(5).fill(''));
  // مراجع لكل input للتركيز التلقائي
  const inputsRef = useRef([]);

  // عند تغيير قيمة أي خانة
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0,1);
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    // إذا أدخل رقم وانتقل للخانة التالية
    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // عند الضغط على Backspace في خانة فارغة، نرجع التركيز للخلف
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };



  const handleSubmit = useCallback(async e => {
    e.preventDefault();
  for (let i = 0; i < code.length; i++) {
    codeS += code[i];
    
  }
    navigate('/resetPassword',{state:{email:Email,code:codeS}});
  }, []);
  if (loading) return <Loading/>;

  // إعادة إرسال الكود
  const handleResend = (e) => {
    e.preventDefault();
    console.log('Resend code requested');
    // مناداة API لإعادة الإرسال
    alert('تم إرسال الكود مجددًا إلى بريدك الإلكتروني');
    // وإعادة تهيئة الخانات
    setCode(Array(5).fill(''));
    inputsRef.current[0].focus();
  };

  

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h1>Verification</h1>
        <p>We have sent the verification code to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="code-inputs">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={el => inputsRef.current[idx] = el}
              />
            ))}
          </div>
            
          <div className="resend">
            Didn’t receive code?
        
            <a href="/resetPassword">Reset Now</a>
        
          </div>
           {message && (
          <p className="success-message">{message}</p>
        )}
          <button type="submit" className="btn-verify">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;