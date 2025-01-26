// src/main.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Wrap App with BrowserRouter here */}
    <App />
  </BrowserRouter>
);
