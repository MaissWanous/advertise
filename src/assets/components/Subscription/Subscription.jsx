import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Subscription.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../../../api';
import Loading from '../../loading/loading.jsx'; // مكون التحميل إذا موجود

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات افتراضية في حال فشل الجلب
  const fallbackSubscriptions = [
    { start_date: '2024/3/2', end_date: '2024/4/2', payment: '300 SP' },
    { start_date: '2024/7/2', end_date: '2024/8/2', payment: '320 SP' },
    { start_date: '2024/8/8', end_date: '2024/9/8', payment: '480 SP' },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await api.get("/api/subscriptionDetails");
        const data = res.data?.data || res.data || [];

        if (Array.isArray(data) && data.length > 0) {
          setSubscriptions(data);
        } else {
          setSubscriptions(fallbackSubscriptions);
        }
      } catch (error) {
        console.error('❌ Error fetching subscriptions:', error);
        setSubscriptions(fallbackSubscriptions);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="subscription-container">
        <h3 className="subscription-title">Your Subscription Dates</h3>
        <div className="subscription-body">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr key={idx}>
                  <td>{sub.start_date}</td>
                  <td>{sub.end_date}</td>
                  <td>{sub.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* زر التجديد */}
          <Link to="/payment" className="renewal-card">
            <span className="renewal-text">Renew Subscription</span>
            <span className="renewal-arrow">→</span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subscription;
