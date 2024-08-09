import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '../src/context/AuthContext'; // Đảm bảo đường dẫn đúng
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
