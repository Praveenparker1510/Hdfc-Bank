import "./Offers.css";

const offers = [
  { badge: "Limited Time", icon: "%", title: "0% Processing Fee", desc: "On Home Loans applied before 31st March 2025", cta: "Know More", featured: false },
  { badge: "Hot Deal", icon: "🎁", title: "₹2000 Cashback", desc: "On your first purchase with HDFC Regalia Credit Card", cta: "Apply Now", featured: true },
  { badge: "New", icon: "⭐", title: "5X Reward Points", desc: "On dining, travel and online spends via SmartBuy", cta: "Know More", featured: false },
];

export default function Offers() {
  return (
    <section className="offers">
      <div className="container">
        <div className="section-header">
          <h2>Exclusive Offers</h2>
          <p>Special deals curated just for you</p>
        </div>
        <div className="offers-grid">
          {offers.map((o, i) => (
            <div key={i} className={`offer-card${o.featured ? " featured" : ""}`}>
              <div className="offer-badge">{o.badge}</div>
              <div className="offer-icon">{o.icon}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <a href="#" className="offer-link">{o.cta} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
