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

export default function Detials() {
  const [stats, setStats] = useState({
    visitors: 0,
    interactions: 0,
    followers: 0,
    comments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/statistics')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setStats({
          visitors: data.visitors,
          interactions: data.interactions,
          followers: data.followers,
          comments: data.comments
        });
      })
      .catch(() => {
        // fallback defaults:
        setStats({ visitors: 152, interactions: 20, followers: 50, comments: 8 });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="sc-loading">Loading stats…</div>;
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