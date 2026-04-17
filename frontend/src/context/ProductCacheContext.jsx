import React, { createContext, useState, useContext, useEffect } from 'react';
import productsData from '../data/products';

const ProductCacheContext = createContext();
const CACHE_KEY = 'product_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const NETWORK_DELAY = 500; // 500ms network simulation

export const useProductCache = () => useContext(ProductCacheContext);

export const ProductCacheProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  const [lastFilter, setLastFilter] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    
    const cached = localStorage.getItem(CACHE_KEY);
    const now = Date.now();
    
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        
        // Check if cache is still valid (within 5 minutes)
        if (now - timestamp < CACHE_DURATION) {
          await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));
          setProducts(data);
          setLoading(false);
          return;
        }
      } catch (error) {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    
    // Always start with static products data
    let currentProducts = productsData;
    
    // Try to get updated stock from localStorage but don't break if it fails
    try {
      const localStorageProducts = localStorage.getItem('products');
      if (localStorageProducts) {
        const parsedProducts = JSON.parse(localStorageProducts);
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          currentProducts = parsedProducts;
        }
      }
    } catch (error) {
      // Error with localStorage products, using static data
    }
    
    const cacheData = {
      data: currentProducts,
      timestamp: now
    };
    
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      // Cache storage error
    }
    
    // Double-check: if somehow products array is empty, use static data
    if (!currentProducts || currentProducts.length === 0) {
      currentProducts = productsData;
    }
    
    setProducts(currentProducts);
    setLoading(false);
  };

  const addRecentSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(term => term !== searchTerm);
      const updated = [searchTerm, ...filtered];
      return updated.slice(0, 3);
    });
  };

  const setCurrentFilter = (filter) => {
    setLastFilter(filter);
    sessionStorage.setItem('last_filter', filter);
  };

  useEffect(() => {
    const savedFilter = sessionStorage.getItem('last_filter');
    if (savedFilter) {
      setLastFilter(savedFilter);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  return (
    <ProductCacheContext.Provider value={{
      products,
      loading,
      recentSearches,
      addRecentSearch,
      lastFilter,
      setCurrentFilter
    }}>
      {children}
    </ProductCacheContext.Provider>
  );
};