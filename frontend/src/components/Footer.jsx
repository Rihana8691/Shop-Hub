import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e) => {
    scrollToTop();
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShopHub</h3>
          <p>Your trusted online shopping destination for quality products at great prices.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/cart" onClick={handleLinkClick}>Shopping Cart</Link></li>
            <li><Link to="/orders" onClick={handleLinkClick}>Order History</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact" onClick={handleLinkClick}>Contact Us</Link></li>
            <li><Link to="/shipping" onClick={handleLinkClick}>Shipping Info</Link></li>
            <li><Link to="/returns" onClick={handleLinkClick}>Return Policy</Link></li>
            <li><Link to="/faq" onClick={handleLinkClick}>FAQ</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#facebook" onClick={(e) => {e.preventDefault(); scrollToTop();}} aria-label="Facebook">
              <i className="fab fa-facebook-f" ></i>
            </a>
            <a href="#twitter" onClick={(e) => {e.preventDefault(); scrollToTop();}} aria-label="Twitter">
              <i className="fab fa-twitter" ></i>
            </a>
            <a href="#instagram" onClick={(e) => {e.preventDefault(); scrollToTop();}} aria-label="Instagram">
              <i className="fab fa-instagram" ></i>
            </a>
            <a href="#email" onClick={(e) => {e.preventDefault(); scrollToTop();}} aria-label="Email">
              <i className="fas fa-envelope" ></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
