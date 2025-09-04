import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5177239b4f74.ngrok-free.app',
  headers: {
     'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true', // bypass ngrok’s browser interstitial
  },
});

// Ensure proper header casing and token usage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;