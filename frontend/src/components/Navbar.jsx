import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import Logo from './Logo.jsx';
import '../styles/Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActiveLink = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          <Logo />
        </Link>

        <div className="nav-links">
          <Link className={`nav-link ${isActiveLink('/') ? 'active' : ''}`} to="/">
            Home
          </Link>
          <Link className={`nav-link ${isActiveLink('/shop') ? 'active' : ''}`} to="/shop">
            Shop
          </Link>
          <Link className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`} to="/about">
            About
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        

        <div className="user-section">
          {isAuthenticated ? (
            <>
              <span className="welcome-text">
                Welcome, {user?.name || 'User'}
              </span>

              <div className="profile-dropdown" ref={dropdownRef}>
                <button
                  className="profile-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fas fa-user"></i>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>Profile</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setShowDropdown(false)}>Orders</Link>
                    <button onClick={() => { logout(); setShowDropdown(false); }} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Link to="/wishlist" className="wishlist-icon">
                <i className="fas fa-heart"></i>
              </Link>

              <Link to="/cart" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </>
          ) : (
            <>
              <Link to="/login" className="login-icon">
                <i className="fas fa-sign-in-alt"></i>
              </Link>

              <Link to="/wishlist" className="wishlist-icon">
                <i className="fas fa-heart"></i>
              </Link>

              <Link to="/cart" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </Link>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;