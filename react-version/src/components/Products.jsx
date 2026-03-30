import { useState } from "react";
import "./Products.css";

const productData = {
  personal: [
    { icon: "🏛️", title: "Savings Account", desc: "Zero balance accounts with high interest rates and digital features." },
    { icon: "💳", title: "Credit Cards", desc: "Earn reward points, cashback and enjoy exclusive lifestyle benefits." },
    { icon: "🏠", title: "Home Loans", desc: "Fulfil your dream of owning a home at attractive interest rates." },
    { icon: "🚗", title: "Car Loans", desc: "Drive your dream car with quick approvals and competitive rates." },
    { icon: "📊", title: "Mutual Funds", desc: "Build wealth with SIP investments starting from just ₹500/month." },
    { icon: "🛡️", title: "Life Insurance", desc: "Secure your family's future with comprehensive life cover plans." },
    { icon: "🐷", title: "Fixed Deposits", desc: "Guaranteed returns up to 7.25% p.a. with flexible tenure options." },
    { icon: "📱", title: "PayZapp", desc: "India's fastest UPI app for instant money transfers and bill payments." },
  ],
  nri: [
    { icon: "🌏", title: "NRE Account", desc: "Repatriable savings account with tax-free interest for NRIs." },
    { icon: "💵", title: "Forex Services", desc: "Best exchange rates for foreign currency transfers and remittance." },
    { icon: "🏠", title: "NRI Home Loans", desc: "Finance your property in India with easy international transfers." },
    { icon: "📈", title: "NRI Investments", desc: "Invest in Indian mutual funds, stocks and bonds seamlessly." },
  ],
  business: [
    { icon: "💼", title: "Current Account", desc: "Feature-rich current accounts for growing businesses." },
    { icon: "🤝", title: "Business Loans", desc: "Collateral-free working capital loans up to ₹50 lakhs." },
    { icon: "🖥️", title: "POS Solutions", desc: "Accept payments via card, UPI and QR with smart POS devices." },
    { icon: "📄", title: "Trade Finance", desc: "Letters of credit, bank guarantees and export finance solutions." },
  ],
};

const tabs = ["personal", "nri", "business"];

export default function Products() {
  const [active, setActive] = useState("personal");

  return (
    <section className="products">
      <div className="container">
        <div className="section-header">
          <h2>Products & Services</h2>
          <p>Everything you need for a financially secure life</p>
        </div>
        <div className="product-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab${active === tab ? " active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {productData[active].map((item, i) => (
            <div key={i} className="product-card">
              <div className="pc-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="pc-link">Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
