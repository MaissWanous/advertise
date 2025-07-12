

// src/components/AboutUs.jsx

import React, { useState, useEffect } from 'react';
import './About.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { MdPhone } from 'react-icons/md';

import im1 from './image/im1.jpg';
import im2 from './image/im2.jpg';
import im3 from './image/im3.jpg';

export default function About() {
  const [content, setContent] = useState({
    whoWeAre: { title: '', text: '', img: '' },
    mission: { title: '', text: '', img: '' },
    contact: { title: '', text: '', img: '', phone: '' },
  });

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setContent({
      whoWeAre: {
        title: 'Who We Are',
        text:
          'Our platform connects buyers and sellers, offering a wide range of advertising opportunities. We aim to empower individuals and businesses to reach their target audience effectively.',
        img: im1,
      },
      mission: {
        title: 'Our Mission',
        text:
          'To provide a user-friendly and efficient marketplace that fosters successful advertising partnerships.',
        img: im2,
      },
      contact: {
        title: 'Contact Us',
        text:
          'Have questions or feedback? Get in touch with our support team for assistance.',
        img: im3,
        phone: '123-456-7890',
      },
    });
  }, []);

  const openFeedback = () => {
    setFeedbackSent(false);
    setFeedbackText('');
    setShowFeedbackModal(true);
  };

  const closeFeedback = () => {
    setShowFeedbackModal(false);
  };

  const submitFeedback = () => {
    if (!feedbackText.trim()) return;
    // TODO: send feedbackText to your API
    setFeedbackSent(true);
    // clear after a moment
    setTimeout(() => {
      setShowFeedbackModal(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <div className="aboutus-container">
        {/* Who We Are */}
        <div className="aboutus-card full">
          <div className="icon-circle">
            <img
              src={content.whoWeAre.img}
              alt={content.whoWeAre.title}
              className="aboutus-icon-img"
            />
          </div>
          <div className="aboutus-content">
            <h3 className="aboutus-title">{content.whoWeAre.title}</h3>
            <p className="aboutus-text">{content.whoWeAre.text}</p>
          </div>
        </div>

        {/* Mission & Contact */}
        <div className="aboutus-row">
          <div className="aboutus-card">
            <div className="icon-circle">
              <img
                src={content.mission.img}
                alt={content.mission.title}
                className="aboutus-icon-img"
              />
            </div>
            <div className="aboutus-content">
              <h3 className="aboutus-title">{content.mission.title}</h3>
              <p className="aboutus-text">{content.mission.text}</p>
            </div>
          </div>

          <div className="aboutus-card">
            <div className="icon-circle">
              <img
                src={content.contact.img}
                alt={content.contact.title}
                className="aboutus-icon-img"
              />
            </div>
            <div className="aboutus-content">
              <h3 className="aboutus-title">{content.contact.title}</h3>
              <p className="aboutus-text">{content.contact.text}</p>
              <a href={`tel:${content.contact.phone}`} className="contact-link">
                <MdPhone className="phone-icon" />
                {content.contact.phone}
              </a>
            </div>
          </div>
        </div>
{/* Report & Feedback */}
        <div className="aboutus-footer">
          <span className="report-label">Report an Issue</span>
          <button className="btn-feedback" onClick={openFeedback}>
            Send Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="feedback-modal-overlay" onClick={closeFeedback}>
          <div
            className="feedback-modal"
            onClick={e => e.stopPropagation()}
          >
            {!feedbackSent ? (
              <>
                <h3>Your Feedback</h3>
                <textarea
                  placeholder="Write your feedback..."
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                />
                <div className="modal-buttons">
                  <button
                    className="btn btn-post"
                    onClick={submitFeedback}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={closeFeedback}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="feedback-sent-message">
                ✅ Feedback sent successfully!
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}