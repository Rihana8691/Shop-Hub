import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProductCache } from '../context/ProductCacheContext';
import '../styles/ShopPage.css';

const ShopPage = () => {
  const { products, loading, recentSearches, addRecentSearch } = useProductCache();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesStock = !inStockOnly || product.stock > 0;
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      addRecentSearch(value);
    }
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  // Price range handler
  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value) || 0
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 10000 });
    setInStockOnly(false);
    setSortBy('name');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '100%',
      margin: 0,
      padding: '40px 20px',
      backgroundColor: 'var(--background)',
      minHeight: '100vh'
    }}>
      <div className="about-header">
        <h1 className="about-title">Shop All Products</h1>
        <p className="about-subtitle">Discover Amazing Products</p>
      </div>

      {/* Enhanced Filters Section */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '30px'
      }}>
        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '20px', alignItems: 'end'}}>
          {/* Search with Suggestions */}
          <div style={{position: 'relative'}}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value) setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            />
            
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
                zIndex: 10
              }}>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(search)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {search}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
              backgroundColor: 'var(--background)',
              color: 'var(--text-primary)'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
              backgroundColor: 'var(--background)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock">Stock Level</option>
          </select>
          
          {/* Reset Filters */}
          <button onClick={resetFilters} className="cta-btn secondary">
            Reset
          </button>
        </div>
        
        {/* Advanced Filters */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px'}}>
          {/* Price Range */}
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Price Range (ETB)</label>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                min="0"
                style={{
                  width: '80px',
                  padding: '8px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                min="0"
                style={{
                  width: '80px',
                  padding: '8px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
          
          {/* Stock Filter */}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <input
              type="checkbox"
              id="inStockOnly"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              style={{width: '16px', height: '16px'}}
            />
            <label htmlFor="inStockOnly" style={{color: 'var(--text-primary)', cursor: 'pointer'}}>
              In Stock Only
            </label>
          </div>
          
          {/* Results Count */}
          <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
            Found {sortedProducts.length} products
          </div>
        </div>
      </div>

      
      {/* Products Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
        width: '100%'
      }}>
        {currentProducts.map(product => (
          <div key={product.id} style={{
            background: 'var(--surface)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {sortedProducts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'var(--surface)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{
            color: 'var(--text-primary)',
            fontSize: '2rem',
            marginBottom: '20px',
            borderBottom: '3px solid var(--primary-color)',
            paddingBottom: '10px'
          }}>No products found</h3>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            fontSize: '1.1rem',
            marginBottom: '15px'
          }}>Try adjusting your search or filter criteria</p>
          <button onClick={resetFilters} className="cta-btn primary">
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          padding: '20px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="cta-btn secondary"
            style={{opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? 'cta-btn primary' : 'cta-btn secondary'}
              style={{
                padding: '8px 12px',
                fontSize: '14px'
              }}
            >
              {pageNumber}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cta-btn secondary"
            style={{opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'}}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
