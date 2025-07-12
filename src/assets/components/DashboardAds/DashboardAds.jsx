
import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar
} from 'recharts';
import './DashboardAds.css';
import im1 from './image/im1.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const DashboardAds = () => {
  // حالة البيانات
  const [metrics, setMetrics] = useState({
    visitsToday: 0,
    yourAds: 0,
    followers: 0
  });
  const [audienceData, setAudienceData] = useState([]);
  const [accessData, setAccessData] = useState([]);
  const [interactionData, setInteractionData] = useState([]);

  // عند التحميل، مثلاً تجلب البيانات من API
  useEffect(() => {
    // هنا يمكن استدعاء fetch/axios لجلب البيانات الحقيقية
    setMetrics({ visitsToday: 129, yourAds: 56, followers: 129 });
    setAudienceData([
      { name: 'inside', value: 80 },
      { name: 'outside', value: 20 }
    ]);
    setAccessData([
      { day: 'Mon', value: 1000 },
      { day: 'Tue', value: 2000 },
      { day: 'Wed', value: 1800 },
      { day: 'Thu', value: 2200 },
      { day: 'Fri', value: 1500 },
      { day: 'Sat', value: 2500 },
      { day: 'Sun', value: 2000 }
    ]);
    setInteractionData([
      { day: 'Mon', value: 700 },
      { day: 'Tue', value: 1800 },
      { day: 'Wed', value: 2500 },
      { day: 'Thu', value: 1200 },
      { day: 'Fri', value: 3000 },
      { day: 'Sat', value: 900 },
      { day: 'Sun', value: 2700 }
    ]);
  }, []);

  // ألوان الرسم الدائري
  const COLORS = ['#2F5061', '#A6E1FA'];

  return (
    <div>
      <Navbar />

      <div className="dashboard">
        {/* الهيدر */}
        <header className="dashboard-header">
          <div className="stats">
            <div className="stat-item">
              <span className="label">visits for today</span>
              <span className="value">{metrics.visitsToday}</span>
            </div>
            <div className="stat-item">
              <span className="label">your ads</span>
              <span className="value">{metrics.yourAds}</span>
            </div>
            <div className="stat-item">
              <span className="label">followers</span>
              <span className="value">{metrics.followers}</span>
            </div>
          </div>
          <div className="header-illustration">
            {/* صورة أو SVG */}
            <img className="img" src={im1} alt="Illustration" />
          </div>
        </header>

        {/* المحتوى الرئيسي */}
        <div className="dashboard-content">
          {/* بطاقة الجمهور */}
          <div className="card">
            <h3>Audience</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={audienceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="legend">
              {audienceData.map((entry, idx) => (
                <div key={idx} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ background: COLORS[idx] }}
                  />
                  <span className="legend-label">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* بطاقة الوصول */}
          <div className="card">
            <h3>Access</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={accessData}>
                <defs>
                  <linearGradient id="colorAccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F5061" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2F5061" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2F5061"
                  fill="url(#colorAccess)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* بطاقة التفاعل */}
          <div className="card">
            <h3>Interaction</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={interactionData}>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="value" fill="#2F5061" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardAds;