import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'payment-slip',
    paymentSlip: null
  });

  // Ethiopian cities with shipping costs
  const cities = [
    { name: 'Addis Ababa', shipping: 50 },
    { name: 'Dire Dawa', shipping: 120 },
    { name: 'Mekelle', shipping: 150 },
    { name: 'Bahir Dar', shipping: 120 },
    { name: 'Gondar', shipping: 150 },
    { name: 'Adama', shipping: 80 },
    { name: 'Hawassa', shipping: 130 },
    { name: 'Jimma', shipping: 140 },
    { name: 'Jijiga', shipping: 160 },
    { name: 'Dessie', shipping: 140 }
  ];

  const getShippingCost = () => {
    const selectedCity = cities.find(city => city.name === formData.city);
    return selectedCity ? selectedCity.shipping : 0;
  };

  const getTotalWithShipping = () => {
    return getCartTotal() + getShippingCost();
  };

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';

    // Payment validation - only payment slip required
    if (!formData.paymentSlip) {
      newErrors.paymentSlip = 'Please upload a payment slip';
    }

    return newErrors;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, paymentSlip: 'File size must be less than 5MB' });
      return;
    }
    setFormData({
      ...formData,
      paymentSlip: file
    });
    if (errors.paymentSlip) {
      setErrors({
        ...errors,
        paymentSlip: ''
      });
    }
  };

  const generateOrderNumber = () => {
    return 'SH' + Date.now().toString().slice(-8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Check stock availability before processing
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const stockErrors = [];

      cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product && (product.stock || 0) < item.quantity) {
          stockErrors.push(`${product.name} has insufficient stock. Available: ${product.stock || 0}, Requested: ${item.quantity}`);
        }
      });

      if (stockErrors.length > 0) {
        setErrors({ ...newErrors, stock: stockErrors.join(', ') });
        return;
      }

      const order = {
        id: Date.now(),
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString(),
        items: [...cartItems],
        subtotal: getCartTotal(),
        shipping: getShippingCost(),
        total: getTotalWithShipping(),
        customer: formData
      };

      const existingOrders = localStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Decrease stock for each purchased item
      cartItems.forEach(item => {
        const productIndex = products.findIndex(p => p.id === item.id);
        if (productIndex !== -1) {
          products[productIndex].stock = (products[productIndex].stock || 0) - item.quantity;
        }
      });

      // Save updated products with decreased stock
      localStorage.setItem('products', JSON.stringify(products));

      clearCart();
      setOrderPlaced(true);
    } else {
      setErrors(newErrors);
    }
  };

  if (orderPlaced) {
    return (
      <div className="home-container">
        <h1 className="page-title">Order Confirmed!</h1>
        <div className="no-products" style={{textAlign: 'center', padding: '60px 40px'}}>
          <h3 style={{color: 'var(--primary-color)', marginBottom: '16px'}}>Thank you for your purchase, {formData.name}!</h3>
          <p style={{color: 'var(--text-secondary)', marginBottom: '24px'}}>Your order has been placed successfully.</p>
          <button onClick={() => navigate('/')} className="cta-btn primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Checkout</h1>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '40px'}}>
        {/* Customer Information Form */}
        <div style={{backgroundColor: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)'}}>
          <h3 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Customer Information</h3>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.name ? '1px solid #dc3545' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                />
                {errors.name && <div style={{color: '#dc3545', fontSize: '14px', marginTop: '4px'}}>{errors.name}</div>}
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.email ? '1px solid #dc3545' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                />
                {errors.email && <div style={{color: '#dc3545', fontSize: '14px', marginTop: '4px'}}>{errors.email}</div>}
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.city ? '1px solid #dc3545' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>
                      {city.name} (Shipping: {city.shipping}ETB)
                    </option>
                  ))}
                </select>
                {errors.city && <div style={{color: '#dc3545', fontSize: '14px', marginTop: '4px'}}>{errors.city}</div>}
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.address ? '1px solid #dc3545' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                {errors.address && <div style={{color: '#dc3545', fontSize: '14px', marginTop: '4px'}}>{errors.address}</div>}
              </div>
            </div>

            {errors.stock && (
              <div style={{color: '#dc3545', marginBottom: '20px', padding: '12px', backgroundColor: '#fff5f5', borderRadius: 'var(--radius-md)'}}>
                {errors.stock}
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div style={{backgroundColor: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', height: 'fit-content'}}>
          <h3 style={{margin: '0 0 20px 0', color: 'var(--text-primary)'}}>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>
              <span style={{color: 'var(--text-secondary)'}}>{item.name} x {item.quantity}</span>
              <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>{(item.price * item.quantity).toFixed()} ETB</span>
            </div>
          ))}
          <div style={{paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
              <span style={{color: 'var(--text-secondary)'}}>Subtotal:</span>
              <span style={{color: 'var(--text-primary)'}}>{getCartTotal().toFixed()} ETB</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
              <span style={{color: 'var(--text-secondary)'}}>Shipping:</span>
              <span style={{color: 'var(--text-primary)'}}>{getShippingCost()} ETB</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
              <span style={{fontWeight: '600', color: 'var(--text-primary)'}}>Total:</span>
              <span style={{fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-color)'}}>{getTotalWithShipping().toFixed()} ETB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div style={{backgroundColor: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginTop: '40px'}}>
        <h3 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Payment Method</h3>
        <h4 style={{margin: '0 0 16px 0', color: 'var(--text-primary)'}}>Upload Payment Slip</h4>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
          <div>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Payment Slip *</label>
              <div style={{position: 'relative'}}>
                <input
                  type="file"
                  name="paymentSlip"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  style={{display: 'none'}}
                  id="paymentSlip"
                />
                <label htmlFor="paymentSlip" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px',
                  border: errors.paymentSlip ? '2px dashed #dc3545' : '2px dashed var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  backgroundColor: 'var(--background)'
                }}>
                  <i className="fas fa-cloud-upload-alt" style={{fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '8px'}}></i>
                  <span style={{color: 'var(--text-primary)', marginBottom: '4px'}}>Click to upload payment slip</span>
                  <small style={{color: 'var(--text-muted)'}}>Supported formats: JPG, PNG, PDF (Max 5MB)</small>
                </label>
              </div>
              {errors.paymentSlip && <div style={{color: '#dc3545', fontSize: '14px', marginTop: '4px'}}>{errors.paymentSlip}</div>}
              {formData.paymentSlip && (
                <div style={{marginTop: '12px', padding: '12px', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)'}}>
                  <p style={{margin: 0, color: 'var(--text-primary)'}}>
                    <strong>Selected file:</strong> {formData.paymentSlip.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 style={{margin: '0 0 16px 0', color: 'var(--text-primary)'}}>Payment Slip Instructions:</h4>
            <div style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              <p style={{margin: '0 0 8px 0'}}>1. Make the payment using any payment method (bank transfer, mobile money, etc.)</p>
              <p style={{margin: '0 0 8px 0'}}>2. Take a screenshot or photo of the payment confirmation</p>
              <p style={{margin: '0 0 8px 0'}}>3. Upload the payment slip above</p>
              <p style={{margin: '0 0 8px 0'}}>4. Your order will be confirmed after admin approval</p>
              <p style={{margin: '0 0 16px 0'}}>5. Processing time: 24-48 hours</p>
              <div style={{padding: '16px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)'}}>
                <p style={{margin: '0 0 8px 0'}}><strong>Subtotal:</strong> {getCartTotal().toFixed()} ETB</p>
                <p style={{margin: '0 0 8px 0'}}><strong>Shipping:</strong> {getShippingCost()} ETB</p>
                <p style={{margin: 0}}><strong>Total Amount:</strong> <span style={{color: 'var(--primary-color)'}}>{getTotalWithShipping().toFixed()} ETB</span></p>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: '24px', textAlign: 'center'}}>
          <button type="submit" onClick={handleSubmit} className="cta-btn primary" style={{padding: '14px 32px', fontSize: '16px'}}>
            <i className="fas fa-lock" style={{marginRight: '8px'}}></i>
            Complete Payment & Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;