// src/index.js
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Set the base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:8080'; // Replace with your backend URL

// Intercept requests to include JWT token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
