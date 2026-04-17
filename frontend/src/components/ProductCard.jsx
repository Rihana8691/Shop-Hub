import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
          />
          <button
            onClick={handleWishlistToggle}
            className={`wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className={`fas fa-heart ${isInWishlist(product.id) ? 'solid' : 'regular'}`}></i>
          </button>
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.price.toFixed()}ETB</p>
          <p className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
        </div>
      </Link>
      <div className="product-info">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`add-to-cart-btn ${product.stock > 0 ? 'enabled' : 'disabled'}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;