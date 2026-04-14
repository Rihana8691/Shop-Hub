import React, { useState, useEffect } from 'react';
import '../styles/ShippingInfoPage.css';

const ShippingInfoPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [selectedCity, setSelectedCity] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [calculatedShipping, setCalculatedShipping] = useState(null);

  const cities = [
    { name: 'Addis Ababa', standard: 50, express: 120, free: false, deliveryTime: 'Same day/Next day' },
    { name: 'Dire Dawa', standard: 120, express: 250, free: false, deliveryTime: '2-3 business days' },
    { name: 'Mekelle', standard: 150, express: 300, free: false, deliveryTime: '4-5 business days' },
    { name: 'Bahir Dar', standard: 120, express: 250, free: false, deliveryTime: '3-4 business days' },
    { name: 'Gondar', standard: 150, express: 300, free: false, deliveryTime: '4-5 business days' },
    { name: 'Adama', standard: 80, express: 180, free: false, deliveryTime: '2-3 business days' },
    { name: 'Hawassa', standard: 100, express: 220, free: false, deliveryTime: '3-4 business days' },
    { name: 'Jimma', standard: 130, express: 280, free: false, deliveryTime: '4-5 business days' }
  ];

  const calculateShipping = () => {
    if (!selectedCity || !orderAmount) return;

    const city = cities.find(c => c.name === selectedCity);
    if (!city) return;

    let cost = 0;
    const amount = parseFloat(orderAmount);

    if (shippingMethod === 'express') {
      cost = city.express;
    } else if (shippingMethod === 'standard') {
      cost = city.standard;
    }

    // Free shipping for orders over 5000 ETB
    if (amount >= 5000 && shippingMethod === 'standard') {
      cost = 0;
    }

    setCalculatedShipping({
      cost,
      deliveryTime: city.deliveryTime,
      method: shippingMethod,
      freeShipping: amount >= 5000 && shippingMethod === 'standard'
    });
  };

  const getDeliveryEstimate = (method, city) => {
    const cityData = cities.find(c => c.name === city);
    if (!cityData) return 'N/A';
    
    if (method === 'express') {
      return cityData.deliveryTime.includes('Same day') ? 'Same day' : '1-2 business days';
    }
    return cityData.deliveryTime;
  };

  const getTrackingSteps = () => {
    return [
      { step: 1, title: 'Order Placed', description: 'Your order has been received', time: '0 hours' },
      { step: 2, title: 'Processing', description: 'Order is being prepared', time: '1-2 hours' },
      { step: 3, title: 'Shipped', description: 'Package is on the way', time: '1-2 days' },
      { step: 4, title: 'Out for Delivery', description: 'Package will arrive today', time: 'Same day' },
      { step: 5, title: 'Delivered', description: 'Package has been delivered', time: 'Final' }
    ];
  };
  return (
    <div className="home-container">
      <h1 className="page-title">Shipping Information</h1>
      
      {/* Shipping Calculator */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '40px'
      }}>
        <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Shipping Calculator</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Select City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)'
              }}
            >
              <option value="">Choose your city</option>
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Order Amount (ETB)</label>
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              placeholder="Enter order amount"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)'
              }}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Shipping Method</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)'
              }}
            >
              <option value="standard">Standard Shipping</option>
              <option value="express">Express Shipping</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={calculateShipping}
          className="cta-btn primary"
          style={{marginBottom: '20px'}}
        >
          Calculate Shipping
        </button>
        
        {calculatedShipping && (
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{margin: '0 0 16px 0', color: 'var(--text-primary)'}}>Shipping Details</h3>
            <div style={{display: 'grid', gap: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: 'var(--text-secondary)'}}>Shipping Cost:</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '600'}}>
                  {calculatedShipping.freeShipping ? 'FREE' : `${calculatedShipping.cost} ETB`}
                </span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: 'var(--text-secondary)'}}>Delivery Time:</span>
                <span style={{color: 'var(--text-primary)', fontWeight: '600'}}>{calculatedShipping.deliveryTime}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: 'var(--text-secondary)'}}>Total Amount:</span>
                <span style={{color: 'var(--primary-color)', fontWeight: '700'}}>
                  {(parseFloat(orderAmount) + calculatedShipping.cost).toFixed()} ETB
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
        {/* Shipping Methods */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Shipping Methods</h2>
          <div style={{display: 'grid', gap: '16px'}}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}>Standard Shipping</h3>
              <div style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                <p><strong>Delivery Time:</strong> 2-7 business days</p>
                <p><strong>Cost:</strong> 50-150 ETB (by location)</p>
                <p><strong>Free on orders over 5000 ETB</strong></p>
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}>Express Shipping</h3>
              <div style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                <p><strong>Delivery Time:</strong> 1-3 business days</p>
                <p><strong>Cost:</strong> 120-350 ETB (by location)</p>
                <p><strong>Same-day processing</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Tracking */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Order Tracking</h2>
          <div style={{display: 'grid', gap: '12px'}}>
            {getTrackingSteps().map((step, index) => (
              <div key={step.step} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--background)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {step.step}
                </div>
                <div style={{flex: 1}}>
                  <h4 style={{margin: '0 0 4px 0', color: 'var(--text-primary)', fontSize: '16px'}}>{step.title}</h4>
                  <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '14px'}}>{step.description}</p>
                </div>
                <div style={{color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500'}}>
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Areas */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '40px'
      }}>
        <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Delivery Areas & Times</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px'}}>
          {cities.map(city => (
            <div key={city.name} style={{
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}>{city.name}</h3>
              <div style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                <p><strong>Standard:</strong> {city.standard} ETB</p>
                <p><strong>Express:</strong> {city.express} ETB</p>
                <p><strong>Delivery:</strong> {city.deliveryTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Guidelines */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Packaging & Handling</h2>
          <ul style={{color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px'}}>
            <li>Durable and secure packaging materials</li>
            <li>Weather-resistant packaging for all items</li>
            <li>Fragile items handled with extra care</li>
            <li>Professional sealing and labeling</li>
            <li>Insurance coverage for valuable items</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Delivery Instructions</h2>
          <ul style={{color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px'}}>
            <li>Provide accurate and complete address details</li>
            <li>Include landmark information for easier location</li>
            <li>Ensure someone is available to receive packages</li>
            <li>Provide working phone number for coordination</li>
            <li>Special delivery instructions can be added at checkout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
