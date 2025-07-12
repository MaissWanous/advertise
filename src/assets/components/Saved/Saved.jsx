import React, { useState, useEffect } from 'react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import './Saved.css';
import headphonesImg from './image/headphones.jpg';
import smartwatchImg from './image/im2.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Saved() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('/api/saved-ads')
      .then(res => res.json())
      .then(data => setAds(data.slice(0, 2)))
      .catch(() => {
        setAds([
          {
            id: 1,
            img: headphonesImg,
            title: 'Noise-Cancelling Headphones',
            desc: 'Experience immersive sound with our top-rated noise-cancelling headphones.',
            saved: true
          },
          {
            id: 2,
            img: smartwatchImg,
            title: 'Smartwatch with Heart Rate Monitor',
            desc: 'Track your health and fitness with advanced heart rate monitoring.',
            saved: true
          }
        ]);
      });
  }, []);

  const toggleSave = id => {
    setAds(ads.map(ad =>
      ad.id === id ? { ...ad, saved: !ad.saved } : ad
    ));
    // TODO: persist change via API
  };

  return (
    <>
      <Navbar/>
      <div className="zx-page">
        <header className="zx-header">
          <h1>Saved Ads</h1>
        </header>

        <ul className="zx-list">
          {ads.map(ad => (
            <li key={ad.id} className="zx-item">
              <img src={ad.img} alt={ad.title} className="zx-img" />
              <div className="zx-content">
                <h2 className="zx-title">{ad.title}</h2>
                <p className="zx-text">{ad.desc}</p>
              </div>
              <button
                className="zx-btn"
                onClick={() => toggleSave(ad.id)}
              >
                {ad.saved
                  ? <MdBookmark className="zx-icon zx-icon--on" />
                  : <MdBookmarkBorder className="zx-icon zx-icon--off" />
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </>
  );
}