import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Inject Bootstrap CSS via CDN (safe for demo/no SSR, self-contained SPA)
const bootstrapCdn = document.createElement("link");
bootstrapCdn.rel = "stylesheet";
bootstrapCdn.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
bootstrapCdn.integrity = "sha384-XwEiYy+C/1F9DL1UPH/oBr2AhoZHKr7ImW5a68YjkVbsCSDjunDPqgkd/kuni6sw";
bootstrapCdn.crossOrigin = "anonymous";
document.head.appendChild(bootstrapCdn);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
