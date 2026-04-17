import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [profileStats, setProfileStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    memberSince: ''
  });

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.slice(0, 5)); // Show recent 5 orders
        
        // Calculate profile statistics
        const totalOrders = parsedOrders.length;
        const totalSpent = parsedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
        
        setProfileStats({
          totalOrders,
          totalSpent,
          averageOrderValue,
          memberSince: user?.memberSince || 'April 2026'
        });
      } catch (error) {
        // Error loading orders
      }
    }
  }, [user]);

  const handleEditProfile = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+251-9709-701',
      address: 'Addis Ababa, Ethiopia'
    });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
        setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const mockOrders = [
    { id: 'ORD001', date: '2024-03-15', total: 89.99, status: 'Delivered' },
    { id: 'ORD002', date: '2024-03-10', total: 156.49, status: 'Shipped' },
    { id: 'ORD003', date: '2024-03-05', total: 234.99, status: 'Processing' }
  ];

  return (
    <div className="home-container">
      <h1 className="page-title">My Profile</h1>
      
      {/* Profile Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px'}}>
            {profileStats.totalOrders}
          </div>
          <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Total Orders</div>
        </div>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px'}}>
            {profileStats.totalSpent.toFixed()} ETB
          </div>
          <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Total Spent</div>
        </div>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px'}}>
            {profileStats.averageOrderValue.toFixed()} ETB
          </div>
          <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Avg Order Value</div>
        </div>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px'}}>
            {profileStats.memberSince}
          </div>
          <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Member Since</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
        {/* Account Information */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <h2 style={{margin: 0, color: 'var(--text-primary)'}}>Account Information</h2>
            {!isEditing && (
              <button onClick={handleEditProfile} className="cta-btn secondary">
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div style={{display: 'grid', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Address</label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
              <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                <button type="submit" className="cta-btn primary">Save Changes</button>
                <button type="button" onClick={handleCancelEdit} className="cta-btn secondary">Cancel</button>
              </div>
            </form>
          ) : (
            <div style={{display: 'grid', gap: '16px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)'}}>
                <span style={{color: 'var(--text-secondary)'}}>Name</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>{user?.name || 'N/A'}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)'}}>
                <span style={{color: 'var(--text-secondary)'}}>Email</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>{user?.email || 'N/A'}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)'}}>
                <span style={{color: 'var(--text-secondary)'}}>Phone</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>+251-9709-701</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0'}}>
                <span style={{color: 'var(--text-secondary)'}}>Address</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Recent Orders</h2>
          <div style={{display: 'grid', gap: '12px'}}>
            {orders.length === 0 ? (
              <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-secondary)'}}>
                No orders yet
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} style={{
                  padding: '16px',
                  backgroundColor: 'var(--background)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <div style={{fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px'}}>
                        Order #{order.orderNumber || order.id}
                      </div>
                      <div style={{fontSize: '14px', color: 'var(--text-secondary)'}}>
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: '600', color: 'var(--primary-color)', marginBottom: '4px'}}>
                        {order.total.toFixed()} ETB
                      </div>
                      <div style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        backgroundColor: order.status === 'delivered' ? '#28a745' : 'var(--status-brown)',
                        color: 'white',
                        borderRadius: 'var(--radius-sm)',
                        display: 'inline-block'
                      }}>
                        {order.status || 'Processing'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link to="/orders" className="cta-btn secondary" style={{display: 'inline-block', marginTop: '20px', textDecoration: 'none'}}>
            View All Orders
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{marginTop: '40px'}}>
        <h2 style={{marginBottom: '20px', color: 'var(--text-primary)'}}>Quick Actions</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          <Link to="/shop" style={{
            backgroundColor: 'var(--surface)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'var(--transition)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              Shop
            </div>
            <div>
              <h3 style={{margin: '0 0 4px 0', color: 'var(--text-primary)'}}>Continue Shopping</h3>
              <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '14px'}}>Browse products</p>
            </div>
          </Link>
          
          <Link to="/cart" style={{
            backgroundColor: 'var(--surface)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'var(--transition)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              Cart
            </div>
            <div>
              <h3 style={{margin: '0 0 4px 0', color: 'var(--text-primary)'}}>Shopping Cart</h3>
              <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '14px'}}>{getCartCount()} items</p>
            </div>
          </Link>
          
          <Link to="/contact" style={{
            backgroundColor: 'var(--surface)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'var(--transition)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              Help
            </div>
            <div>
              <h3 style={{margin: '0 0 4px 0', color: 'var(--text-primary)'}}>Customer Support</h3>
              <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '14px'}}>Get help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
