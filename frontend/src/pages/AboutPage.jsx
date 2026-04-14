import React, { useState, useEffect } from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    products: 0,
    brands: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const targetStats = {
      customers: 10000,
      products:20,
      brands: 20,
      satisfaction: 99
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        customers: Math.floor(targetStats.customers * progress),
        products: Math.floor(targetStats.products * progress),
        brands: Math.floor(targetStats.brands * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About ShopHub</h1>
        <p className="about-subtitle">Your Trusted Online Shopping Destination</p>
      </div>

      <div className="about-layout">
        <div className="about-main">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, ShopHub began with a simple mission: to provide customers with 
              a seamless online shopping experience combined with exceptional customer service. 
              We carefully curate our product selection to ensure quality, value, and satisfaction 
              with every purchase.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Quality First</h3>
                <p>We source only the finest products from trusted suppliers and brands.</p>
              </div>
              <div className="value-card">
                <h3>Customer Focus</h3>
                <p>Your satisfaction is our top priority. We're here to help you shop with confidence.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We constantly improve our platform to make your shopping experience better.</p>
              </div>
              <div className="value-card">
                <h3>Integrity</h3>
                <p>We operate with transparency and honesty in everything we do.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why Choose ShopHub?</h2>
            <div className="features-list">
              <div className="feature-item">
                <h4>Curated Selection</h4>
                <p>Hand-picked products that meet our high standards for quality and value.</p>
              </div>
              <div className="feature-item">
                <h4>Secure Shopping</h4>
                <p>Advanced security measures to protect your personal and payment information.</p>
              </div>
              <div className="feature-item">
                <h4>Fast Delivery</h4>
                <p>Quick and reliable shipping to get your products to you when you need them.</p>
              </div>
              <div className="feature-item">
                <h4>Easy Returns</h4>
                <p>Hassle-free return policy if you're not completely satisfied with your purchase.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Riab Abraham</h3>
                <p className="member-title">Founder & CEO</p>
                <p className="member-bio">Passionate about creating the best online shopping experience in Ethiopia.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Sarah Tesfaye</h3>
                <p className="member-title">Head of Operations</p>
                <p className="member-bio">Ensuring smooth operations and exceptional customer service.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Michael Bekele</h3>
                <p className="member-title">Tech Lead</p>
                <p className="member-bio">Building innovative technology solutions for our platform.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Hanna Mulugeta</h3>
                <p className="member-title">Customer Success Manager</p>
                <p className="member-bio">Dedicated to ensuring every customer has a great experience.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="about-sidebar">
          <div className="sidebar-content">
            <div className="sidebar-section">
              <h3>Quick Stats</h3>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">{animatedStats.customers.toLocaleString()}+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{animatedStats.products.toLocaleString()}+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{animatedStats.brands}+</span>
                  <span className="stat-label">Partner Brands</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{animatedStats.satisfaction}%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Our Mission</h3>
              <p>To create the most trusted and enjoyable online shopping experience by combining quality products, exceptional service, and innovative technology.</p>
            </div>

            <div className="sidebar-section">
              <h3>Contact Us</h3>
              <div className="contact-info">
                <p><strong>Email:</strong> riab@gmail.com</p>
                <p><strong>Phone:</strong> +251-9709-701 </p>
                <p><strong>Hours:</strong>Monday-Friday 3AM-2PM</p>
                <p><strong>Address:</strong> 123 Torhayloch </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
