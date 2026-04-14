import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0',
        transition: 'all 0.3s ease'
      }}
    >
      {isDark ? (
        <FaSun 
          style={{
            fontSize: '20px',
            color: '#f59e0b',
            transition: 'all 0.3s ease'
          }}
        />
      ) : (
        <FaMoon 
          style={{
            fontSize: '20px',
            color: '#000000',
            transition: 'all 0.3s ease'
          }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;