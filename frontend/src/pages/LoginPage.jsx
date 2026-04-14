import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/LoginPage.css';

const LoginPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (only for signup)
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      } else if (formData.name.trim().length > 50) {
        newErrors.name = 'Name must be less than 50 characters';
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.length > 50) {
      newErrors.password = 'Password must be less than 50 characters';
    } else if (!isLogin) {
      // Strong password validation for signup
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /\d/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
      } else if (!hasSpecialChar) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    return newErrors;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    const levels = [
      { strength: 0, text: 'Very Weak', color: '#dc3545' },
      { strength: 1, text: 'Weak', color: '#fd7e14' },
      { strength: 2, text: 'Fair', color: 'var(--status-brown)' },
      { strength: 3, text: 'Good', color: '#20c997' },
      { strength: 4, text: 'Strong', color: '#28a745' },
      { strength: 5, text: 'Very Strong', color: '#007bff' }
    ];
    
    return levels[strength];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email is already registered (in real app, you'd check with backend)
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find(user => user.email === formData.email);

      if (isLogin) {
        // Login: Check if email exists
        if (!existingUser) {
          setError('This email is not registered. Please sign up first.');
          setIsSubmitting(false);
          return;
        }
        
        // Check if password matches
        if (existingUser.password !== formData.password) {
          setError('Incorrect password. Please try again.');
          setIsSubmitting(false);
          return;
        }
        
        login(existingUser);
        navigate('/');
      } else {
        // Sign up: Check if email already exists
        if (existingUser) {
          setError('This email is already registered. Please login instead.');
          setIsSubmitting(false);
          return;
        }
        
        // Register new user
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: formData.name || formData.email.split('@')[0],
          password: formData.password // In real app, you'd hash this
        };
        
        // Save to registered users
        registeredUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        register(userData);
        navigate('/');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <h1 className="page-title">{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        backgroundColor: 'var(--surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)'
      }}>
        {error && (
          <div style={{
            backgroundColor: '#fff5f5',
            color: '#dc3545',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            border: '1px solid #feb2b2',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {!isLogin && (
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.name ? '2px solid #dc3545' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)',
                  boxSizing: 'border-box'
                }}
              />
              {errors.name && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: '500'
                }}>
                  {errors.name}
                </div>
              )}
            </div>
          )}
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: errors.email ? '2px solid #dc3545' : '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                fontFamily: 'inherit',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <div style={{
                color: '#dc3545',
                fontSize: '14px',
                marginTop: '5px',
                fontWeight: '500'
              }}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 12px',
                  border: errors.password ? '2px solid #dc3545' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <div style={{
                color: '#dc3545',
                fontSize: '14px',
                marginTop: '5px',
                fontWeight: '500'
              }}>
                {errors.password}
              </div>
            )}
            {!isLogin && formData.password && (
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: getPasswordStrength(formData.password).color
              }}>
                Password Strength: {getPasswordStrength(formData.password).text}
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '2px',
                  marginTop: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(getPasswordStrength(formData.password).strength / 5) * 100}%`,
                    height: '100%',
                    backgroundColor: getPasswordStrength(formData.password).color,
                    transition: 'all 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="cta-btn primary"
            disabled={isSubmitting}
            style={{
              padding: '14px', 
              fontSize: '16px', 
              fontWeight: '600',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                {isLogin ? 'Logging in...' : 'Signing up...'}
              </span>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>
        
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{color: 'var(--text-secondary)', margin: '0 0 12px 0'}}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="cta-btn secondary"
            style={{padding: '10px 20px'}}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
