import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure you have an index.css for global styles
import App from './App';
import reportWebVitals from './reportWebVitals'; // If you're using create-react-app's built-in performance measurements

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you're using the optional reportWebVitals to measure performance (only necessary if you care about this)
reportWebVitals();
