import "./Footer.css";

const footerCols = [
  {
    title: "Personal Banking",
    links: ["Savings Account", "Current Account", "Fixed Deposits", "Recurring Deposits", "Home Loans", "Personal Loans"],
  },
  {
    title: "Cards",
    links: ["Credit Cards", "Debit Cards", "Prepaid Cards", "Forex Cards", "Commercial Cards"],
  },
  {
    title: "Investments",
    links: ["Mutual Funds", "Stocks & ETFs", "Insurance", "NPS", "Gold Savings"],
  },
  {
    title: "Quick Links",
    links: ["Net Banking", "Mobile Banking", "Locate ATM/Branch", "Customer Care", "Grievance Redressal", "Careers"],
  },
];

const socials = [
  { icon: "f", label: "Facebook" },
  { icon: "t", label: "Twitter" },
  { icon: "in", label: "Instagram" },
  { icon: "li", label: "LinkedIn" },
  { icon: "yt", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="logo-h">H</span>DFC BANK
            </div>
            <p>
              India's leading private sector bank, committed to delivering
              world-class banking experience to every customer.
            </p>
            <div className="social-links">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="social-btn">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerCols.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © 2025 HDFC Bank Ltd. All rights reserved. | HDFC Bank is regulated
            by Reserve Bank of India.
          </p>
          <div className="footer-legal">
            {["Privacy Policy", "Terms of Use", "Disclaimer", "Cookie Policy"].map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
