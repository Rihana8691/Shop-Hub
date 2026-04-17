import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductCache } from '../context/ProductCacheContext';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetailsPage.css';

const ProductDetailsPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProductCache();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="no-products">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
      
      // Decrease stock in localStorage and clear cache to force refresh
      try {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const productIndex = products.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
          products[productIndex].stock = (products[productIndex].stock || 0) - quantity;
          localStorage.setItem('products', JSON.stringify(products));
          
          // Clear product cache completely to force all pages to refresh
          localStorage.removeItem('product_cache');
          
          // Also clear any other cached data
          localStorage.removeItem('recent_searches');
          localStorage.removeItem('last_filter');
          
          // Force page refresh to update stock display
          window.location.reload();
        }
      } catch (error) {
        console.error('Error updating stock:', error);
      }
      
      alert(`${product.name} (${quantity}x) added to cart!`);
    }
  };

  const getRelatedProducts = () => {
    return products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { status: 'out-of-stock', text: 'Out of Stock', color: '#dc3545' };
    if (product.stock <= 5) return { status: 'low-stock', text: `Only ${product.stock} left`, color: 'var(--status-brown)' };
    return { status: 'in-stock', text: 'In Stock', color: '#28a745' };
  };

  const stockStatus = getStockStatus();
  const relatedProducts = getRelatedProducts();

  return (
    <div className="home-container">
      <button onClick={() => navigate('/shop')} className="cta-btn secondary" style={{marginBottom: '30px'}}>
        Back to Shop
      </button>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px'}}>
        {/* Image Gallery Section */}
        <div>
          <div 
            style={{
              position: 'relative',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: '20px'
            }}
          >
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
        
        {/* Product Info Section */}
        <div>
          <h1 className="page-title" style={{textAlign: 'left', marginBottom: '20px'}}>{product.name}</h1>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)'}}>
              {product.price.toFixed()} ETB
            </div>
            <div style={{
              padding: '6px 12px',
              backgroundColor: stockStatus.color,
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {stockStatus.text}
            </div>
          </div>
          
          <p style={{color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px'}}>
            {product.description}
          </p>
          
          <div style={{marginBottom: '30px'}}>
            <span style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Category: </span>
            <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>{product.category}</span>
          </div>
          
          {/* Quantity Selector */}
          <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)'}}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '18px'
                }}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                style={{
                  width: '60px',
                  textAlign: 'center',
                  border: 'none',
                  padding: '10px',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-primary)',
                  cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                  fontSize: '18px'
                }}
              >
                +
              </button>
            </div>
            <span style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
              {product.stock} available
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="cta-btn primary"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              opacity: product.stock === 0 ? 0.5 : 1,
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : `Add to Cart (${quantity}x)`}
          </button>
          
          {/* Product Features */}
          <div style={{marginTop: '40px', padding: '20px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)'}}>
            <h3 style={{marginBottom: '15px', color: 'var(--text-primary)'}}>Product Features</h3>
            <ul style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
              <li>Premium quality materials</li>
              <li>Fast and reliable shipping</li>
              <li>30-day return policy</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="page-title" style={{textAlign: 'left', marginBottom: '30px'}}>Related Products</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '15px'
                  }}
                />
                <h3 style={{margin: '0 0 10px 0', color: 'var(--text-primary)'}}>{relatedProduct.name}</h3>
                <div style={{fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-color)'}}>
                  {relatedProduct.price.toFixed()} ETB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;