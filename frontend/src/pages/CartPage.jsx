import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="home-container">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="no-products">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="cta-btn primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-content grid-template-columns-2fr-1fr gap-40px mt-40px">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item flex gap-20px p-20px bg-surface border-radius-lg border-1px-solid-border mb-20px">
              <img src={item.image} alt={item.name} className="w-100px h-100px object-fit-cover border-radius-md" />
              
              <div className="item-details flex-1">
                <h3 className="m-0-0-8px-0 text-primary">{item.name}</h3>
                <p className="m-0 text-secondary">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="quantity-control flex align-items-center gap-10px">
                <label className="text-secondary">Quantity: </label>
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (value >= 1 && value <= item.stock) {
                      updateQuantity(item.id, value);
                    }
                  }}
                  className="w-60px p-8px border-1px-solid-border border-radius-md"
                />
              </div>
              
              <div className="item-subtotal flex align-items-center">
                <strong className="text-primary">${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="cta-btn secondary p-8px-16px"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="order-summary bg-surface p-24px border-radius-lg border-1px-solid-border h-fit-content">
          <h3 className="m-0-0-20px-0 text-primary">Order Summary</h3>
          <div className="summary-row flex justify-space-between mb-12px">
            <span className="text-secondary">Items:</span>
            <span className="text-primary">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-total flex justify-space-between mb-24px pt-16px border-top-1px-solid-border">
            <span className="font-weight-600 text-primary">Total:</span>
            <span className="font-weight-700 font-size-1-2rem text-primary">${getCartTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="cta-btn primary w-100% p-12px"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;