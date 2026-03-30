import "./QuickLinks.css";

const links = [
  { icon: "💳", label: "Credit Cards" },
  { icon: "🏠", label: "Home Loan" },
  { icon: "🚗", label: "Car Loan" },
  { icon: "🏦", label: "Fixed Deposit" },
  { icon: "📈", label: "Mutual Funds" },
  { icon: "🛡️", label: "Insurance" },
  { icon: "📱", label: "PayZapp" },
  { icon: "🏛️", label: "Open Account" },
];

export default function QuickLinks() {
  return (
    <section className="quick-links">
      <div className="container quick-links-inner">
        {links.map(({ icon, label }) => (
          <div key={label} className="quick-link">
            <div className="ql-icon">{icon}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
