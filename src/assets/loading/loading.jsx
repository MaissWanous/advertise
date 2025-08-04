// Loading.jsx
import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p className="loading-text">Just a moment...</p>
    </div>
  );
}
