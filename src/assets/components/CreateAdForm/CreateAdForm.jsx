
import React, { useState, useRef, useEffect, useCallback } from 'react';

<<<<<<< HEAD
import api from '../../../api/index.jsx';
import { useAuth } from '../../../context/context.jsx';

=======

import api from '../../../api/index.jsx';
import { useAuth } from '../../../context/context.jsx';
>>>>>>> e7b94b2661a6036d96c22d3cb55bb1ea85329ec8
import { useNavigate, Link } from 'react-router-dom';
import {
  FaPlayCircle,
  FaImages,
  FaSlidersH,
  FaChevronDown
} from 'react-icons/fa';
import './CreateAdForm.css';

export default function CreateAdForm() {
  const navigate = useNavigate();
<<<<<<< HEAD
=======

>>>>>>> e7b94b2661a6036d96c22d3cb55bb1ea85329ec8

  const [sectionOpen, setSectionOpen] = useState(false);
  const [section, setSection] = useState('Select Section');

<<<<<<< HEAD
=======

>>>>>>> e7b94b2661a6036d96c22d3cb55bb1ea85329ec8
  const{token }=useAuth()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [sliderFiles, setSliderFiles] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const videoInputRef = useRef();
  const imagesInputRef = useRef();
  const sliderInputRef = useRef();

  const handleVideoClick = () => videoInputRef.current.click();
  const handleImagesClick = () => imagesInputRef.current.click();
  const handleSliderClick = () => sliderInputRef.current.click();

  const handleVideoChange = e => setVideoFile(e.target.files[0] || null);
  const handleImagesChange = e => setImageFiles(Array.from(e.target.files));
  const handleSliderChange = e => {
    const files = Array.from(e.target.files);
    setSliderFiles(files);
    setSliderIndex(0);
  };

  const showPrev = () =>
    setSliderIndex(i =>
      sliderFiles.length ? (i - 1 + sliderFiles.length) % sliderFiles.length : 0
    );
  const showNext = () =>
    setSliderIndex(i =>
      sliderFiles.length ? (i + 1) % sliderFiles.length : 0
    );

  const handleCreateClick = e => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handlePay = () => {
    setShowAlert(false);
    navigate('/payment');
  };

  const  handleSkip =async () => {
    setShowAlert(false);
      
    try {
      const response = await api.post('/api/storeAd', {
        title:title,
    description:description,
    price:"",
    "status":"pending",
    video_path:videoFile,
    "categories_id":"1"
        
        }, {
                    headers: { authorization: 'Bearer ' + token }
                });
   
    } catch (err) {
      const errorMessage = (err.response?.data?.message );
      console.error("Login error:", err);
    
      console.log(errorMessage)
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setImageFiles([]);
    setSliderFiles([]);
    setSliderIndex(0);
  };

  // Close dropdown on outside click
  const dropdownRef = useRef();
  const onClickOutside = useCallback(
    e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSectionOpen(false);
      }
    },
    [dropdownRef]
  );
  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClickOutside]);

  return (
    <div className="create-ad-page">
      {/* Back button */}
      <Link to="/Home">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </Link>

      <div className="create-ad-container">
        <div className="left-panel">
          {/* Section dropdown */}
          <div className="section-dropdown" ref={dropdownRef}>
            <button
              className="section-btn"
              onClick={() => setSectionOpen(open => !open)}
            >
              {section} <FaChevronDown className="dd-icon" />
            </button>
            {sectionOpen && (
              <ul className="section-menu">
                {['Restaurant', 'Travel', 'Education', 'Technology'].map(opt => (
                  <li
                    key={opt}
                    className="section-item"
                    onClick={() => {
                      setSection(opt);
                      setSectionOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="preview-box">
            {sliderFiles.length > 0 ? (
              <>
                <button className="nav left" onClick={showPrev}>

                《
                </button>
                <img
                  src={URL.createObjectURL(sliderFiles[sliderIndex])}
                  alt=""
                  className="media-preview"
                />
                <button className="nav right" onClick={showNext}>
                  》
                </button>
              </>
            ) : videoFile ? (
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="media-preview"
              />
            ) : imageFiles.length > 0 ? (
              <img
                src={URL.createObjectURL(imageFiles[0])}
                alt=""
                className="media-preview"
              />
            ) : (
              <div className="media-placeholder">Preview</div>
            )}
          </div>

          <div className="cards-row">
            <div className="card" onClick={handleVideoClick}>
              <FaPlayCircle className="card-icon" />
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                hidden
                onChange={handleVideoChange}
              />
              <span>Add Video</span>
            </div>
            <div className="card" onClick={handleImagesClick}>
              <FaImages className="card-icon" />
              <input
                type="file"
                accept="image/*"
                multiple
                ref={imagesInputRef}
                hidden
                onChange={handleImagesChange}
              />
              <span>Single Image</span>
            </div>
            <div className="card" onClick={handleSliderClick}>
              <FaSlidersH className="card-icon" />
              <input
                type="file"
                accept="image/*"
                multiple
                ref={sliderInputRef}
                hidden
                onChange={handleSliderChange}
              />
              <span>Image Slider</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <h1>Create Ad</h1>
          <form>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </label>
            <button onClick={handleCreateClick}>Create Ad</button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {showAlert && (
        <div className="alert-modal-overlay">
          <div className="alert-modal">
            <p>
              Your ad will be deleted after 12 hours if you do not complete the
              payment.
            </p>
            <div className="modal-buttons">
              <Link to="/payment">
                <button className="btn-pay" onClick={handlePay}>
                  Pay
                </button>
              </Link>
              <button className="btn-skip" onClick={handleSkip}>
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}