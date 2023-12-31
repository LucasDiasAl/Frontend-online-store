/* eslint-disable max-len */
import React from 'react';
import './loadingSVG.css';

function LoadingSVG() {
  return (
    // <!-- License: MIT. Made by Lucide Contributors: https://lucide.dev/ -->
    <div className="loading__SVG">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader">
        <line x1="12" x2="12" y1="2" y2="6" />
        <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        <line x1="18" x2="22" y1="12" y2="12" />
        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
        <line x1="12" x2="12" y1="18" y2="22" />
        <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
        <line x1="2" x2="6" y1="12" y2="12" />
        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      </svg>
    </div>
  );
}

export default LoadingSVG;
