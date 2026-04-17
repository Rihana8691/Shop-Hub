import React, { useState } from 'react';
import '../styles/FAQPage.css';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click on the Login icon in the navbar, then click 'Sign Up'. Fill in your name, email, and password. You'll receive a confirmation and can start shopping immediately.",
      category: "Account & Registration"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, mobile banking, and cash on delivery. All transactions are secured with industry-standard encryption.",
      category: "Payments & Returns"
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location: Addis Ababa (same day/next day), other major cities (2-4 business days), and other regions (5-7 business days). Express shipping options are also available.",
      category: "Orders & Shipping"
    },
    {
      question: "Can I return or exchange products?",
      answer: "Yes! We offer a 30-day return policy. Items must be unused, in original packaging, and with proof of purchase. Simply contact our customer service to initiate a return or exchange.",
      category: "Payments & Returns"
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can use this number on our website or the courier's website to track your package in real-time.",
      category: "Orders & Shipping"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within Ethiopia only. We're working on expanding our international shipping capabilities. Please check back soon for updates.",
      category: "Orders & Shipping"
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service via email at riab@gmail.com, phone at +251-9709-701, or through our contact form. We're available Monday-Friday 3AM-2PM.",
      category: "General Questions"
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely! We use advanced security measures including SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent.",
      category: "General Questions"
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 2 hours of placing it. After that, please contact our customer service immediately. If the order hasn't shipped yet, we can still cancel it for you.",
      category: "Orders & Shipping"
    },
    {
      question: "Do you have a loyalty program?",
      answer: "Yes! Our loyalty program rewards you with points for every purchase. These points can be redeemed for discounts on future orders. You also get exclusive access to sales and special offers.",
      category: "General Questions"
    },
    {
      question: "What if I receive a damaged item?",
      answer: "We apologize for any inconvenience. If you receive a damaged item, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund immediately.",
      category: "Payments & Returns"
    },
    {
      question: "How do I use a discount code?",
      answer: "During checkout, you'll see a field labeled 'Discount Code'. Enter your code there and click 'Apply'. The discount will be reflected in your total immediately. Note that only one discount code can be used per order.",
      category: "Payments & Returns"
    }
  ];

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to common questions about ShopHub</p>
      </div>

      <div className="faq-content">
        <div className="faq-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {(searchTerm || selectedCategory !== 'All') && (
            <div className="results-info">
              Found {filteredFAQs.length} {filteredFAQs.length === 1 ? 'FAQ' : 'FAQs'}
            </div>
          )}
        </div>

        <div className="faq-list">
          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <h3>No FAQs found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>
                    {activeIndex === index ? '×' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="faq-help">
          <div className="help-card">
            <h3>Still have questions?</h3>
            <p>Can't find what you're looking for? Our customer service team is here to help!</p>
            <div className="help-actions">
              <a href="/contact" className="help-btn primary">Contact Us</a>
              <a href="mailto:riab@gmail.com" className="help-btn secondary">Email Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
