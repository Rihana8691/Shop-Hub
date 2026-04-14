import React, { useState, useEffect } from 'react';
import '../styles/ReturnPolicyPage.css';

const ReturnPolicyPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [itemType, setItemType] = useState('');
  const [hasOriginalPackaging, setHasOriginalPackaging] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: '',
    reason: '',
    action: 'refund'
  });

  const checkEligibility = () => {
    if (!purchaseDate || !itemCondition || !itemType || !hasOriginalPackaging) {
      setEligibilityResult({
        eligible: false,
        message: 'Please fill in all fields to check eligibility',
        type: 'error'
      });
      return;
    }

    const daysSincePurchase = Math.floor((new Date() - new Date(purchaseDate)) / (1000 * 60 * 60 * 24));
    const isWithin30Days = daysSincePurchase <= 30;
    const isGoodCondition = itemCondition === 'excellent' || itemCondition === 'good';
    const isStandardItem = !['custom', 'perishable', 'intimate', 'digital', 'gift-card'].includes(itemType);
    const hasPackaging = hasOriginalPackaging === 'yes';

    let eligible = true;
    let message = '';
    let type = 'success';

    if (!isWithin30Days) {
      eligible = false;
      message = `Items must be returned within 30 days. Your purchase was ${daysSincePurchase} days ago.`;
      type = 'error';
    } else if (!isGoodCondition) {
      eligible = false;
      message = 'Items must be in excellent or good condition to be eligible for return.';
      type = 'error';
    } else if (!isStandardItem) {
      eligible = false;
      message = 'This item type is not eligible for return according to our policy.';
      type = 'error';
    } else if (!hasPackaging) {
      eligible = false;
      message = 'Items must be returned in their original packaging to be eligible.';
      type = 'warning';
    } else {
      message = 'Your item appears to be eligible for return! You can proceed with the return process.';
      type = 'success';
    }

    setEligibilityResult({ eligible, message, type, daysSincePurchase });
  };

  const handleReturnFormSubmit = (e) => {
    e.preventDefault();
    alert('Return request submitted successfully! We will contact you within 24 hours.');
    setShowReturnForm(false);
    setReturnForm({
      orderNumber: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      items: '',
      reason: '',
      action: 'refund'
    });
  };

  const getReturnTimeline = () => {
    return [
      { step: 1, title: 'Request Submitted', description: 'Your return request is received', time: 'Day 0' },
      { step: 2, title: 'Authorization', description: 'Return approval and label generation', time: 'Day 1' },
      { step: 3, title: 'Item Shipped', description: 'Package sent to returns center', time: 'Day 2-3' },
      { step: 4, title: 'Item Received', description: 'Package received and inspected', time: 'Day 4-5' },
      { step: 5, title: 'Refund Processed', description: 'Refund issued to original payment method', time: 'Day 5-7' }
    ];
  };
  return (
    <div className="home-container">
      <h1 className="page-title">Return Policy</h1>
      
      {/* Return Eligibility Checker */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '40px'
      }}>
        <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Return Eligibility Checker</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
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
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Item Condition</label>
            <select
              value={itemCondition}
              onChange={(e) => setItemCondition(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent (like new)</option>
              <option value="good">Good (minor use)</option>
              <option value="fair">Fair (noticeable wear)</option>
              <option value="poor">Poor (significant wear)</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Item Type</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Select item type</option>
              <option value="standard">Standard Retail Item</option>
              <option value="custom">Custom/Personalized Item</option>
              <option value="perishable">Perishable Goods</option>
              <option value="intimate">Intimate Apparel</option>
              <option value="digital">Digital Download</option>
              <option value="gift-card">Gift Card</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px'}}>Original Packaging</label>
            <select
              value={hasOriginalPackaging}
              onChange={(e) => setHasOriginalPackaging(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Select option</option>
              <option value="yes">Yes, original packaging intact</option>
              <option value="no">No, packaging missing/damaged</option>
            </select>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <button onClick={checkEligibility} className="cta-btn primary">
            Check Eligibility
          </button>
          {eligibilityResult?.eligible && (
            <button onClick={() => setShowReturnForm(true)} className="cta-btn secondary">
              Start Return Process
            </button>
          )}
        </div>
        
        {eligibilityResult && (
          <div style={{
            padding: '20px',
            backgroundColor: eligibilityResult.type === 'success' ? 'var(--surface)' : 
                           eligibilityResult.type === 'error' ? 'var(--surface)' : 'var(--surface)',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${eligibilityResult.type === 'success' ? 'var(--border)' : 
                              eligibilityResult.type === 'error' ? 'var(--border)' : 'var(--border)'}`
          }}>
            <div style={{
              color: eligibilityResult.type === 'success' ? 'var(--text-primary)' : 
                     eligibilityResult.type === 'error' ? 'var(--text-primary)' : 'var(--text-primary)',
              fontWeight: '500'
            }}>
              {eligibilityResult.message}
            </div>
          </div>
        )}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
        {/* Eligible vs Non-Eligible Items */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Return Guidelines</h2>
          <div style={{display: 'grid', gap: '16px'}}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{margin: '0 0 12px 0', color: 'var(--primary-color)'}}> Eligible Items</h3>
              <ul style={{color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '20px'}}>
                <li>Unused and in original condition</li>
                <li>In original packaging with all tags</li>
                <li>Within 30 days of purchase</li>
                <li>Standard retail items</li>
                <li>Non-perishable goods</li>
              </ul>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{margin: '0 0 12px 0', color: 'var(--text-primary)'}}> Non-Returnable Items</h3>
              <ul style={{color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '20px'}}>
                <li>Custom/personalized items</li>
                <li>Perishable goods</li>
                <li>Intimate apparel</li>
                <li>Digital downloads</li>
                <li>Gift cards</li>
                <li>Final sale items</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Return Process Timeline */}
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Return Process Timeline</h2>
          <div style={{display: 'grid', gap: '12px'}}>
            {getReturnTimeline().map((step, index) => (
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

      {/* Return Form Modal */}
      {showReturnForm && (
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
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Return Request Form</h2>
            <form onSubmit={handleReturnFormSubmit}>
              <div style={{display: 'grid', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Order Number</label>
                  <input
                    type="text"
                    value={returnForm.orderNumber}
                    onChange={(e) => setReturnForm({...returnForm, orderNumber: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Your Name</label>
                  <input
                    type="text"
                    value={returnForm.customerName}
                    onChange={(e) => setReturnForm({...returnForm, customerName: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Email</label>
                  <input
                    type="email"
                    value={returnForm.customerEmail}
                    onChange={(e) => setReturnForm({...returnForm, customerEmail: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Phone</label>
                  <input
                    type="tel"
                    value={returnForm.customerPhone}
                    onChange={(e) => setReturnForm({...returnForm, customerPhone: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Items to Return</label>
                  <textarea
                    value={returnForm.items}
                    onChange={(e) => setReturnForm({...returnForm, items: e.target.value})}
                    required
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Reason for Return</label>
                  <textarea
                    value={returnForm.reason}
                    onChange={(e) => setReturnForm({...returnForm, reason: e.target.value})}
                    required
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px'}}>Preferred Action</label>
                  <select
                    value={returnForm.action}
                    onChange={(e) => setReturnForm({...returnForm, action: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)'
                    }}
                  >
                    <option value="refund">Refund</option>
                    <option value="exchange">Exchange</option>
                    <option value="store-credit">Store Credit</option>
                  </select>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                <button type="submit" className="cta-btn primary">Submit Return Request</button>
                <button type="button" onClick={() => setShowReturnForm(false)} className="cta-btn secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Additional Policy Information */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Refund Information</h2>
          <div style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            <p><strong>Refund Method:</strong> Refunds are issued to the original payment method.</p>
            <p><strong>Processing Time:</strong> 5-7 business days after we receive your return.</p>
            <p><strong>Shipping Costs:</strong> Free for defective items, 50 ETB for other returns.</p>
            <p><strong>Exchanges:</strong> Available for items of equal or lesser value.</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{margin: '0 0 24px 0', color: 'var(--text-primary)'}}>Contact Information</h2>
          <div style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            <p><strong>Customer Service:</strong></p>
            <p>Phone: +251-9709-701</p>
            <p>Email: riab@gmail.com</p>
            <p>Hours: Monday-Friday 9AM-6PM</p>
            <p><strong>Returns Address:</strong></p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
