import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ApplyLoan.css";

export default function ApplyLoan() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const loanTypeParam = searchParams.get("type");
  
  const [loanType, setLoanType] = useState("Personal Loan");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [isPEP, setIsPEP] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeBureau, setAgreeBureau] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (loanTypeParam) {
      const formatted = loanTypeParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setLoanType(formatted);
    }
  }, [loanTypeParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !pan || !incomeSource || !isPEP || !agreeTerms || !agreeBureau) return;
    
    // Simulate submission delay
    setTimeout(() => {
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="apply-loan-page">
      <div className="apply-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>‹ Back</button>
          <h1>Apply for {loanType}</h1>
          <p>Get instant approval with our completely digital process.</p>
        </div>
      </div>
      
      <div className="container apply-content">
        <div className="apply-form-container">
          <div className="apply-progress">
            <div className="progress-step active">1. Basic Details</div>
            <div className={`progress-step ${submitted ? 'active' : ''}`}>2. Offer Generation</div>
            <div className={`progress-step ${submitted ? 'active' : ''}`}>3. Disbursal</div>
          </div>
          
          <form className="apply-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mobile Number</label>
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input 
                  type="tel" 
                  maxLength="10" 
                  placeholder="Enter 10-digit mobile number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  disabled={submitted}
                />
              </div>
            </div>

            <div className="form-group">
              <label>PAN Number</label>
              <input 
                type="text" 
                maxLength="10" 
                placeholder="ABCDE1234F" 
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                required
                disabled={submitted}
                className="pan-input"
              />
            </div>
            
            <div className="form-group">
              <label>Source of Income</label>
              <div className="radio-group">
                <label className={`radio-btn ${incomeSource === 'salaried' ? 'selected' : ''}`}>
                  <input type="radio" name="income" value="salaried" checked={incomeSource === 'salaried'} onChange={(e) => setIncomeSource(e.target.value)} disabled={submitted} required />
                  Salaried
                </label>
                <label className={`radio-btn ${incomeSource === 'business' ? 'selected' : ''}`}>
                  <input type="radio" name="income" value="business" checked={incomeSource === 'business'} onChange={(e) => setIncomeSource(e.target.value)} disabled={submitted} required />
                  Self employed / Business
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Are you a politician or a Politically exposed person (PEP)?</label>
              <div className="radio-group">
                <label className={`radio-btn ${isPEP === 'yes' ? 'selected' : ''}`}>
                  <input type="radio" name="pep" value="yes" checked={isPEP === 'yes'} onChange={(e) => setIsPEP(e.target.value)} disabled={submitted} required />
                  Yes
                </label>
                <label className={`radio-btn ${isPEP === 'no' ? 'selected' : ''}`}>
                  <input type="radio" name="pep" value="no" checked={isPEP === 'no'} onChange={(e) => setIsPEP(e.target.value)} disabled={submitted} required />
                  No
                </label>
              </div>
            </div>
            
            <div className="form-disclaimers">
              <label className="checkbox-wrap">
                <input 
                  type="checkbox" 
                  checked={agreeTerms} 
                  onChange={(e) => setAgreeTerms(e.target.checked)} 
                  required
                  disabled={submitted}
                />
                <span className="checkmark"></span>
                <p>I authorize HDFC Bank & its representatives to call/SMS/Email me with reference to my loan application. This consent overrides my registration on the NCPR.</p>
              </label>
              
              <label className="checkbox-wrap">
                <input 
                  type="checkbox" 
                  checked={agreeBureau} 
                  onChange={(e) => setAgreeBureau(e.target.checked)} 
                  required
                  disabled={submitted}
                />
                <span className="checkmark"></span>
                <p>I agree to the Terms & Conditions and understand that my information will be shared with Credit Bureaus to fetch my credit report.</p>
              </label>
            </div>

            <div className="form-submit">
              <button 
                type="submit" 
                className={`btn-confirm ${submitted ? 'success' : ''}`}
                disabled={!phone || !pan || !incomeSource || !isPEP || !agreeTerms || !agreeBureau || submitted}
              >
                {submitted ? '✓ Application Submitted Successfully' : 'Confirm'}
              </button>
            </div>
          </form>
          
          {submitted && (
            <div className="success-message">
              <h3>Congratulations!</h3>
              <p>Your {loanType} application reference number is <strong>HDFC-{Math.floor(Math.random() * 10000000)}</strong>.</p>
              <p>Our representative will contact you shortly.</p>
            </div>
          )}
        </div>

        <div className="apply-benefits">
           <h3>Why apply with us?</h3>
           <ul>
             <li>✓ No physical documents required</li>
             <li>✓ Instant conditional approval</li>
             <li>✓ Lowest interest rates in the market</li>
             <li>✓ Transparent processing fees</li>
             <li>✓ 24/7 online tracking</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
