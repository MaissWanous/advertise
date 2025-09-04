import React, { useState, useEffect } from 'react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import './Saved.css';
import headphonesImg from './image/headphones.jpg';
import smartwatchImg from './image/im2.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../../../api';
import Loading from '../../loading/loading.jsx'; // إذا عندك مكون تحميل

export default function Saved() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // البيانات الافتراضية
  const fallbackAds = [
    {
      uuid: 1,
      image_url: headphonesImg,
      title: 'Noise-Cancelling Headphones',
      description: 'Experience immersive sound with our top-rated noise-cancelling headphones.',
      saved: true
    },
    {
      uuid: 2,
      image_url: smartwatchImg,
      title: 'Smartwatch with Heart Rate Monitor',
      description: 'Track your health and fitness with advanced heart rate monitoring.',
      saved: true
    }
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/api/favorites');
        const data = res.data.data || res.data || [];
        setAds(data);
      } catch (error) {
        console.error(' Error fetching favorites:', error);
        setAds(fallbackAds); // إذا صار خطأ، نعرض البيانات الافتراضية
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleSave = async (uuid) => {
      setAds(prev =>
        prev.map(ad =>
          ad.uuid === uuid ? { ...ad, saved: !ad.saved } : ad
        )
      );
    
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="zx-page">
        <header className="zx-header">
          <h1>Saved Ads</h1>
        </header>

        <ul className="zx-list">
          {ads.map(ad => (
            <li key={ad.uuid} className="zx-item">
              <img src={ad.image_url} alt={ad.title} className="zx-image_url" />
              <div className="zx-content">
                <h2 className="zx-title">{ad.title}</h2>
                <p className="zx-text">{ad.description}</p>
              </div>
              <button
                className="zx-btn"
                onClick={() => toggleSave(ad.uuid)}
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
      <Footer />
    </>
  );
}
