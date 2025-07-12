// src/components/Section.jsx
import React, { useState, useEffect } from 'react';
import {
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
  MdComment,
  MdPhone,
  MdReport
} from 'react-icons/md';
import './Section.css';
import routerImg from './image/routerImg.jpg';
import routerImg2 from './image/routerImg2.jpg';
import av5 from './image/av5.jpg';
import av6 from './image/av6.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Section() {
  const [ads, setAds] = useState([]);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [draftComment, setDraftComment] = useState('');

  useEffect(() => {
    fetch('/api/favourite-ads')
      .then(res => res.json())
      .then(data => setAds(data.slice(0, 2)))
      .catch(() => {
        setAds([
          {
            id: 1,
            userName: 'Ahmad naeem',
            userAvatar: av5,
            img: routerImg,
            title: 'Wireless Router and Switch',
            desc:
              'Dual-band 802.11ac Wi-Fi router with four Gigabit Ethernet ports. Supports MU-MIMO technology.',
            phone: '123-456-7890',
            isFollowed: false,
            isBookmarked: false,
            isLiked: false
          },
          {
            id: 2,
            userName: 'Sami masri',
            userAvatar: av6,
            img: routerImg2,
            title:
              'Meet Your New Smart Robot Vacuum—Effortless Cleaning at the Push of a Button!',
            desc:
              'Glides silently under furniture with powerful suction and long-lasting battery life, so your floors stay spotless—no effort required.',
            phone: '123-456-7890',
            isFollowed: false,
            isBookmarked: false,
            isLiked: false
          }
        ]);
      });
  }, []);

  const handleFollow = id =>
    setAds(ads.map(a => (a.id === id ? { ...a, isFollowed: !a.isFollowed } : a)));

  const handleBookmark = id =>
    setAds(ads.map(a => (a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a)));

  const handleLike = id =>
    setAds(ads.map(a => (a.id === id ? { ...a, isLiked: !a.isLiked } : a)));

  const handleReport = () => {
    alert('تم الإبلاغ عن هذا المحتوى');
  };

  const openComment = id => {
    setActiveCommentId(id);
    setDraftComment('');
  };
  const closeComment = () => setActiveCommentId(null);

  const postComment = () => {
    console.log('comment for', activeCommentId, draftComment);
    closeComment();
  };

  return (
    <>
      <Navbar />

      <div className="fav-page">
        <h1 className="fav-header">TECHNOLOGY ADS SECTION</h1>
        <div className="fav-cards">
          {ads.map(ad => (
            <div key={ad.id} className="fav-card">
              {/* avatar + name above image */}
              <div className="fav-user-block">
                <img src={ad.userAvatar} alt={ad.userName} className="fav-avatar" />
                <span className="fav-username">{ad.userName}</span>
              </div>

              {/* Follow tag top-right */}
              <div
                className={
                  ad.isFollowed ? 'fav-tag fav-tag--active' : 'fav-tag fav-tag--inactive'
                }
                onClick={() => handleFollow(ad.id)}
              >
                {ad.isFollowed ? 'Following' : 'Follow'}
              </div>

              <img src={ad.img} alt={ad.title} className="fav-image" />
              <div className="fav-details">
                <h2 className="fav-title">{ad.title}</h2>
                <div className="fav-stars">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>⭐️</span>
                    ))}
                </div>
                <p className="fav-desc">{ad.desc}</p>
                <div className="fav-footer">
                  {/* actions first */}
                  <div className="fav-actions">
                    <button className="fav-btn" onClick={() => handleBookmark(ad.id)}>
                      {ad.isBookmarked ? (
                        <MdBookmark className="fav-icon fav-icon--filled" />
                      ) : (
                        <MdBookmarkBorder className="fav-icon fav-icon--outline" />
                      )}
                    </button>
                    <button className="fav-btn" onClick={() => handleLike(ad.id)}>
                      {ad.isLiked ? (
                        <MdFavorite className="fav-icon fav-icon--filled" />
                      ) : (
                        <MdFavoriteBorder className="fav-icon fav-icon--outline" />
                      )}
                    </button>
                    <button className="fav-btn" onClick={() => openComment(ad.id)}>
                      <MdComment className="fav-icon fav-icon--outline" />
                    </button>
                    <button className="fav-btn" onClick={handleReport}>
                      <MdReport className="fav-icon fav-icon--report-outline" />
                    </button>
                  </div>

                  {/* contact info */}
                  <div className="fav-contact">
                    <MdPhone className="fav-icon-phone" />
                    <a href={`tel:${ad.phone}`} className="fav-contact-number">
                      {ad.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCommentId && (
        <div className="comment-pane-overlay" onClick={closeComment}>
          <div className="comment-pane" onClick={e => e.stopPropagation()}>
            <textarea
              className="comment-input"
              placeholder="Write your comment..."
              value={draftComment}
              onChange={e => setDraftComment(e.target.value)}
            />
            <button className="comment-btn-post" onClick={postComment}>
              Post Comment
            </button>
            <button className="comment-btn-cancel" onClick={closeComment}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}