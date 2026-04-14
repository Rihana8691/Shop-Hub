import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import '../styles/WishlistPage.css';

const WishlistPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      addNotification('Wishlist cleared successfully', 'info');
    }
  };

  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  };

  const addNotification = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 5));
  };

  const handleShareWishlist = () => {
    if (!shareEmail) {
      addNotification('Please enter an email address', 'error');
      return;
    }

        addNotification(`Wishlist shared to ${shareEmail}`, 'success');
    setShowShareModal(false);
    setShareEmail('');
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      addNotification(`${product.name} added to cart!`, 'success');
    } else {
      addNotification(`${product.name} is out of stock`, 'error');
    }
  };

  const handleAddAllToCart = () => {
    const availableItems = wishlistItems.filter(item => item.stock > 0);

    if (availableItems.length === 0) {
      addNotification('No items available in stock', 'error');
      return;
    }

    availableItems.forEach(item => addToCart(item, 1));
    addNotification(`${availableItems.length} items added to cart!`, 'success');
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: '#dc3545' };
    if (stock <= 5) return { text: `Only ${stock} left`, color: '#8B4513' };
    return { text: 'In Stock', color: '#28a745' };
  };

  const getSortedAndFilteredItems = () => {
    let filtered = [...wishlistItems];

    if (filterBy === 'in-stock') {
      filtered = filtered.filter(item => item.stock > 0);
    } else if (filterBy === 'out-of-stock') {
      filtered = filtered.filter(item => item.stock === 0);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return filtered;
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="home-container">
        <h1 className="page-title">My Wishlist</h1>
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love!</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const sortedAndFilteredItems = getSortedAndFilteredItems();
  const inStockCount = wishlistItems.filter(item => item.stock > 0).length;

  return (
    <div style={{
      maxWidth: '100%',
      margin: 0,
      padding: '40px 20px',
      backgroundColor: 'var(--background)',
      minHeight: '100vh'
    }}>
      {/* Header with Actions */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1 style={{
          fontSize: '3rem',
          color: 'var(--text-primary)',
          margin: 0,
          fontWeight: 300,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: 'Georgia, serif'
        }}>My Wishlist</h1>
        <div style={{display: 'flex', gap: '10px'}}>
          <button
            onClick={() => setShowShareModal(true)}
            className="cta-btn secondary"
            style={{padding: '8px 16px'}}
          >
            Share Wishlist
          </button>
          <button
            onClick={handleClearWishlist}
            className="cta-btn secondary"
            style={{padding: '8px 16px'}}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border)',
        marginBottom: '30px'
      }}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '20px', alignItems: 'center'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Filter by</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Items ({wishlistItems.length})</option>
              <option value="in-stock">In Stock ({inStockCount})</option>
              <option value="out-of-stock">Out of Stock ({wishlistItems.length - inStockCount})</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="date">Date Added</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock Level</option>
            </select>
          </div>
          
          <div style={{color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'right'}}>
            Showing {sortedAndFilteredItems.length} of {wishlistItems.length} items
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
        {sortedAndFilteredItems.length === 0 ? (
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
            }}>No items found</h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontSize: '1.1rem',
              marginBottom: '15px'
            }}>Try adjusting your filters</p>
            <button
              onClick={() => { setFilterBy('all'); setSortBy('date'); }}
              className="cta-btn primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedAndFilteredItems.map(item => (
            <div key={item.id} style={{
              background: 'var(--surface)',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '20px',
              border: '1px solid var(--border)'
            }}>
              <div style={{display: 'flex', gap: '20px'}}>
                <div style={{width: '120px', height: '120px'}}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)'}}
                  />
                </div>
                
                <div style={{flex: 1}}>
                  <h3 style={{margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '1.5rem'}}>{item.name}</h3>
                  <p style={{margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-color)'}}>
                    {item.price.toFixed()} ETB
                  </p>
                  <p style={{margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '14px'}}>
                    Category: {item.category}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: getStockStatus(item.stock).color,
                    color: 'white',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    marginBottom: '16px'
                  }}>
                    {getStockStatus(item.stock).text}
                  </div>
                  
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className={`cta-btn ${item.stock > 0 ? 'primary' : 'secondary'}`}
                      style={{padding: '8px 16px', fontSize: '14px', opacity: item.stock === 0 ? 0.5 : 1, cursor: item.stock === 0 ? 'not-allowed' : 'pointer'}}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="cta-btn secondary"
                      style={{padding: '8px 16px', fontSize: '14px'}}
                    >
                      Remove
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      className="cta-btn secondary"
                      style={{padding: '8px 16px', fontSize: '14px', textDecoration: 'none'}}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Wishlist Summary */}
      <div style={{
        background: 'var(--surface)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border)',
        height: 'fit-content',
        marginTop: '40px'
      }}>
        <h3 style={{
          color: 'var(--text-primary)',
          fontSize: '2rem',
          marginBottom: '20px',
          borderBottom: '3px solid var(--primary-color)',
          paddingBottom: '10px'
        }}>Wishlist Summary</h3>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
          <span style={{color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem'}}>Total Items:</span>
          <span style={{color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '1.1rem'}}>{wishlistItems.length}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
          <span style={{color: 'var(--text-secondary)'}}>In Stock:</span>
          <span style={{color: 'var(--text-primary)'}}>{inStockCount}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)'}}>
          <span style={{color: 'var(--text-secondary)'}}>Total Value:</span>
          <span style={{fontWeight: '600', color: 'var(--primary-color)'}}>{getTotalPrice().toFixed()} ETB</span>
        </div>
        
        <button
          onClick={handleAddAllToCart}
          className="cta-btn primary"
          disabled={inStockCount === 0}
          style={{width: '100%', padding: '12px', marginBottom: '12px', opacity: inStockCount === 0 ? 0.5 : 1, cursor: inStockCount === 0 ? 'not-allowed' : 'pointer'}}
        >
          Add All to Cart ({inStockCount})
        </button>
        
        <Link
          to="/shop"
          className="cta-btn secondary"
          style={{display: 'block', textAlign: 'center', textDecoration: 'none', padding: '12px', marginBottom: '12px'}}
        >
          Continue Shopping
        </Link>
        
        <button
          onClick={() => setShowShareModal(true)}
          className="cta-btn secondary"
          style={{width: '100%', padding: '12px'}}
        >
          Share Wishlist
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--surface)',
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{margin: '0 0 20px 0', color: 'var(--text-primary)'}}>Share Your Wishlist</h3>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>
                Email Address
              </label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '16px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button
                onClick={handleShareWishlist}
                className="cta-btn primary"
                style={{flex: 1}}
              >
                Share
              </button>
              <button
                onClick={() => { setShowShareModal(false); setShareEmail(''); }}
                className="cta-btn secondary"
                style={{flex: 1}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;