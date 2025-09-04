import React, { useState, useEffect } from 'react';
import {
  MdPerson,
  MdTouchApp,
  MdPersonAdd,
  MdComment
} from 'react-icons/md';
import './Detials.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../../../api';
import { useLocation } from 'react-router-dom';
import Loading from '../../loading/loading';

export default function Detials() {
  const location = useLocation();
  const { uuid } = location.state || {}; // جلب uuid من state

  const [stats, setStats] = useState({
    visitors: 0,
    interactions: 0,
    followers: 0,
    comments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) {
      console.error('❌ No UUID provided in state');
      setStats({ visitors: 152, interactions: 20, followers: 50, comments: 8 });
      setLoading(false);
      return;
    }

    api.get(`/api/adStats/${uuid}`)
      .then(res => {
        // تأكد من شكل البيانات القادمة من الباك
        const data = res.data?.data || res.data || {};
        console.log(data)
        setStats({
          visitors: data.views ?? 0,
          interactions: data.reactions_count ?? 0,
          followers: data.followers ?? 0,
          comments: data.comments_count ?? 0
        });
      })
      .catch(err => {
        console.error('❌ Error fetching stats:', err);
        // fallback defaults
        setStats({ visitors: 152, interactions: 20, followers: 50, comments: 8 });
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) {
    return <Loading/>;
  }

  const tiles = [
    {
      key: 'visitors',
      label: 'Visitors',
      value: stats.visitors,
      icon: <MdPerson />,
      color: '#0d3b66'
    },
    {
      key: 'interactions',
      label: 'Interactions',
      value: stats.interactions,
      icon: <MdTouchApp />,
      color: '#f4a742'
    },
    {
      key: 'followers',
      label: 'Followers',
      value: stats.followers,
      icon: <MdPersonAdd />,
      color: '#4caf50'
    },
    {
      key: 'comments',
      label: 'Comments',
      value: stats.comments,
      icon: <MdComment />,
      color: '#e07a5f'
    }
  ];

  return (
    <div>
      <Navbar/>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">Statistics</h2>
        <div className="dashboard-grid">
          {tiles.map(tile => (
            <div className="dashboard-tile" key={tile.key}>
              <div
                className="tile-icon-circle"
                style={{ backgroundColor: '#ffffff' }}
              >
                <span
                  className="tile-icon"
                  style={{ color: tile.color }}
                >
                  {tile.icon}
                </span>
              </div>
              <div className="tile-info">
                <span className="tile-label">{tile.label}</span>
                <span className="tile-value">{tile.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
