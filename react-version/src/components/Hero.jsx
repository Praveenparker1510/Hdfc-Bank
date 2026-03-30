import { useState, useEffect } from "react";
import "./Hero.css";

const slides = [
  {
    tag: "Smart Banking",
    title: ["Banking that", "empowers you"],
    desc: "Experience seamless banking with India's most trusted financial institution. Open an account in minutes.",
    cta1: "Open Account",
    cta2: "Learn More",
    bg: "slide-1",
    visual: "phone",
  },
  {
    tag: "Home Loans",
    title: ["Your dream home", "starts here"],
    desc: "Home loans starting at just 8.35% p.a. with quick disbursal and minimal documentation.",
    cta1: "Check Eligibility",
    cta2: "Calculate EMI",
    bg: "slide-2",
    visual: "house",
  },
  {
    tag: "Credit Cards",
    title: ["Rewards on", "every spend"],
    desc: "Get up to 5X reward points, cashback, and exclusive offers with HDFC Bank credit cards.",
    cta1: "Apply Now",
    cta2: "Compare Cards",
    bg: "slide-3",
    visual: "card",
  },
];

function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        <div className="app-header">HDFC Bank App</div>
        <div className="app-balance">
          <div className="bal-label">Total Balance</div>
          <div className="bal-amount">₹ 2,45,890.50</div>
        </div>
        <div className="app-cards">
          <div className="app-card red">Savings A/C <span>••4521</span></div>
          <div className="app-card navy">Salary A/C <span>••9832</span></div>
        </div>
        <div className="app-actions">
          {["Pay ↑", "Recv ↓", "History", "Scan"].map(a => (
            <div key={a} className="app-act"><span>{a}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HouseCard() {
  return (
    <div className="house-card">
      <div className="house-icon">🏠</div>
      <h3>Home Loan</h3>
      <div className="rate">8.35% p.a.</div>
      <div className="house-features">
        <span>✓ Up to ₹10 Crore</span>
        <span>✓ 30 Year Tenure</span>
        <span>✓ Quick Approval</span>
      </div>
    </div>
  );
}

function CreditCard() {
  return (
    <div className="credit-card-mockup">
      <div className="card-chip" />
      <div className="card-number">4521 •••• •••• 7890</div>
      <div className="card-holder">RAHUL SHARMA</div>
      <div className="card-brand">HDFC</div>
    </div>
  );
}

const VISUALS = { phone: PhoneMockup, house: HouseCard, card: CreditCard };

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  const slide = slides[current];
  const Visual = VISUALS[slide.visual];

  return (
    <section className={`hero ${slide.bg}`}>
      <div className="container hero-inner">
        <div className="slide-content">
          <span className="slide-tag">{slide.tag}</span>
          <h1>
            {slide.title[0]}<br />
            <em>{slide.title[1]}</em>
          </h1>
          <p>{slide.desc}</p>
          <div className="slide-actions">
            <a href="#" className="btn-primary">{slide.cta1}</a>
            <a href="#" className="btn-ghost">{slide.cta2}</a>
          </div>
        </div>
        <div className="slide-visual">
          <Visual />
        </div>
      </div>

      <div className="slide-controls">
        <button className="slide-btn" onClick={prev}>‹</button>
        <div className="slide-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button className="slide-btn" onClick={next}>›</button>
      </div>
    </section>
  );
}
