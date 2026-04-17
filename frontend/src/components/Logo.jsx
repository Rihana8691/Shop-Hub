import React from 'react';
import '../styles/Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <div className="logo-shape">
          <div className="logo-bag"></div>
          <div className="logo-handle"></div>
        </div>
      </div>
      <div className="logo-text">
        <span className="logo-shop">Shop</span>
        <span className="logo-hub">Hub</span>
      </div>
    </div>
  );
};

export default Logo;
