// src/components/Section1.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  MdStar,
  MdFavorite,
  MdFavoriteBorder,
  MdComment,
  MdBookmark,
  MdBookmarkBorder,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import './section1.css';
import im1 from './img/im1.jpg';
import im2 from './img/im2.jpg';
import logo1 from './img/logo1.jpg';
import logo2 from './img/logo22.jpg';

const initialSlides = [
  {
    id: 1,
    image: im1,
    companyLogo: logo1,
    companyName: 'NetGear Co',
    title: 'SuperFast Wireless Router X3000',
    description:
      'Ultra-speed dual-band router with 6 antennas. Perfect for home & office.',
    rating: 4.8,
    reviews: 68,
    contactPhone: '+1-234-567-8901',
    contactEmail: 'hello@reactcourse.com',
    isFollowed: false,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
  {
    id: 2,
    image: im2,
    companyLogo: logo2,
    companyName: 'SkillBoost Inc',
    title: 'Learn Programming Online',
    description:
      'Master fundamentals at your own pace with expert-led sessions and hands-on tasks.',
    rating: 4.5,
    reviews: 54,
    contactPhone: '+1-987-654-3210',
    contactEmail: 'info@skillboost.com',
    isFollowed: false,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
];

export default function Section1() {
  const [slides, setSlides] = useState(initialSlides);
  const [current, setCurrent] = useState(0);
  const [commentModalId, setCommentModalId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const prevSlide = () => {
    clearInterval(timerRef.current);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };
  const nextSlide = () => {
    clearInterval(timerRef.current);
    setCurrent((p) => (p + 1) % slides.length);
  };

  const toggleFollow = (id) => {
    setSlides((s) =>
      s.map((sl) =>
        sl.id === id ? { ...sl, isFollowed: !sl.isFollowed } : sl
      )
    );
  };
  const toggleLike = (id) => {
    setSlides((s) =>
      s.map((sl) => (sl.id === id ? { ...sl, isLiked: !sl.isLiked } : sl))
    );
  };
  const toggleBookmark = (id) => {
    setSlides((s) =>
      s.map((sl) =>
        sl.id === id ? { ...sl, isBookmarked: !sl.isBookmarked } : sl
      )
    );
  };

  const openCommentModal = (id) => {
    setCommentModalId(id);
    setCommentText('');
  };
  const closeCommentModal = () => {
    setCommentModalId(null);
  };
  const submitComment = () => {
    if (!commentText.trim()) return;
    setSlides((s) =>
      s.map((sl) =>
        sl.id === commentModalId
          ? { ...sl, comments: [...sl.comments, commentText.trim()] }
          : sl
      )
    );
    closeCommentModal();
  };

  return (
    <section className="course-ad-section">
      <h2 className="featured-title">FEATURED ADS</h2>

      <div className="slider-container">
        <div className="slider-arrow left" onClick={prevSlide}>
          <MdChevronLeft />
        </div>
        <div className="slider-viewport">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div className="course-card" key={slide.id}>
                {/* Header */}
                <div className="card-header">
                  <div className="company-badge">
                    <img
                      src={slide.companyLogo}
                      alt={slide.companyName}
                      className="badge-logo"
                    />
                    <span className="badge-name">
                      {slide.companyName}
                    </span>
                  </div>
                  <button
                    className={
                      slide.isFollowed ? 'follow-btn following' : 'follow-btn'
                    }
                    onClick={() => toggleFollow(slide.id)}
                  >
                    {slide.isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="image-wrapper">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="course-image"
                    />
                  </div>
                  <div className="info-wrapper">
                    <div className="rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <MdStar
                          key={i}
                          className={
                            i < Math.round(slide.rating)
                              ? 'star filled'
                              : 'star'
                          }
                        />
                      ))}
                      <span className="rating-value">
                        {slide.rating.toFixed(1)} ({slide.reviews})
                      </span>
                    </div>
                    <h3 className="course-title">{slide.title}</h3>
                    <p className="course-desc">{slide.description}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="card-footer">
                  <div className="actions">
                    <button
                      className="icon-btn"
                      onClick={() => toggleLike(slide.id)}
                    >
                      {slide.isLiked ? (
                        <MdFavorite className="icon filled heart" />
                      ) : (
                        <MdFavoriteBorder className="icon outline heart" />
                      )}
                    </button>

                    <button
                      className="icon-btn"
                      onClick={() => openCommentModal(slide.id)}
                    >
                      <MdComment className="icon comment-outline" />
                    </button>

                    <button
                      className="icon-btn"
                      onClick={() => toggleBookmark(slide.id)}
                    >
                      {slide.isBookmarked ? (
                        <MdBookmark className="icon filled bookmark" />
                      ) : (
                        <MdBookmarkBorder className="icon outline bookmark" />
                      )}
                    </button>
                  </div>
                  <div className="contact-info">
                    <a
                      href={`tel:${slide.contactPhone}`}
                      className="contact-link"
                    >
                      {slide.contactPhone}
                    </a>
                    <a
                      href={`mailto:${slide.contactEmail}`}
                      className="contact-link"
                    >
                      {slide.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-arrow right" onClick={nextSlide}>
          <MdChevronRight />
        </div>
      </div>

      {/* Comment Pop-Up */}
      {commentModalId !== null && (
        <div
          className="comment-modal-overlay"
          onClick={closeCommentModal}
          >
          <div
            className="comment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              Comment on{' '}
              {
                slides.find((s) => s.id === commentModalId)
                  .companyName
              }
            </h3>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
            />
            <div className="modal-buttons">
              <button
                className="btn-comment"
                onClick={submitComment}
              >
                Post
              </button>
              <button
                className="btn-cancel"
                onClick={closeCommentModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}