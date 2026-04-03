import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./DashboardExtra.css";
import ProfileView from "../components/ProfileView";

// Mock data generation using seeded hash for consistency per user
const generateUserData = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const random = () => {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };

  const balance = Math.floor(random() * 500000) + 25000;
  const income = Math.floor(random() * 150000) + 40000;
  const expenses = Math.floor(random() * (income - 10000)) + 10000;
  const investment = Math.floor(random() * 800000) + 50000;

  const tx1 = Math.floor(random() * 2000) + 100;
  const tx2 = income;
  const tx3 = Math.floor(random() * 1000) + 200;
  const tx4 = Math.floor(random() * 30000) + 5000;

  const parts = [];
  for (let i = 0; i < 3; i++) {
    parts.push(Math.floor(1000 + random() * 9000).toString());
  }
  const fullAccount = parts.join('');
  const accountNumber = `**** **** ${fullAccount.slice(-4)}`;

  const custId = `CUST${Math.floor(random() * 9000000) + 1000000}`;
  const accHolderSince = `${Math.floor(random() * 10) + 2012}`;
  const mobileStr = `${Math.floor(random() * 900000000) + 9000000000}`;
  const mobile = `+91 ******${mobileStr.slice(-4)}`;
  const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}${Math.floor(random()*99)}@gmail.com`;
  const address = `${Math.floor(random()*100)+1}, ${["MG Road", "Park Street", "Linking Road", "Anna Salai"][Math.floor(random()*4)]}, ${["Mumbai", "Delhi", "Bangalore", "Chennai"][Math.floor(random()*4)]}, India`;
  const panStr = `ABCDE${Math.floor(random()*9000)+1000}F`;
  const pan = `******${panStr.slice(-4)}`;
  const aadharStr = `${Math.floor(random()*900000000000)+100000000000}`;
  const aadhar = `********${aadharStr.slice(-4)}`;
  const branch = `HDFC ${["Andheri West", "Connaught Place", "Indiranagar", "T Nagar"][Math.floor(random()*4)]}`;

  return {
    accountNumber,
    balance,
    income,
    expenses,
    investment,
    profile: {
       custId, accHolderSince, mobile, email, address, pan, aadhar, branch
    },
    transactions: [
       { id: 1, date: "2026-04-02", description: "Amazon.in", category: "Shopping", amount: -tx1, success: true },
       { id: 2, date: "2026-04-01", description: "Salary Credit", category: "Income", amount: tx2, success: true },
       { id: 3, date: "2026-03-30", description: "Netflix Subscription", category: "Entertainment", amount: -tx3, success: true },
       { id: 4, date: "2026-03-29", description: "Transfer to Savings", category: "Transfer", amount: -tx4, success: false },
       { id: 5, date: "2026-03-28", description: "Mutual Fund SIP", category: "Investment", amount: -Math.floor(investment/15), success: true },
       { id: 6, date: "2026-03-26", description: "Jio Recharge", category: "Utility", amount: -749, success: true },
    ]
  };
};

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [lastLogin, setLastLogin] = useState("");
  const [activeMenuTab, setActiveMenuTab] = useState("Dashboard");

  const sidebarLinks = [
    { name: "Dashboard", icon: "⊞" },
    { name: "Accounts", icon: "🏦" },
    { name: "Transfers", icon: "⇄" },
    { name: "Payments", icon: "📄" },
    { name: "Investments", icon: "📈" },
    { name: "Profile", icon: "👤" }
  ];
  
  // Quick Transfer State
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferStatus, setTransferStatus] = useState("idle");
  const [transferForm, setTransferForm] = useState({ beneficiary: "", ifsc: "", amount: "" });

  // Statement State
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [stmtForm, setStmtForm] = useState({ from: "", to: "" });
  const [stmtViewData, setStmtViewData] = useState(null);

  // Payments State
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const paymentServices = [
    { id: 'mobile', name: 'Mobile Recharge', icon: '📱', amount: 499, inputs: ['Mobile Number', 'Operator'] },
    { id: 'electricity', name: 'Electricity Bill', icon: '⚡', amount: 1250, inputs: ['Consumer Number', 'Board'] },
    { id: 'tax', name: 'Tax Payment', icon: '🏛️', amount: 5000, inputs: ['PAN Number', 'Assessment Year'] },
    { id: 'dth', name: 'DTH Payment', icon: '📺', amount: 650, inputs: ['Subscriber ID', 'Operator'] },
    { id: 'wifi', name: 'WiFi/Broadband', icon: '🌐', amount: 999, inputs: ['Account Number', 'ISP Name'] },
    { id: 'fastag', name: 'FASTag Recharge', icon: '🚗', amount: 1000, inputs: ['Vehicle Number', 'Bank'] },
    { id: 'lpg', name: 'LPG Gas', icon: '🔥', amount: 850, inputs: ['LPG ID', 'Provider'] },
  ];

  // Investments State
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investmentStatus, setInvestmentStatus] = useState("idle");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const investmentOptions = [
    { id: 'mutual', name: 'Mutual Funds', icon: '📈', return: 'Est. 12-15% P.A.', details: 'Diversify your portfolio with expertly managed funds. Ideal for long term wealth creation and fulfilling major life goals.' },
    { id: 'gold', name: 'Gold Investment', icon: '🪙', return: 'Est. 9-11% P.A.', details: 'Invest in Sovereign Gold Bonds or Digital Gold safely without any making charges. A traditional hedge against inflation.' },
    { id: 'realestate', name: 'Real Estate', icon: '🏢', return: 'Est. 10-12% P.A.', details: 'Invest in high-yield commercial properties with fractional ownership. Earn rental yields and capital appreciation.' },
    { id: 'fixedincome', name: 'Fixed Income Investment', icon: '💰', return: 'Fixed 7.5-8.5% P.A.', details: 'Secure and guaranteed returns over a fixed tenure. Perfect for conservative investors seeking a steady income stream.' },
    { id: 'digital', name: 'Digital Assets', icon: '🌐', return: 'High Risk/Reward', details: 'Explore emerging digital asset classes including secure centralized digital funds and blockchain-based tokens.' },
    { id: 'govt', name: 'Government Schemes', icon: '🏛️', return: 'Fixed 7.1-8.2% P.A.', details: 'Invest in 100% risk-free options like NPS, PPF, and Post Office Schemes backed directly by the Government of India.' },
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 1500);
  };

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    setInvestmentStatus("loading");
    setTimeout(() => {
      setInvestmentStatus("success");
    }, 1500);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setTransferStatus("loading");
    setTimeout(() => {
      setTransferStatus("success");
      setTimeout(() => {
        setIsTransferOpen(false);
        setTransferStatus("idle");
        setTransferForm({ beneficiary: "", ifsc: "", amount: "" }); // Reset
      }, 2000);
    }, 2500); // 2.5 sec loading
  };

  const handleShowStatement = (e) => {
    e.preventDefault();
    if (!stmtForm.from || !stmtForm.to) return;
    
    // Include recent transactions and generate 20 more
    const generated = userData.transactions.map(t => ({ ...t }));
    const fromDate = new Date(stmtForm.from).getTime();
    const toDate = new Date(stmtForm.to).getTime();
    if (isNaN(fromDate) || isNaN(toDate)) return;

    for (let i = 0; i < 20; i++) {
       const randomTime = fromDate + Math.random() * (toDate - fromDate);
       generated.push({
          id: `stmt-${i}`,
          date: new Date(randomTime).toISOString().split('T')[0],
          description: ["UPI Transfer", "Amazon Shopping", "Zomato", "ATM Withdrawal", "Internet Bill", "Grocery Store"][Math.floor(Math.random() * 6)],
          amount: Math.floor(Math.random() * 20000) - 10000
       });
    }
    // Sort by date descending
    generated.sort((a,b) => new Date(b.date) - new Date(a.date));
    setStmtViewData(generated);
  };

  const handleDownloadStatement = (e) => {
    e.preventDefault();
    if (!stmtForm.from || !stmtForm.to) return;

    const dataToDownload = stmtViewData || [];
    if (dataToDownload.length === 0) {
        alert("Please click 'Show Statement' first to generate and view the data to download.");
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
       + "Date,Description,Amount\n" 
       + dataToDownload.map(tx => `${tx.date},${tx.description},${tx.amount}`).join("\n");
       
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HDFC_Statement_${stmtForm.from}_to_${stmtForm.to}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setUserData(generateUserData(user.id));
      
      const date = new Date();
      date.setHours(date.getHours() - Math.floor(Math.random() * 24));
      setLastLogin(date.toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      }));
    }
  }, [user, navigate]);

  if (!user || !userData) return null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <span className="logo-h">H</span>DFC
          </div>
          <h2>BANK</h2>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarLinks.map((link) => (
            <button 
              key={link.name} 
              className={`sidebar-link ${activeMenuTab === link.name && link.name !== "Transfers" ? "active" : ""}`}
              onClick={() => {
                if (link.name === "Transfers") {
                  setIsTransferOpen(true);
                } else {
                  setActiveMenuTab(link.name);
                }
              }}
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-text">{link.name}</span>
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={onLogout}>
          <span className="sidebar-icon">↤</span>
          <span className="sidebar-text">Logout</span>
        </button>
      </aside>

      <div className="dashboard-page">
        <div className="container dashboard-container">
          
          {activeMenuTab === "Dashboard" && (
            <>
              {/* Header Section */}
              <header className="dashboard-header">
              <div className="dh-left">
                <h1>Welcome back, <span className="highlight-name">{user.id}</span></h1>
                <p className="last-login">Last login: {lastLogin}</p>
              </div>
              <div className="dh-right" style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-statement" onClick={() => setIsStatementOpen(true)}>Download Statement</button>
                <button className="btn-transfer" onClick={() => setIsTransferOpen(true)}>Quick Transfer</button>
              </div>
            </header>

        {/* Account Summary & Cards Row */}
        <section className="dashboard-overview">
          {/* Main Balance Card */}
          <div className="dash-card balance-card">
            <div className="card-top">
              <span className="card-label">Total Balance</span>
              <span className="card-account-no">A/c No: {userData.accountNumber}</span>
            </div>
            <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.balance)}</h2>
            <div className="card-bottom">
              <span>Savings Account</span>
              <a href="#" className="view-details">View Details &rarr;</a>
            </div>
            <div className="balance-decoration"></div>
          </div>

          <div className="dash-card stat-card income-card">
            <div className="stat-icon income-icon">↓</div>
            <div className="stat-info">
              <span className="stat-label">Monthly Income</span>
              <h3 className="stat-value">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.income)}</h3>
            </div>
          </div>

          <div className="dash-card stat-card expense-card">
            <div className="stat-icon expense-icon">↑</div>
            <div className="stat-info">
              <span className="stat-label">Monthly Expenses</span>
              <h3 className="stat-value">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.expenses)}</h3>
            </div>
          </div>

          <div className="dash-card stat-card credit-card">
            <div className="stat-icon credit-icon">💼</div>
            <div className="stat-info">
              <span className="stat-label">Total Investments</span>
              <h3 className="stat-value">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.investment)}</h3>
            </div>
          </div>
        </section>

        {/* Recent Transactions List */}
        <section className="dashboard-transactions">
          <div className="dt-header">
            <h3>Recent Transactions</h3>
            <a href="#" className="view-all">View All</a>
          </div>

          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="tx-date">{new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric'})}</td>
                    <td className="tx-desc">{tx.description}</td>
                    <td className="tx-cat"><span className="category-badge">{tx.category}</span></td>
                    <td className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                      {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(tx.amount)}
                    </td>
                    <td className="tx-status">
                      {tx.success ? (
                        <span className="status-badge success">✓ Success</span>
                      ) : (
                        <span className="status-badge failed">✕ Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
            </>
          )}

          {activeMenuTab === "Profile" && (
             <ProfileView user={user} userData={userData} />
          )}

          {activeMenuTab === "Accounts" && (
            <div className="accounts-tab animate-fade-in">
              <header className="dashboard-header" style={{ marginBottom: '30px' }}>
                <div className="dh-left">
                  <h1>My Accounts</h1>
                  <p>View all your active accounts and deposits in one place.</p>
                </div>
                <div className="dh-right">
                  <button className="btn-statement" onClick={() => setIsStatementOpen(true)}>Consolidated Statement</button>
                </div>
              </header>

              <div className="accounts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', paddingBottom: '30px' }}>
                 {/* Savings Card */}
                 <div className="dash-card balance-card" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white' }}>
                   <div className="card-top" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span className="card-label">Savings Account</span>
                     <span className="card-account-no">A/c No: {userData.accountNumber}</span>
                   </div>
                   <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.balance)}</h2>
                   <div className="card-bottom" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span>Status: Active</span>
                     <a href="#" onClick={(e) => { e.preventDefault(); setIsStatementOpen(true); }} style={{ color: 'white', textDecoration: 'underline' }}>View Statement</a>
                   </div>
                 </div>

                 {/* Salary Card */}
                 <div className="dash-card balance-card" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: 'white', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.2)' }}>
                   <div className="card-top" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span className="card-label">Salary Account</span>
                     <span className="card-account-no">A/c No: **** **** {userData.profile.custId.slice(-4)}</span>
                   </div>
                   <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.income * 2.4)}</h2>
                   <div className="card-bottom" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span>Status: Active</span>
                     <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', textDecoration: 'underline' }}>View Statement</a>
                   </div>
                 </div>

                 {/* Current Card */}
                 <div className="dash-card balance-card" style={{ background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', color: 'white', boxShadow: '0 10px 25px rgba(71, 85, 105, 0.2)' }}>
                   <div className="card-top" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span className="card-label">Current Account</span>
                     <span className="card-account-no">A/c No: **** **** {Math.floor(Math.random() * 9000 + 1000)}</span>
                   </div>
                   <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.balance * 1.5)}</h2>
                   <div className="card-bottom" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span>Status: Active</span>
                     <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', textDecoration: 'underline' }}>View Statement</a>
                   </div>
                 </div>

                 {/* Fixed Deposit Card */}
                 <div className="dash-card balance-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', boxShadow: '0 10px 25px rgba(5, 150, 105, 0.2)' }}>
                   <div className="card-top" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span className="card-label">Fixed Deposit</span>
                     <span className="card-account-no">FD No: **** **** {Math.floor(Math.random() * 9000 + 1000)}</span>
                   </div>
                   <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.investment * 0.6)}</h2>
                   <div className="card-bottom" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span>Matures on Dec 2026</span>
                     <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', textDecoration: 'underline' }}>View Details</a>
                   </div>
                 </div>

                 {/* PPF Card */}
                 <div className="dash-card balance-card" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.2)' }}>
                   <div className="card-top" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span className="card-label">PPF Account</span>
                     <span className="card-account-no">PPF No: **** **** {Math.floor(Math.random() * 9000 + 1000)}</span>
                   </div>
                   <h2 className="balance-amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userData.investment * 0.4)}</h2>
                   <div className="card-bottom" style={{ color: 'rgba(255,255,255,0.8)' }}>
                     <span>Status: Active</span>
                     <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', textDecoration: 'underline' }}>View Details</a>
                   </div>
                 </div>
              </div>
            </div>
          )}

          {activeMenuTab === "Payments" && (
            <div className="payments-tab animate-fade-in">
              <header className="dashboard-header" style={{ marginBottom: '30px' }}>
                <div className="dh-left">
                  <h1>Payment Services</h1>
                  <p>Pay your bills and recharge instantly from your account.</p>
                </div>
              </header>

              {!selectedPayment ? (
                <div className="accounts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', paddingBottom: '30px' }}>
                   {paymentServices.map((svc) => (
                      <div 
                        key={svc.id} 
                        className="sec-item" 
                        onClick={() => { setSelectedPayment(svc); setPaymentStatus("idle"); }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '24px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--gray-200)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                      >
                         <div style={{ fontSize: '32px', marginBottom: '15px' }}>{svc.icon}</div>
                         <h3 style={{ color: 'var(--navy-dark)', fontSize: '18px', marginBottom: '8px' }}>{svc.name}</h3>
                         <p style={{ color: 'var(--gray-500)', fontSize: '14px', marginBottom: '20px' }}>Due: ₹{svc.amount}</p>
                         <button className="btn-statement" style={{ width: '100%', padding: '10px', textAlign: 'center' }}>Pay Now</button>
                      </div>
                   ))}
                </div>
              ) : (
                <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', border: '1px solid var(--gray-200)', maxWidth: '600px', margin: '0 auto', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '20px' }}>
                      <button onClick={() => setSelectedPayment(null)} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', color: 'var(--navy-dark)', fontSize: '20px', cursor: 'pointer', marginRight: '20px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--gray-200)'} onMouseOut={e=>e.currentTarget.style.background='var(--gray-50)'}>←</button>
                      <div style={{ fontSize: '30px', marginRight: '15px' }}>{selectedPayment.icon}</div>
                      <h2 style={{ color: 'var(--navy-dark)', margin: 0 }}>{selectedPayment.name}</h2>
                   </div>

                   {paymentStatus === "success" ? (
                      <div style={{ textAlign: 'center', padding: '30px 0' }}>
                         <div style={{ fontSize: '72px', color: '#22c55e', marginBottom: '20px' }}>✓</div>
                         <h3 style={{ color: '#22c55e', fontSize: '24px', marginBottom: '10px' }}>Payment Successful</h3>
                         <p style={{ color: 'var(--gray-500)', fontSize: '15px', marginBottom: '40px', lineHeight: '1.5' }}>
                            Your payment of <strong>₹{selectedPayment.amount}</strong> for {selectedPayment.name} has been securely processed.
                         </p>
                         <button onClick={() => setSelectedPayment(null)} className="btn-login-submit success" style={{ background: '#22c55e', width: '100%' }}>Return to Payments</button>
                      </div>
                   ) : (
                      <form onSubmit={handlePaymentSubmit}>
                         {selectedPayment.inputs.map((label, idx) => (
                            <div key={idx} className="form-group" style={{ marginBottom: '20px' }}>
                               <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-600)', fontSize: '14px' }}>{label}</label>
                               <input type="text" placeholder={`Enter ${label}`} required className="date-input" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--gray-300)', fontSize: '15px' }} />
                            </div>
                         ))}
                         
                         <div className="form-group" style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-600)', fontSize: '14px' }}>Amount to Pay (₹)</label>
                            <input type="number" defaultValue={selectedPayment.amount} required className="date-input" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--gray-200)', background: 'var(--gray-50)', fontSize: '18px', fontWeight: 'bold', color: 'var(--navy-dark)' }} disabled />
                         </div>

                         <button 
                            type="submit" 
                            className="btn-login-submit" 
                            disabled={paymentStatus === "loading"}
                            style={{ position: 'relative' }}
                         >
                            {paymentStatus === "loading" ? (
                               <span className="spinner-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                 <span className="spinner" /> Processing...
                               </span>
                            ) : `Proceed to Pay ₹${selectedPayment.amount}`}
                         </button>
                      </form>
                   )}
                </div>
              )}
            </div>
          )}

          {activeMenuTab === "Investments" && (
            <div className="investments-tab animate-fade-in">
              <header className="dashboard-header" style={{ marginBottom: '30px' }}>
                <div className="dh-left">
                  <h1>Investment Opportunities</h1>
                  <p>Explore a variety of investment vehicles to grow your wealth.</p>
                </div>
              </header>

              {!selectedInvestment ? (
                <div className="accounts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', paddingBottom: '30px' }}>
                   {investmentOptions.map((inv) => (
                      <div 
                        key={inv.id} 
                        className="sec-item" 
                        onClick={() => setSelectedInvestment(inv)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '35px 20px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--gray-200)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                      >
                         <div style={{ fontSize: '48px', marginBottom: '20px' }}>{inv.icon}</div>
                         <h3 style={{ color: 'var(--navy-dark)', fontSize: '20px', marginBottom: '10px' }}>{inv.name}</h3>
                         <span style={{ display: 'inline-block', background: 'var(--navy-dark)', color: 'var(--white)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>{inv.return}</span>
                      </div>
                   ))}
                </div>
              ) : (
                <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', border: '1px solid var(--gray-200)', maxWidth: '700px', margin: '0 auto', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '20px' }}>
                      <button onClick={() => { setSelectedInvestment(null); setInvestmentStatus("idle"); setInvestmentAmount(""); }} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', color: 'var(--navy-dark)', fontSize: '20px', cursor: 'pointer', marginRight: '20px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--gray-200)'} onMouseOut={e=>e.currentTarget.style.background='var(--gray-50)'}>←</button>
                      <div style={{ fontSize: '40px', marginRight: '20px' }}>{selectedInvestment.icon}</div>
                      <div>
                        <h2 style={{ color: 'var(--navy-dark)', margin: 0, fontSize: '26px', marginBottom: '5px' }}>{selectedInvestment.name}</h2>
                        <p style={{ color: '#059669', fontWeight: '600', margin: 0 }}>Expected Return: {selectedInvestment.return}</p>
                      </div>
                   </div>

                   {investmentStatus === "success" ? (
                      <div style={{ textAlign: 'center', padding: '30px 0' }}>
                         <div style={{ fontSize: '72px', color: '#22c55e', marginBottom: '20px' }}>✓</div>
                         <h3 style={{ color: '#22c55e', fontSize: '24px', marginBottom: '10px' }}>Investment Successful!</h3>
                         <p style={{ color: 'var(--gray-500)', fontSize: '15px', marginBottom: '40px', lineHeight: '1.5' }}>
                            Your investment of <strong>₹{investmentAmount}</strong> in {selectedInvestment.name} has been securely processed. It will reflect in your portfolio shortly.
                         </p>
                         <button onClick={() => { setSelectedInvestment(null); setInvestmentStatus("idle"); setInvestmentAmount(""); }} className="btn-login-submit success" style={{ background: '#22c55e', width: '100%' }}>Return to Investments</button>
                      </div>
                   ) : (
                      <>
                         <div style={{ padding: '25px', background: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-200)', marginBottom: '30px' }}>
                            <h4 style={{ color: 'var(--navy-dark)', marginBottom: '10px', fontSize: '18px' }}>About this Investment</h4>
                            <p style={{ color: 'var(--gray-600)', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>{selectedInvestment.details}</p>
                         </div>

                         <form onSubmit={handleInvestmentSubmit}>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                               <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--navy-dark)' }}>Investment Amount (₹)</label>
                               <input type="number" placeholder="Enter amount to invest" required min="100" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} className="date-input" style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '18px' }} />
                            </div>

                            <button type="submit" className="btn-login-submit" disabled={investmentStatus === "loading"} style={{ width: '100%', padding: '15px', fontSize: '16px', position: 'relative' }}>
                               {investmentStatus === "loading" ? (
                                  <span className="spinner-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <span className="spinner" /> Processing...
                                  </span>
                               ) : "Invest Now"}
                            </button>
                         </form>
                      </>
                   )}
                </div>
              )}
            </div>
          )}
      </div>

      {/* Quick Transfer Modal */}
      {isTransferOpen && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget && transferStatus !== "loading") setIsTransferOpen(false) }}>
          <div className="modal transfer-modal">
            <button className="modal-close" onClick={() => { if(transferStatus !== "loading") setIsTransferOpen(false) }}>✕</button>
            <div className="modal-right" style={{ width: '100%', padding: '40px' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Quick Transfer</h3>
              <form className="login-form transfer-form" onSubmit={handleTransferSubmit}>
                
                <div className="form-group">
                  <label>From Account</label>
                  <input type="text" value={`Savings - ${userData.accountNumber}`} disabled className="disabled-input" />
                </div>

                <div className="form-group">
                  <label>Beneficiary Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter Beneficiary Name" 
                    value={transferForm.beneficiary}
                    onChange={(e) => setTransferForm({...transferForm, beneficiary: e.target.value})}
                    required
                    disabled={transferStatus !== "idle"}
                  />
                </div>

                <div className="form-group">
                  <label>IFSC Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. HDFC0001234" 
                    value={transferForm.ifsc}
                    onChange={(e) => setTransferForm({...transferForm, ifsc: e.target.value})}
                    required
                    disabled={transferStatus !== "idle"}
                  />
                </div>

                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Enter Amount" 
                    min="1"
                    value={transferForm.amount}
                    onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                    required
                    disabled={transferStatus !== "idle"}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-login-submit${transferStatus === "success" ? " success" : ""}`}
                  disabled={transferStatus === "loading" || transferStatus === "success"}
                  style={{ marginTop: '10px' }}
                >
                  {transferStatus === "idle" && "Confirm Transfer"}
                  {transferStatus === "loading" && (
                    <span className="spinner-wrap">
                      <span className="spinner" /> Processing...
                    </span>
                  )}
                  {transferStatus === "success" && "✓ Transfer Successfully"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Statement Modal */}
      {isStatementOpen && (
        <div className="modal-overlay active" onClick={(e) => { if(e.target === e.currentTarget) setIsStatementOpen(false) }}>
          <div className="modal" style={{ maxWidth: stmtViewData ? '700px' : '500px', width: '90%', borderRadius: '12px', overflow: 'hidden', transition: 'max-width 0.3s ease' }}>
            <button className="modal-close" onClick={() => { setIsStatementOpen(false); setStmtViewData(null); setStmtForm({from: '', to: ''}); }}>✕</button>
            <div className="modal-right" style={{ width: '100%', padding: '40px', backgroundColor: 'var(--white)' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--navy-dark)' }}>Account Statement</h3>
              
              <div className="form-group" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                 <div style={{ flex: 1 }}>
                   <label>From Date</label>
                   <input type="date" value={stmtForm.from} onChange={(e) => setStmtForm({...stmtForm, from: e.target.value})} required className="date-input" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }} />
                 </div>
                 <div style={{ flex: 1 }}>
                   <label>To Date</label>
                   <input type="date" value={stmtForm.to} onChange={(e) => setStmtForm({...stmtForm, to: e.target.value})} required className="date-input" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }} />
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="btn-transfer" onClick={handleShowStatement} style={{ flex: 1 }}>Show Statement</button>
                 <button className="btn-statement" onClick={handleDownloadStatement} style={{ flex: 1, textAlign: 'center' }}>Download (CSV)</button>
              </div>

              {stmtViewData && (
                 <div className="table-responsive" style={{ marginTop: '25px', maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
                    <table className="transactions-table">
                      <thead style={{ position: 'sticky', top: 0, zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stmtViewData.map((tx) => (
                          <tr key={tx.id}>
                            <td className="tx-date">{new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            <td className="tx-desc">{tx.description}</td>
                            <td className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                              {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(tx.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
