import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProductCache } from '../context/ProductCacheContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { products, loading, recentSearches, addRecentSearch, lastFilter, setCurrentFilter } = useProductCache();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    if (lastFilter) {
      setSelectedCategory(lastFilter);
    }
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lastFilter]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Always show filtered results - no fallback
  const displayProducts = filteredProducts;

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      addRecentSearch(value);
    }
    if (value.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentFilter(category);
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
            
      <div className="filter-section">
        <div className="search-container" style={{position: 'relative'}}>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              onFocus={() => {
                if (searchTerm.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              className="search-input"
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  handleSearch(searchTerm);
                }
              }}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '8px'
              }}
            >
              🔍
            </button>
          </div>
          
          {showSuggestions && recentSearches.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              marginTop: '4px',
              maxHeight: '200px',
              overflow: 'auto',
              zIndex: 10,
              boxShadow: 'var(--shadow-md)'
            }}>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleSearch(search);
                    setShowSuggestions(false);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: index < recentSearches.length - 1 ? '1px solid var(--border)' : 'none',
                    color: 'var(--text-primary)',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  🔍 {search}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {(searchTerm || selectedCategory) && (
          <div className="result-count">
            Found {filteredProducts.length} products
          </div>
        )}
      </div>

      <div className="products-grid">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {displayProducts.length === 0 && products.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;