import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderHistoryPage.css';

const OrderHistoryPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          // Add status to orders if not present
          const ordersWithStatus = parsedOrders.map(order => ({
            ...order,
            status: order.status || 'processing',
            trackingNumber: order.trackingNumber || generateTrackingNumber()
          }));
          setOrders([...ordersWithStatus].reverse());
        }
      } catch (error) {
        // Error parsing orders
      }
    }
  }, []);

  const generateTrackingNumber = () => {
    return 'TRK' + Date.now().toString().slice(-8);
  };

  const getOrderStatusColor = (status) => {
    const colors = {
      'processing': 'var(--status-brown)',
      'shipped': '#17a2b8',
      'delivered': '#28a745',
      'cancelled': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getOrderStatusText = (status) => {
    const texts = {
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return texts[status] || 'Unknown';
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  if (orders.length === 0) {
    return (
      <div className="home-container">
        <h1 className="page-title">Order History</h1>
        <div className="no-products" style={{textAlign: 'center', padding: '60px 40px'}}>
          <h3 style={{color: 'var(--primary-color)', marginBottom: '16px'}}>No orders yet</h3>
          <p style={{color: 'var(--text-secondary)', marginBottom: '24px'}}>Your order history will appear here once you make a purchase.</p>
          <button onClick={() => navigate('/shop')} className="cta-btn primary">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Order History</h1>
      
      {/* Order Filters */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '30px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'}}>
          <div>
            <h3 style={{margin: 0, color: 'var(--text-primary)'}}>Filter Orders</h3>
            <p style={{margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px'}}>
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            {['all', 'processing', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '8px 16px',
                  border: filterStatus === status ? '2px solid var(--primary-color)' : '1px solid var(--border)',
                  backgroundColor: filterStatus === status ? 'var(--primary-color)' : 'var(--surface)',
                  color: filterStatus === status ? 'white' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'var(--transition)'
                }}
              >
                {status === 'all' ? 'All' : getOrderStatusText(status)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div style={{display: 'grid', gap: '20px'}}>
        {filteredOrders.map(order => (
          <div 
            key={order.id} 
            style={{
              backgroundColor: 'var(--surface)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition)'
            }}
          >
            {/* Order Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border)'
            }}>
              <div>
                <div style={{fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px'}}>
                  Order #{order.orderNumber || order.id}
                </div>
                <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                  {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: getOrderStatusColor(order.status),
                  color: 'white',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '500',
                  marginTop: '8px'
                }}>
                  {getOrderStatusText(order.status)}
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--primary-color)'}}>
                  {order.total.toFixed()} ETB
                </div>
                <div style={{color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px'}}>
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div style={{marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}>Items</h4>
              <div style={{display: 'grid', gap: '8px'}}>
                {order.items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'var(--background)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <span style={{color: 'var(--text-primary)'}}>{item.name}</span>
                    <span style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                      {item.quantity} × {item.price.toFixed()} ETB = {(item.price * item.quantity).toFixed()} ETB
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tracking Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              padding: '16px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <div>
                <h5 style={{margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '14px'}}>Tracking Number</h5>
                <div style={{color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '14px'}}>
                  {order.trackingNumber}
                </div>
              </div>
              <div>
                <h5 style={{margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '14px'}}>Shipping Address</h5>
                <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                  {order.customer.address}, {order.customer.city}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{display: 'flex', gap: '10px', marginTop: '16px'}}>
              <button 
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'var(--transition)'
                }}
              >
                {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
              </button>
              <button 
                onClick={() => window.open(`mailto:riab@gmail.com?subject=Order Inquiry - ${order.orderNumber || order.id}`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: 'var(--primary-color)',
                  border: '1px solid var(--primary-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'var(--transition)'
                }}
              >
                Contact Support
              </button>
            </div>
            
            {/* Expanded Details */}
            {selectedOrder === order.id && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: 'var(--background)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <h5 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}>Customer Information</h5>
                <div style={{display: 'grid', gap: '8px', fontSize: '14px'}}>
                  <div><strong>Name:</strong> {order.customer.name}</div>
                  <div><strong>Email:</strong> {order.customer.email}</div>
                  <div><strong>Phone:</strong> +251-9709-701</div>
                  <div><strong>Payment Method:</strong> Payment Slip</div>
                  <div><strong>Subtotal:</strong> {order.subtotal.toFixed()} ETB</div>
                  <div><strong>Shipping:</strong> {order.shipping.toFixed()} ETB</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;