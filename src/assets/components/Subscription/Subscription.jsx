import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Subscription.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // هنا يمكنك استبدال البيانات الثابتة بــ fetch من API
    setSubscriptions([
      { start: '2024/3/2', finish: '2024/4/2', payment: '300 SP' },
      { start: '2024/7/2', finish: '2024/8/2', payment: '320 SP' },
      { start: '2024/8/8', finish: '2024/9/8', payment: '480 SP' },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="subscription-container">
        <h3 className="subscription-title">your subscription dates</h3>
        <div className="subscription-body">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>start</th>
                <th>finish</th>
                <th>payment</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr key={idx}>
                  <td>{sub.start}</td>
                  <td>{sub.finish}</td>
                  <td>{sub.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* كرت التجديد الآن زر */}
          <Link to="/payment" className="renewal-card">
            <span className="renewal-text"> Renew Subscription  </span>  
            <span className="renewal-arrow">→</span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subscription;