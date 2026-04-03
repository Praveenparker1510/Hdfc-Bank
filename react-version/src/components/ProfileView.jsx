import { useState } from "react";
import "./ProfileView.css";

export default function ProfileView({ user, userData }) {
  const [passFlowSteps, setPassFlowSteps] = useState(0); 
  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirmPass: "" });
  const [passError, setPassError] = useState("");

  const [pinFlowSteps, setPinFlowSteps] = useState(0);
  const [pinForm, setPinForm] = useState({ newPin: "" });
  const [pinError, setPinError] = useState("");

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [feedbackSteps, setFeedbackSteps] = useState(0);
  const [feedbackForm, setFeedbackForm] = useState({ easyToUse: "", recommend: "", comment: "" });

  const handleVerifyCurrent = (e) => {
    e.preventDefault();
    if (passForm.current !== user.password) {
      setPassError("Wrong password. Please enter your current login password.");
      return;
    }
    setPassError("");
    setPassFlowSteps(2);
  };

  const handleSetNewPass = (e) => {
     e.preventDefault();
     if (passForm.newPass !== passForm.confirmPass) {
        setPassError("Passwords do not match.");
        return;
     }
     setPassError("");
     setPassFlowSteps(3);
  };

  const handleSetNewPin = (e) => {
     e.preventDefault();
     if (!/^\d{6}$/.test(pinForm.newPin)) {
        setPinError("PIN must be exactly 6 digits.");
        return;
     }
     setPinError("");
     setPinFlowSteps(2);
  };

  const handleFeedbackSubmit = (e) => {
     e.preventDefault();
     setFeedbackSteps(2);
  };

  if (!userData) return null;

  return (
    <div className="profile-view animate-fade-in">
      <header className="profile-header">
        <div className="ph-left">
          <h1>My Profile</h1>
          <p>Manage your account settings and security preferences.</p>
        </div>
      </header>

      <div className="profile-content">
        {/* Personal Details Section */}
        <section className="profile-section">
          <div className="section-header">
            <h3>Personal Information</h3>
          </div>
          
          <div className="profile-grid">
            <div className="pg-item">
              <label>Username / Holder Name</label>
              <div className="pg-value font-highlight">{user.id}</div>
            </div>
            <div className="pg-item">
              <label>Customer ID</label>
              <div className="pg-value font-mono">{userData.profile.custId}</div>
            </div>
            <div className="pg-item">
              <label>Account Holder Since</label>
              <div className="pg-value">{userData.profile.accHolderSince}</div>
            </div>
            <div className="pg-item">
              <label>Email Address</label>
              <div className="pg-value">{userData.profile.email}</div>
            </div>
            <div className="pg-item">
              <label>Mobile Number</label>
              <div className="pg-value font-mono">{userData.profile.mobile}</div>
            </div>
            <div className="pg-item">
              <label>Registered Address</label>
              <div className="pg-value">{userData.profile.address}</div>
            </div>
          </div>
        </section>

        {/* KYC Details Section */}
        <section className="profile-section">
          <div className="section-header">
            <h3>KYC Details</h3>
          </div>
          
          <div className="profile-grid kyc-grid">
            <div className="pg-item">
              <label>PAN Number</label>
              <div className="pg-value font-mono">{userData.profile.pan}</div>
            </div>
            <div className="pg-item">
              <label>Aadhar Number</label>
              <div className="pg-value font-mono">{userData.profile.aadhar}</div>
            </div>
            <div className="pg-item">
              <label>Home Branch</label>
              <div className="pg-value">{userData.profile.branch}</div>
            </div>
          </div>
        </section>

        {/* Security & Privacy Section based on the image provided */}
        <section className="profile-section security-section">
          <h3 className="security-title">Security & Privacy</h3>
          
          <div className="security-list">
            
            <div className="sec-item" onClick={() => setPassFlowSteps(1)}>
              <div className="sec-info">
                <h4>Change Login Password</h4>
                <p>Highly recommended every 90 days for safety.</p>
              </div>
              <div className="sec-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

            <div className="sec-item" onClick={() => setPinFlowSteps(1)}>
              <div className="sec-info">
                <h4>Manage Transaction PIN</h4>
                <p>Set or reset your secure 6-digit PIN.</p>
              </div>
              <div className="sec-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

            <div className="sec-item" onClick={() => setIsHelpOpen(true)}>
              <div className="sec-info">
                <h4>Help & Support</h4>
                <p>Reach out to our customer care team.</p>
              </div>
              <div className="sec-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

            <div className="sec-item" onClick={() => setFeedbackSteps(1)}>
              <div className="sec-info">
                <h4>Share Feedback</h4>
                <p>Tell us how we can improve our services.</p>
              </div>
              <div className="sec-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Password Change Modal Flow */}
      {passFlowSteps > 0 && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget && passFlowSteps !== 3) { setPassFlowSteps(0); setPassError(""); } }}>
          <div className="modal" style={{ maxWidth: '450px', width: '90%', borderRadius: '12px', overflow: 'hidden' }}>
            {passFlowSteps !== 3 && <button className="modal-close" onClick={() => { setPassFlowSteps(0); setPassForm({current: "", newPass: "", confirmPass: ""}); setPassError(""); }}>✕</button>}
            
            <div className="modal-right" style={{ width: '100%', padding: '40px', backgroundColor: 'var(--white)' }}>
              
              {passFlowSteps === 1 && (
                <>
                  <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Verify Identity</h3>
                  <form onSubmit={handleVerifyCurrent}>
                    <div className="form-group">
                      <label>Current Login Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter current password" 
                        value={passForm.current}
                        onChange={(e) => setPassForm({...passForm, current: e.target.value})}
                        required
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)', marginTop: '8px' }}
                      />
                      {passError && <span style={{ color: 'var(--red)', fontSize: '13px', marginTop: '8px', display: 'block', fontWeight: '500' }}>{passError}</span>}
                    </div>
                    <button type="submit" className="btn-login-submit" style={{ marginTop: '20px' }}>Validate and Continue</button>
                  </form>
                </>
              )}

              {passFlowSteps === 2 && (
                <>
                  <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Set New Password</h3>
                  <form onSubmit={handleSetNewPass}>
                    <div className="form-group">
                      <label>New Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter new password" 
                        value={passForm.newPass}
                        onChange={(e) => setPassForm({...passForm, newPass: e.target.value})}
                        required
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)', marginTop: '8px' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <label>Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="Confirm new password" 
                        value={passForm.confirmPass}
                        onChange={(e) => setPassForm({...passForm, confirmPass: e.target.value})}
                        required
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)', marginTop: '8px' }}
                      />
                      {passError && <span style={{ color: 'var(--red)', fontSize: '13px', marginTop: '8px', display: 'block', fontWeight: '500' }}>{passError}</span>}
                    </div>
                    <button type="submit" className="btn-login-submit" style={{ marginTop: '25px' }}>Update Password</button>
                  </form>
                </>
              )}

              {passFlowSteps === 3 && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '56px', color: '#22c55e', marginBottom: '15px' }}>✓</div>
                  <h3 style={{ color: 'var(--navy-dark)', marginBottom: '10px' }}>Password Updated</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>Your login password has been successfully changed.</p>
                  <button 
                    onClick={() => {
                       if(user) user.password = passForm.newPass; // Optional mock mutator
                       setPassFlowSteps(0);
                       setPassForm({current: "", newPass: "", confirmPass: ""});
                    }} 
                    className="btn-login-submit success"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    Finish
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* PIN Change Modal Flow */}
      {pinFlowSteps > 0 && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget && pinFlowSteps !== 2) { setPinFlowSteps(0); setPinError(""); } }}>
          <div className="modal" style={{ maxWidth: '450px', width: '90%', borderRadius: '12px', overflow: 'hidden' }}>
            {pinFlowSteps !== 2 && <button className="modal-close" onClick={() => { setPinFlowSteps(0); setPinForm({newPin: ""}); setPinError(""); }}>✕</button>}
            
            <div className="modal-right" style={{ width: '100%', padding: '40px', backgroundColor: 'var(--white)' }}>
              
              {pinFlowSteps === 1 && (
                <>
                  <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Set New Transaction PIN</h3>
                  <form onSubmit={handleSetNewPin}>
                    <div className="form-group">
                      <label>New 6-Digit PIN</label>
                      <input 
                        type="password" 
                        placeholder="Enter 6-digit PIN" 
                        value={pinForm.newPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setPinForm({...pinForm, newPin: val});
                        }}
                        maxLength={6}
                        required
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)', marginTop: '8px', letterSpacing: '8px', textAlign: 'center', fontSize: '18px' }}
                      />
                      {pinError && <span style={{ color: 'var(--red)', fontSize: '13px', marginTop: '8px', display: 'block', fontWeight: '500' }}>{pinError}</span>}
                    </div>
                    <button type="submit" className="btn-login-submit" style={{ marginTop: '25px' }}>Save PIN</button>
                  </form>
                </>
              )}

              {pinFlowSteps === 2 && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '56px', color: '#22c55e', marginBottom: '15px' }}>✓</div>
                  <h3 style={{ color: 'var(--navy-dark)', marginBottom: '10px' }}>PIN Updated</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>Your transaction PIN has been successfully set.</p>
                  <button 
                    onClick={() => {
                       setPinFlowSteps(0);
                       setPinForm({newPin: ""});
                    }} 
                    className="btn-login-submit success"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    Finish
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {isHelpOpen && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget) setIsHelpOpen(false); }}>
          <div className="modal" style={{ maxWidth: '450px', width: '90%', borderRadius: '12px', overflow: 'hidden' }}>
            <button className="modal-close" onClick={() => setIsHelpOpen(false)}>✕</button>
            
            <div className="modal-right" style={{ width: '100%', padding: '40px', backgroundColor: 'var(--white)' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Help & Support</h3>
              
              <div style={{ marginBottom: '20px' }}>
                 <div style={{ padding: '15px', backgroundColor: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-200)', marginBottom: '15px' }}>
                    <h4 style={{ color: 'var(--navy)', marginBottom: '5px' }}>Customer Care</h4>
                    <p style={{ fontSize: '15px', color: 'var(--gray-500)', marginBottom: '8px' }}>For all queries and complaints (Toll Free)</p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--navy-dark)' }}>1800 202 6161</p>
                 </div>

                 <div style={{ padding: '15px', backgroundColor: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                    <h4 style={{ color: 'var(--navy)', marginBottom: '5px' }}>Report Fraud</h4>
                    <p style={{ fontSize: '15px', color: 'var(--gray-500)', marginBottom: '8px' }}>Report suspicious activity immediately</p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#e11d48' }}>1930 / cybercrime.gov.in</p>
                 </div>
              </div>
              
              <button onClick={() => setIsHelpOpen(false)} className="btn-login-submit">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Feedback Modal */}
      {feedbackSteps > 0 && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget && feedbackSteps !== 2) setFeedbackSteps(0); }}>
          <div className="modal" style={{ maxWidth: '500px', width: '90%', borderRadius: '12px', overflow: 'hidden' }}>
            {feedbackSteps !== 2 && <button className="modal-close" onClick={() => setFeedbackSteps(0)}>✕</button>}
            
            <div className="modal-right" style={{ width: '100%', padding: '40px', backgroundColor: 'var(--white)' }}>
              
              {feedbackSteps === 1 && (
                <>
                  <h3 style={{ marginBottom: '10px', color: 'var(--navy-dark)' }}>Share Your Feedback</h3>
                  <p style={{ color: 'var(--gray-500)', fontSize: '14px', marginBottom: '25px' }}>Your opinion helps us improve our digital banking experience.</p>
                  
                  <form onSubmit={handleFeedbackSubmit}>
                    
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Overall Experience Rating (1-5 Stars)</label>
                      <input 
                        type="number" 
                        min="1" max="5" 
                        placeholder="Rate out of 5" 
                        required
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>How easy was it to find what you were looking for?</label>
                      <select required className="date-input" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }} value={feedbackForm.easyToUse} onChange={(e) => setFeedbackForm({...feedbackForm, easyToUse: e.target.value})}>
                          <option value="" disabled>Select an option</option>
                          <option value="Very Easy">Very Easy</option>
                          <option value="Easy">Easy</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Difficult">Difficult</option>
                          <option value="Very Difficult">Very Difficult</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Would you recommend NetBanking to others?</label>
                      <div style={{ display: 'flex', gap: '15px' }}>
                         <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type="radio" name="recommend" value="Yes" required onChange={(e) => setFeedbackForm({...feedbackForm, recommend: e.target.value})} /> Yes
                         </label>
                         <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type="radio" name="recommend" value="No" required onChange={(e) => setFeedbackForm({...feedbackForm, recommend: e.target.value})} /> No
                         </label>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Any additional comments? (Optional)</label>
                      <textarea 
                        rows="3"
                        placeholder="Tell us more about your experience"
                        value={feedbackForm.comment}
                        onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                        className="date-input"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)', resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" className="btn-login-submit">Confirm and Submit</button>
                  </form>
                </>
              )}

              {feedbackSteps === 2 && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '56px', color: '#22c55e', marginBottom: '15px' }}>✓</div>
                  <h3 style={{ color: 'var(--navy-dark)', marginBottom: '10px' }}>Feedback Submitted</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>Thank you for sharing your thoughts with us. We appreciate your feedback.</p>
                  <button 
                    onClick={() => {
                       setFeedbackSteps(0);
                       setFeedbackForm({ easyToUse: "", recommend: "", comment: "" });
                    }} 
                    className="btn-login-submit success"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
