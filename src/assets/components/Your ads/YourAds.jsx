import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import './yourAds.css'; 
import im1 from './image/im1.jpg'; 
import im2 from './image/im2.jpg';
import Navbar from '../NavBar/NavBar'; 
import Footer from '../Footer/Footer';

const YourAds = () => {
  const navigate = useNavigate(); 
  const [ads, setAds] = useState([
    { 
      id: 1, 
      image: im1, 
      text: 'Get the opportunity of a lifetime to study in Germany! Scholarships are now available for ambitious students striving for academic excellence.', 
    },
    { 
      id: 2, 
      image: im2, 
      text: 'Discover the wonders of Canadian hospitality at our hotel chain!', 
    },
  ]);

  const handleNewAd = () => { 
    navigate('/CreateAdForm'); 
  };

  return (
    <div className="ads"> 
      <Navbar /> 

      <div className="ads__header"> 
        <h2 className="ads__title">your ads</h2> 
        <button className="adsbtn adsbtn--new" onClick={handleNewAd}>
          <FontAwesomeIcon icon={faPlus} /> new ad
        </button>
      </div>

      <div className="ads__list">
        {ads.map(ad => (
          <div key={ad.id} className="ad-item"> 
            <img src={ad.image} alt="ad" className="ad-item__img" /> 
            <p className="ad-item__text">{ad.text}</p> 
            <button className="adsbtn adsbtn--more">
              more <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default YourAds;