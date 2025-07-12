// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar
} from 'recharts';
import './DashboardAdmain.css';

const DashboardAdmain = () => {
  // بيانات البطاقات العلوية
  const [stats, setStats] = useState({
    otherAdmins: 0,
    viewers: '',
    advertisers: ''
  });

  // بيانات الرسوم
  const [sectionData, setSectionData] = useState([]);
  const [accessData, setAccessData] = useState([]);
  const [profitData, setProfitData] = useState([]);

  useEffect(() => {
    // مثال: يمكنك هنا جلب البيانات عبر fetch/axios
    setStats({
      otherAdmins: 2,
      viewers: '25.3k',
      advertisers: '1.2k'
    });

    setSectionData([
      { name: 'education', value: 60 },
      { name: 'technology', value: 25 },
      { name: 'restaurants & hotels', value: 15 }
    ]);

    setAccessData([
      { day: 'Jan', value: 800 },
      { day: 'Feb', value: 2200 },
      { day: 'Mar', value: 1800 },
      { day: 'Apr', value: 2500 },
      { day: 'May', value: 2000 },
      { day: 'Jun', value: 2800 },
      { day: 'Jul', value: 3200 },
      { day: 'Aug', value: 3000 },
      { day: 'Sep', value: 3500 },
      { day: 'Oct', value: 3300 },
      { day: 'Nov', value: 3600 },
      { day: 'Dec', value: 3400 }
    ]);

    setProfitData([
      { day: 'Jan', value: 500 },
      { day: 'Feb', value: 1500 },
      { day: 'Mar', value: 3000 },
      { day: 'Apr', value: 2500 },
      { day: 'May', value: 4000 },
      { day: 'Jun', value: 3000 },
      { day: 'Jul', value: 4500 },
      { day: 'Aug', value: 4200 },
      { day: 'Sep', value: 4800 },
      { day: 'Oct', value: 4600 },
      { day: 'Nov', value: 5000 },
      { day: 'Dec', value: 4900 }
    ]);
  }, []);

  const COLORS_SEC = ['#F29E4C','#A6D8F3','#A6E1AF'];
  const gradientId = 'accessGradient';

  return (
    <div className="dashboard">
      {/* البطاقات العلوية */}
      <div className="top-cards">
        <div className="card orange">
          <span className="label">other admins</span>
          <span className="value">{stats.otherAdmins}</span>
        </div>
        <div className="card blue">
          <span className="label">viewers</span>
          <span className="value">{stats.viewers}</span>
        </div>
        <div className="card green">
          <span className="label">advertisers</span>
          <span className="value">{stats.advertisers}</span>
        </div>
        <button className="btn-add">add new admin +</button>
      </div>

      {/* الرسوم البيانية */}
      <div className="charts">
        {/* Section (Pie) */}
        <div className="chart-card">
          <h3>Section</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sectionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {sectionData.map((entry, i) => (
                  <Cell key={i} fill={COLORS_SEC[i % COLORS_SEC.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {sectionData.map((entry, i) => (
              <div key={i} className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: COLORS_SEC[i] }}
                />
                <span className="legend-label">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Access (Area) */}
        <div className="chart-card">
          <h3>Access</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={accessData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F29E4C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F29E4C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#F29E4C"
                fill={"url(#${gradientId})"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Profits (Bar) */}
        <div className="chart-card">
          <h3>Profits</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profitData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="value" fill="#A6E1AF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmain;