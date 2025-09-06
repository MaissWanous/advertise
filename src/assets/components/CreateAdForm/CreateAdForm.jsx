import React, { useState, useRef, useEffect, useCallback } from 'react';
import api from '../../../api/index.jsx';
import { useAuth } from '../../../context/context.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlayCircle, FaImages, FaSlidersH, FaChevronDown } from 'react-icons/fa';
import './CreateAdForm.css';
import Swal from 'sweetalert2';

export default function CreateAdForm() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [sectionOpen, setSectionOpen] = useState(false);
  const [section, setSection] = useState('Select Section');
  const [categories, setCategories] = useState([]);

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
  const dropdownRef = useRef();

  // جلب التصنيفات من API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/category', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setCategories(res.data.data || res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, [token]);

  const handleVideoClick = () => videoInputRef.current.click();
  const handleImagesClick = () => imagesInputRef.current.click();
  const handleSliderClick = () => sliderInputRef.current.click();

  const handleVideoChange = e => setVideoFile(e.target.files[0] || null);
  const handleImagesChange = e => setImageFiles(Array.from(e.target.files));
  const handleSliderChange = e => {
    const files = Array.from(e.target.files);
    setSliderFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...files];
      if (prevFiles.length === 0) setSliderIndex(0);
      return updatedFiles;
    });
  };

  const showPrev = () =>
    setSliderIndex(i => (sliderFiles.length ? (i - 1 + sliderFiles.length) % sliderFiles.length : 0));
  const showNext = () =>
    setSliderIndex(i => (sliderFiles.length ? (i + 1) % sliderFiles.length : 0));

  const handleCreateClick = e => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handlePay = () => {
    setShowAlert(false);
    navigate('/payment', {
      state: {
        title,
        description,
        price: 300000,
        category_name: section,
        imageFiles,
        videoFile:"......"
      }
    });
  };

  const handleSkip = async () => {
    setShowAlert(false);
    try {
      const formData = new FormData();
      formData.append('title', title || '');
      formData.append('description', description || '');
      formData.append('price', 0);
      formData.append('category_name', section); 
      if (imageFiles.length > 0) {
        formData.append('images', imageFiles[0]);
      }
     
        formData.append('video_path', ".....");
      

      const response = await api.post('/api/storeAds', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('ok', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Ad submitted!',
        text: 'Your ad has been successfully saved.',
      });
    } catch (err) {
      console.error('Submission error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: err.response?.data?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setImageFiles([]);
    setSliderFiles([]);
    setSliderIndex(0);
    setShowAlert(false);
  };

  const onClickOutside = useCallback(e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setSectionOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClickOutside]);

  return (
    <div className="create-ad-page">
      <Link to="/Home">
        <button className="back-button">← Back</button>
      </Link>

      <div className="create-ad-container">
        <div className="left-panel">
          {/* Dropdown */}
          <div className="section-dropdown" ref={dropdownRef}>
            <button className="section-btn" onClick={() => setSectionOpen(o => !o)}>
              {section} <FaChevronDown className="dd-icon" />
            </button>
            {sectionOpen && (
              <ul className="section-menu">
                {categories.map(cat => (
                  <li
                    key={cat.id || cat.name}
                    className="section-item"
                    onClick={() => {
                      setSection(cat.name);
                      setSectionOpen(false);
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Preview */}
          <div className="preview-box">
            {sliderFiles.length > 0 ? (
              <>
                <button className="nav left" onClick={showPrev}>《</button>
                <img src={URL.createObjectURL(sliderFiles[sliderIndex])} alt="" className="media-preview" />
                <button className="nav right" onClick={showNext}>》</button>
              </>
            ) : videoFile ? (
              <video src={URL.createObjectURL(videoFile)} controls className="media-preview" />
            ) : imageFiles.length > 0 ? (
              <img src={URL.createObjectURL(imageFiles[0])} alt="" className="media-preview" />
            ) : (
              <div className="media-placeholder">Preview</div>
            )}
          </div>

          {/* Upload buttons */}
          <div className="cards-row">
            <div className="card" onClick={handleVideoClick}>
              <FaPlayCircle className="card-icon" />
              <input type="file" accept="video/*" ref={videoInputRef} hidden onChange={handleVideoChange} />
              <span>Add Video</span>
            </div>
            <div className="card" onClick={handleImagesClick}>
              <FaImages className="card-icon" />
              <input type="file" accept="image/*" multiple ref={imagesInputRef} hidden onChange={handleImagesChange} />
              <span>Single Image</span>
            </div>
            <div className="card" onClick={handleSliderClick}>
              <FaSlidersH className="card-icon" />
              <input type="file" accept="image/*" multiple ref={sliderInputRef} hidden onChange={handleSliderChange} />
              <span>Image Slider</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <h1>Create Ad</h1>
          <form>
            <label>
              Title
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </label>
            <label>
              Description
              <textarea value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <button onClick={handleCreateClick}>Create Ad</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>

      {showAlert && (
        <div className="alert-modal-overlay">
          <div className="alert-modal">
            <p>Your ad will be deleted after 12 hours if you do not complete the payment.</p>
            <div className="modal-buttons">
              <button className="btn-pay" onClick={handlePay}>Pay</button>
              <button className="btn-pay" onClick={handleSkip}>Add without pay</button>
              <button className="btn-skip" onClick={handleCancel}>
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}