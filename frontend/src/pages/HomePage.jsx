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

  // Fallback: if products exist but filteredProducts is empty, show all products
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      addRecentSearch(value);
    }
    // Delay hiding suggestions to allow clicking
    setTimeout(() => setShowSuggestions(false), 200);
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value) setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="search-input"
          />
          
          {showSuggestions && recentSearches.length > 0 && (
            <div className="suggestions-dropdown">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="suggestion-item"
                >
                  {search}
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